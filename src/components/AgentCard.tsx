import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useReadContract } from "wagmi";
import { CONTRACTS } from "../config/contracts";
import AgentBravoDelegateABI from "../config/abis/AgentBravoDelegate.json";

interface AgentCardProps {
  index: number;
}

interface VotingPolicy {
  backstory: string;
  voteNoConditions: string;
  voteYesConditions: string;
  voteAbstainConditions: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ index }) => {
  // Read the agent address from the factory using viem via wagmi.
  const { data: agentAddress, isLoading: addressLoading } = useReadContract({
    address: CONTRACTS.AgentBravoDelegateFactory.address,
    abi: CONTRACTS.AgentBravoDelegateFactory.abi,
    functionName: "deployedAgents",
    args: [index],
  });

  const [agentAddr, setAgentAddr] = useState<`0x${string}` | null>(null);
  const [backstory, setBackstory] = useState<string | null>(null);
  const [voteNoConditions, setVoteNoConditions] = useState<string | null>(null);
  const [voteYesConditions, setVoteYesConditions] = useState<string | null>(null);
  const [voteAbstainConditions, setVoteAbstainConditions] = useState<string | null>(null);

  useEffect(() => {
    if (agentAddress) {
      setAgentAddr(agentAddress as `0x${string}`);
    }
  }, [agentAddress]);

  // Read the agent's voting policy details with explicit typing.
  const { data: votingPolicy, isLoading: policyLoading } = useReadContract({
    address: agentAddr || "0x0000000000000000000000000000000000000000",
    abi: AgentBravoDelegateABI,
    functionName: "votingPolicy",
  });

  useEffect(() => {
    if (votingPolicy) {
      console.log("Voting policy:", votingPolicy);
      setBackstory(votingPolicy[0]);
      setVoteNoConditions(votingPolicy[1]);
      setVoteYesConditions(votingPolicy[2]);
      setVoteAbstainConditions(votingPolicy[3]);
    }
  }, [votingPolicy]);

  if (addressLoading || policyLoading) {
    return <div className="glass-card p-6 rounded-lg">Loading...</div>;
  }

  return (
    <Link to={`/agents/${agentAddr}`}>
      <div className="glass-card p-6 rounded-lg hover:neon-border transition-all duration-300">
        <h2 className="text-xl font-semibold text-foreground">Agent {agentAddr ? agentAddr.slice(0,10) : index + 1}</h2>
        <p className="text-muted-foreground mt-1 line-clamp-2">
          {backstory
            ? backstory
            : "No details available."}
        </p>
      </div>
    </Link>
  );
};

export default AgentCard; 