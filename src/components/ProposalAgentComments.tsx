import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import AgentCommentCard from './AgentCommentCard';
import { CONTRACTS } from '../config/contracts';
import AgentBravoDelegateABI from '../config/abis/AgentBravoDelegate.json';

interface Opinion {
  proposalId: number;
  support: number; // 0 = Against, 1 = For, 2 = Abstain
  opinion: string;
  reasoning: string;
  timestamp: number;
}

interface ProposalAgentCommentsProps {
  proposalId: string;
}

const ProposalAgentComment: React.FC<{ agentIndex: number; proposalId: string }> = ({ agentIndex, proposalId }) => {
  // Retrieve the agent address from the factory
  const { data: agentAddress } = useContractRead({
    address: CONTRACTS.AgentBravoDelegateFactory.address,
    abi: CONTRACTS.AgentBravoDelegateFactory.abi,
    functionName: 'deployedAgents',
    args: [agentIndex]
  });

  // Using the retrieved agent address, get the opinion for the given proposalId
  const { data: opinion } = useContractRead({
    address: agentAddress ? (agentAddress as `0x${string}`) : undefined,
    abi: AgentBravoDelegateABI,
    functionName: 'getOpinion',
    args: agentAddress ? [proposalId] : undefined
  });

  if (!agentAddress || !opinion) return null;

  const op = opinion as unknown as Opinion;
  // If no opinion exists (timestamp is 0), don't render anything
  if (Number(op.timestamp) === 0) return null;

  return <AgentCommentCard opinion={op} agentAddress={agentAddress as string} />;
};

const ProposalAgentComments: React.FC<ProposalAgentCommentsProps> = ({ proposalId }) => {
    console.log("proposalId", proposalId);
  const [agentCount, setAgentCount] = useState(0);

  // Get the number of deployed agents
  const { data: agentCountData } = useContractRead({
    address: CONTRACTS.AgentBravoDelegateFactory.address,
    abi: CONTRACTS.AgentBravoDelegateFactory.abi,
    functionName: 'getDeployedAgentsCount'
  });

  useEffect(() => {
    if (agentCountData) {
      setAgentCount(Number(agentCountData.toString()));
    }
  }, [agentCountData]);


  return (
    <div className="space-y-6">
      {Array.from({ length: agentCount }, (_, i) => (
        <ProposalAgentComment key={i} agentIndex={i} proposalId={proposalId} />
      ))}
    </div>
  );
};

export default ProposalAgentComments; 