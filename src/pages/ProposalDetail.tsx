import { useParams } from "react-router-dom";
import { useReadContract } from "wagmi";
import Navbar from "../components/Navbar";
import { Calendar, Check, X, CircleDot } from "lucide-react";
import { CONTRACTS } from "../config/contracts";

const ProposalDetail = () => {
  // Get the proposal index from the URL params.
  const { id } = useParams();
  const proposalIndex = id ? Number(id) : 0;

  // Read proposal details (e.g., description hash) via "proposalDetailsAt"
  const {
    data: detailsData,
    isLoading: detailsLoading,
    error: detailsError,
  } = useReadContract({
    address: CONTRACTS.AgentBravoGovernor.address,
    abi: CONTRACTS.AgentBravoGovernor.abi,
    functionName: "proposalDetailsAt",
    args: [proposalIndex],
  });

  // Read proposal votes via "proposalVotes"
  const { data: votesData } = useReadContract({
    address: CONTRACTS.AgentBravoGovernor.address,
    abi: CONTRACTS.AgentBravoGovernor.abi,
    functionName: "proposalVotes",
    args: detailsData ? [detailsData[0]] : undefined,
  });

  // Read proposal state via "state"
  const { data: stateData } = useReadContract({
    address: CONTRACTS.AgentBravoGovernor.address,
    abi: CONTRACTS.AgentBravoGovernor.abi,
    functionName: "state",
    args: detailsData ? [detailsData[0]] : undefined,
  });

  // Read the proposal proposer via "proposalProposer"
  const { data: proposerData } = useReadContract({
    address: CONTRACTS.AgentBravoGovernor.address,
    abi: CONTRACTS.AgentBravoGovernor.abi,
    functionName: "proposalProposer",
    args: detailsData ? [detailsData[0]] : undefined,
  });

  // Read the proposal deadline via "proposalDeadline"
  const { data: deadlineData } = useReadContract({
    address: CONTRACTS.AgentBravoGovernor.address,
    abi: CONTRACTS.AgentBravoGovernor.abi,
    functionName: "proposalDeadline",
    args: detailsData ? [detailsData[0]] : undefined,
  });

  // Determine proposal status from the state value.
  let status: "active" | "passed" | "failed" | "pending" = "pending";
  if (stateData) {
    const stateNum = Number(stateData.toString());
    if (stateNum === 0) status = "pending";
    else if (stateNum === 1) status = "active";
    else if (stateNum === 4) status = "passed";
    else status = "failed";
  }

  // Get the proposal description hash (stored at index 4)
  const descriptionHash: string = detailsData && detailsData[4]
    ? detailsData[4].toString()
    : "";

  // Use the on-chain proposal index (or fallback to the URL index)
  const proposalNumber: number = detailsData ? Number(detailsData[0]) : proposalIndex;

  // Format the deadline date
  const deadlineDate: string = deadlineData
    ? new Date(Number(deadlineData) * 1000).toLocaleDateString()
    : "N/A";

  // Extract votes: votesData returns a tuple: [against, for, abstain]
  const forVotes: number = votesData ? Number(votesData[1]) : 0;
  const againstVotes: number = votesData ? Number(votesData[0]) : 0;
  const abstainVotes: number = votesData ? Number(votesData[2]) : 0;

  // Calculate total votes
  const totalVotes = forVotes + againstVotes + abstainVotes;

  // Since there is no on-chain title, we default to displaying the proposal index.
  const title: string = `Proposal #${proposalIndex}`;

  if (detailsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="glass-card rounded-lg p-8">Loading proposal details...</div>
        </div>
      </div>
    );
  }

  if (detailsError) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="glass-card rounded-lg p-8">Error loading proposal details.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="glass-card rounded-lg p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  status === "active"
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : status === "passed"
                    ? "bg-green-900/20 text-green-400 border-green-500/30"
                    : status === "failed"
                    ? "bg-red-900/20 text-red-400 border-red-500/30"
                    : "bg-gray-800/40 text-gray-400 border border-gray-600/30"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} Proposal
              </span>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                {deadlineDate}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>

            <p className="text-muted-foreground">
              {descriptionHash
                ? `Description Hash: ${descriptionHash}`
                : "No description available."}
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Current Votes</h2>

            <div className="space-y-4">
              <div className="glass-card p-4">
                <div className="flex justify-between mb-2">
                  <span className="flex items-center text-primary">
                    <Check className="h-4 w-4 mr-1" />
                    For
                  </span>
                  <span className="font-medium text-foreground">
                    {forVotes.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: totalVotes > 0 ? `${(forVotes / totalVotes) * 100}%` : "0%",
                    }}
                  />
                </div>
              </div>

              <div className="glass-card p-4">
                <div className="flex justify-between mb-2">
                  <span className="flex items-center text-[#F97316]">
                    <X className="h-4 w-4 mr-1" />
                    Against
                  </span>
                  <span className="font-medium text-foreground">
                    {againstVotes.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F97316] rounded-full"
                    style={{
                      width: totalVotes > 0 ? `${(againstVotes / totalVotes) * 100}%` : "0%",
                    }}
                  />
                </div>
              </div>

              <div className="glass-card p-4">
                <div className="flex justify-between mb-2">
                  <span className="flex items-center text-blue-400">
                    <CircleDot className="h-4 w-4 mr-1" />
                    Abstain
                  </span>
                  <span className="font-medium text-foreground">
                    {abstainVotes.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 rounded-full"
                    style={{
                      width: totalVotes > 0 ? `${(abstainVotes / totalVotes) * 100}%` : "0%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6">
            <div className="grid grid-cols-[auto,1fr] gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Voting Ends</span>
                <p className="font-medium text-foreground">{deadlineDate}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Created by</span>
                <p className="font-medium text-foreground">
                  {proposerData ? (
                    <a
                      href={`https://sepolia.etherscan.io/address/${proposerData.toString()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {proposerData.toString()}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6">
            <h2 className="text-xl font-semibold gradient-text mb-6">Agent Comments</h2>
            <p className="text-muted-foreground">Comments functionality not implemented.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;
