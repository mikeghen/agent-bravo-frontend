import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { useReadContract } from "wagmi";
import { CONTRACTS } from "../config/contracts";

interface ProposalCardProps {
  id: number;
}

const statusColors = {
  active: "bg-primary/20 text-primary border-primary/30",
  passed: "bg-green-900/20 text-green-400 border-green-500/30",
  failed: "bg-red-900/20 text-red-400 border-red-500/30",
  pending: "bg-gray-800/40 text-gray-400 border-gray-600/30",
};

const ProposalCard = ({ id }: ProposalCardProps) => {
  // Local state for on-chain proposal details.
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [descriptionHash, setDescriptionHash] = useState<string>("");
  const [forVotes, setForVotes] = useState<number>(0);
  const [againstVotes, setAgainstVotes] = useState<number>(0);
  const [abstainVotes, setAbstainVotes] = useState<number>(0);
  const [status, setStatus] = useState<"active" | "passed" | "failed" | "pending">("pending");
  const [proposer, setProposer] = useState<string | undefined>(undefined);
  const [date, setDate] = useState("N/A");

  console.log(`Loading ProposalCard for index: ${id}`);

  // Fetch proposal details via "proposalDetailsAt"
  const { data: detailsData, isLoading: detailsLoading, error: detailsError } = useReadContract({
    address: CONTRACTS.AgentBravoGovernor.address,
    abi: CONTRACTS.AgentBravoGovernor.abi,
    functionName: "proposalDetailsAt",
    args: [id],
  });

  // Read proposal votes via "proposalVotes"
  const { data: votesData } = useReadContract({
    address: CONTRACTS.AgentBravoGovernor.address,
    abi: CONTRACTS.AgentBravoGovernor.abi,
    functionName: "proposalVotes",
    args: detailsData ? [detailsData[0]] : undefined,
  });

  // Read the proposal state via "state"
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

  // NEW: Read the proposal description via "getProposalDescription".
  // This hook works only when we have a valid description hash (fetched above).
  const { 
    data: descriptionData, 
    isLoading: descriptionLoading, 
    error: descriptionError 
  } = useReadContract({
    address: CONTRACTS.AgentBravoGovernor.address,
    abi: CONTRACTS.AgentBravoGovernor.abi,
    functionName: "getProposalDescription",
    args: descriptionHash ? [descriptionHash] : undefined,
  });

  // Update local state when detailsData is available.
  useEffect(() => {
    if (detailsData) {
      console.log("proposalDetailsAt returned:", detailsData);
      const pid = detailsData[0].toString();
      setProposalId(pid);
      setDescriptionHash(detailsData[4] ? detailsData[4].toString() : "");
    } else {
      console.log("proposalDetailsAt not yet available.");
    }
    if (detailsError) {
      console.error("Error in proposalDetailsAt:", detailsError);
    }
  }, [detailsData, detailsError]);

  // Update vote counts.
  useEffect(() => {
    if (votesData) {
      console.log("proposalVotes returned:", votesData);
      // Scale down votes by 1e18 and round to 0 decimal places
      setAgainstVotes(Math.round(Number(votesData[0]) / 1e18));
      setForVotes(Math.round(Number(votesData[1]) / 1e18));
      setAbstainVotes(Math.round(Number(votesData[2]) / 1e18));
    } else {
      console.log("proposalVotes data not yet available.");
    }
  }, [votesData, proposalId]);

  // Update proposal state.
  useEffect(() => {
    if (stateData) {
      console.log("state returned:", stateData);
      const stateNumber = Number(stateData.toString());
      if (stateNumber === 0) setStatus("pending");
      else if (stateNumber === 1) setStatus("active");
      else if (stateNumber === 4) setStatus("passed");
      else setStatus("failed");
    } else {
      console.log("state data not yet available.");
    }
  }, [stateData, proposalId]);

  // Update proposer.
  useEffect(() => {
    if (proposerData) {
      console.log("proposalProposer returned:", proposerData);
      setProposer(proposerData.toString());
    } else {
      console.log("proposalProposer data not yet available.");
    }
  }, [proposerData, proposalId]);

  // Update deadline/date.
  useEffect(() => {
    if (deadlineData) {
      console.log("proposalDeadline returned:", deadlineData);
      const deadlineTimestamp = Number(deadlineData);
      const date = new Date(deadlineTimestamp * 1000);
      const formattedDate = date.toLocaleDateString() + ' ' + 
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setDate(formattedDate);
    } else {
      console.log("proposalDeadline data not yet available.");
    }
  }, [deadlineData, proposalId]);

  if (detailsLoading) {
    console.log("Details loading...");
    return <div className="p-6 rounded-lg glass-card">Loading proposal...</div>;
  }
  if (detailsError) {
    console.error("Details error:", detailsError);
    return <div className="p-6 rounded-lg glass-card">Error loading proposal</div>;
  }

  return (
    <Link to={`/proposals/${id}`} className="block group">
      {/* Desktop / large screen layout: horizontal table row */}
      <div className="hidden md:flex items-center p-4 rounded-lg glass-card hover:border-primary/30 transition-all duration-300">
        {/* Proposal Index */}
        <div className="w-16 text-white font-medium">
          {proposalId ? `#${proposalId.toString().slice(-4)}` : `#${id}`}
        </div>
        {/* Status */}
        <div className="w-28">
          <span className={`px-2 py-1 rounded text-sm font-medium ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        {/* Proposal Description (truncated) */}
        <div className="flex-1 text-sm text-white truncate">
          {descriptionLoading 
            ? "Loading description..." 
            : descriptionData && descriptionData.toString().trim().length > 0 
              ? (descriptionData.toString().length > 50 
                  ? descriptionData.toString().slice(0, 50) + "..." 
                  : descriptionData.toString())
              : "No description available."}
        </div>
        {/* Proposer */}
        <div className="text-sm text-gray-300 truncate mr-8">
          Proposed by {proposer ? (
            <a 
              href={`https://sepolia.arbiscan.io/address/${proposer}`}
              target="_blank"
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors"
            >
              {proposer.slice(0, 6)}...
            </a>
          ) : "N/A"}
        </div>
        {/* Votes - displayed as separate lines */}
        <div className="mr-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded text-xs font-medium">
              <span className="font-semibold">For:</span> {forVotes}
            </div>
            <div className="bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/30 px-2 py-0.5 rounded text-xs font-medium">
              <span className="font-semibold">Against:</span> {againstVotes}
            </div>
            <div className="bg-blue-300/20 text-blue-400 border border-blue-300/30 px-2 py-0.5 rounded text-xs font-medium">
              <span className="font-semibold">Abstain:</span> {abstainVotes}
            </div>
          </div>
        </div>
        {/* View details icon */}
        <div className="w-8 text-right ml-auto">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      {/* Mobile layout: card view */}
      <div className="md:hidden p-6 rounded-lg glass-card hover:border-primary/30 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            {date}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
          Proposal #{proposalId ? proposalId.slice(-4) : id}
        </h3>

        <p className="text-gray-400 mb-4 line-clamp-2">
          {descriptionLoading 
            ? "Loading description..." 
            : descriptionData && descriptionData.toString().trim().length > 0 
              ? (descriptionData.toString().length > 60
                  ? descriptionData.toString().slice(0, 60) + "..." 
                  : descriptionData.toString())
              : "No description available."}
        </p>

        {proposer && (
          <p className="text-gray-300 text-sm mb-1">
            Proposer: <span className="font-mono">{proposer}</span>
          </p>
        )}

        <div className="mt-2 text-gray-300 text-sm">
          <span>For: {forVotes}</span> - <span>Against: {againstVotes}</span> - <span>Abstain: {abstainVotes}</span>
        </div>

        <div className="flex items-center text-primary font-medium mt-4">
          View Details
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default ProposalCard;
