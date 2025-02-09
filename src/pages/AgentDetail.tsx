import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import AgentBravoDelegateABI from "../config/abis/AgentBravoDelegate.json";
import { CONTRACTS } from "@/config/contracts";
import AgentComments from "../components/AgentComments";
import { toast } from "sonner";
import { arbitrumSepolia } from "wagmi/chains";

export default function AgentDetail() {
  const { id } = useParams();
  const { address } = useAccount();
  
  // Local state for voting policy details.
  const [backstory, setBackstory] = useState<string>("");
  const [voteNoConditions, setVoteNoConditions] = useState<string>("");
  const [voteYesConditions, setVoteYesConditions] = useState<string>("");
  const [voteAbstainConditions, setVoteAbstainConditions] = useState<string>("");
  const [agentVotes, setAgentVotes] = useState<string>("");
  
  // Read the voting policy from the AgentBravoDelegate contract.
  const { data: votingPolicy, isLoading: policyLoading } = useReadContract({
    address: (id as `0x${string}`) || "0x0000000000000000000000000000000000000000",
    abi: AgentBravoDelegateABI,
    functionName: "votingPolicy"
  });
  
  // New: Read the agent's votes from the AgentBravoToken by calling `getVotes`
  const { data: agentVotesData, isLoading: votesLoading } = useReadContract({
    address: CONTRACTS.AgentBravoToken.address,
    abi: CONTRACTS.AgentBravoToken.abi,
    functionName: "getVotes",
    args: [id as `0x${string}`],
  });

  const { writeContract: delegateWrite, data: delegateTxHash, isPending: isDelegatePending } = useWriteContract();

  const { isLoading: isDelegateConfirming, isSuccess: isDelegateConfirmed } = useWaitForTransactionReceipt({
    hash: delegateTxHash,
  });

  const handleDelegate = async () => {
    if (!id) {
      toast.error("No agent address found");
      return;
    }
    try {
      await delegateWrite({
        address: CONTRACTS.AgentBravoToken.address,
        abi: CONTRACTS.AgentBravoToken.abi,
        functionName: "delegate",
        args: [id],
        chain: arbitrumSepolia,
        account: address,
      });
      toast("Delegation transaction sent. Waiting for confirmation...");
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed. Please try again.");
    }
  };

  useEffect(() => {
    if (votingPolicy) {
      // Assuming votingPolicy returns an array of [backstory, voteNo, voteYes, voteAbstain]
      setBackstory(votingPolicy[0]);
      setVoteNoConditions(votingPolicy[1]);
      setVoteYesConditions(votingPolicy[2]);
      setVoteAbstainConditions(votingPolicy[3]);
    }
  }, [votingPolicy]);

  useEffect(() => {
    if (agentVotesData) {
      setAgentVotes((Number(agentVotesData) / 1e18).toString());
    } else {
      setAgentVotes("0");
    }
  }, [agentVotesData]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex justify-between items-start mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-bold text-white flex items-center gap-2">
                {id ? (
                  <>
                    Agent {id.slice(0, 10)}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(id);
                        toast.success("Address copied to clipboard");
                      }}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      title="Copy full address"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </>
                ) : (
                  "Agent Details"
                )}
              </h1>
            </div>
            {/* Small box for votes on one line */}
            {id && (
              <div className="mt-4 flex items-center gap-4">
                <div className="p-2 rounded-lg border border-green-300/30">
                  <p>
                    <span className="text-white">{votesLoading ? "Loading..." : agentVotes?.toString()}</span>{" "}
                    <span className="gradient-text">BRAVO</span>
                  </p>
                </div>
                <Button
                  onClick={handleDelegate}
                  disabled={isDelegatePending || isDelegateConfirming}
                  className="bg-background border border-primary/30 transition-colors"
                >
                  {isDelegatePending || isDelegateConfirming ? "Delegating..." : "Delegate"}
                </Button>
              </div>
            )}
          </div>
          <a 
            href={`https://sepolia.arbiscan.io/address/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Voting Policy</h2>
              {policyLoading ? (
                <div>Loading policy...</div>
              ) : (
                <>
                  <p className="text-muted-foreground mb-6 whitespace-pre-wrap">{backstory}</p>
                  <div className="space-y-6">
                    <div className="bg-[#F97316]/20 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-[#F97316] mb-2">Vote NO Conditions</h3>
                      <p className="text-[#F97316]/90 whitespace-pre-wrap">{voteNoConditions}</p>
                    </div>

                    <div className="bg-primary/20 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-primary mb-2">Vote YES Conditions</h3>
                      <p className="text-primary/90 whitespace-pre-wrap">{voteYesConditions}</p>
                    </div>

                    <div className="bg-blue-300/20 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Vote ABSTAIN Conditions</h3>
                      <p className="text-blue-400 whitespace-pre-wrap">{voteAbstainConditions}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Agent Comments</h2>
            <AgentComments agentAddress={id as `0x${string}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
