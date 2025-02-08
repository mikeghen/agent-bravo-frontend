import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import AgentBravoDelegateABI from "../config/abis/AgentBravoDelegate.json";
import AgentComments from "../components/AgentComments";

export default function AgentDetail() {
  const { id } = useParams();
  
  // Local state for voting policy details.
  const [backstory, setBackstory] = useState<string>("");
  const [voteNoConditions, setVoteNoConditions] = useState<string>("");
  const [voteYesConditions, setVoteYesConditions] = useState<string>("");
  const [voteAbstainConditions, setVoteAbstainConditions] = useState<string>("");
  
  // Read the voting policy from the AgentBravoDelegate contract.
  const { data: votingPolicy, isLoading: policyLoading } = useReadContract({
    address: (id as `0x${string}`) || "0x0000000000000000000000000000000000000000",
    abi: AgentBravoDelegateABI,
    functionName: "votingPolicy"
  });
  
  useEffect(() => {
    if (votingPolicy) {
      // Assuming votingPolicy returns an array of [backstory, voteNo, voteYes, voteAbstain]
      setBackstory(votingPolicy[0]);
      setVoteNoConditions(votingPolicy[1]);
      setVoteYesConditions(votingPolicy[2]);
      setVoteAbstainConditions(votingPolicy[3]);
    }
  }, [votingPolicy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <Link to="/agents" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4" />
            Back to Agents
          </Link>
          <Link to={`/agents/${id}/edit`}>
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">Edit Agent</Button>
          </Link>
        </div>

        <div className="glass-card p-8 rounded-lg">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-white">
                {id ? `Agent ${id.slice(0, 6)}...${id.slice(-4)}` : "Agent Details"}
              </h1>
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
    </div>
  );
}
