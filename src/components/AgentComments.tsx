import React from 'react';
import { useContractRead } from 'wagmi';
import AgentCommentCard from './AgentCommentCard';
import AgentBravoDelegateABI from '../config/abis/AgentBravoDelegate.json';

interface Opinion {
  proposalId: number;
  support: number; // 0 = Against, 1 = For, 2 = Abstain
  opinion: string;
  reasoning: string;
  timestamp: number;
}

interface AgentCommentsProps {
  agentAddress: `0x${string}`;
}

const AgentComments: React.FC<AgentCommentsProps> = ({ agentAddress }) => {
  // Read the opinion list for indices 0 and 1
  const { data: opinionId0 } = useContractRead({
    address: agentAddress,
    abi: AgentBravoDelegateABI,
    functionName: 'opinionList',
    args: [0]
  });

  const { data: opinionId1 } = useContractRead({
    address: agentAddress,
    abi: AgentBravoDelegateABI,
    functionName: 'opinionList',
    args: [1]
  });

  // Fetch full opinion details using getOpinion
  const { data: opinion0 } = useContractRead({
    address: agentAddress,
    abi: AgentBravoDelegateABI,
    functionName: 'getOpinion',
    args: opinionId0 ? [opinionId0] : undefined
  });

  const { data: opinion1 } = useContractRead({
    address: agentAddress,
    abi: AgentBravoDelegateABI,
    functionName: 'getOpinion',
    args: opinionId1 ? [opinionId1] : undefined
  });

  if (!opinion0 || !opinion1) {
    return <div>Loading Agent Comments...</div>;
  }

  const opinions: Opinion[] = [
    opinion0 as unknown as Opinion,
    opinion1 as unknown as Opinion
  ];

  return (
    <div className="space-y-6">
      {opinions.map((op, idx) => (
        <AgentCommentCard key={idx} opinion={op} />
      ))}
    </div>
  );
};

export default AgentComments; 
