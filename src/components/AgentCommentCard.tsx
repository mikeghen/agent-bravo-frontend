import React from 'react';
import { Check, X, CircleDot } from "lucide-react";

interface Opinion {
  proposalId: number;
  support: number; // 0 = Against, 1 = For, 2 = Abstain
  opinion: string;
  reasoning: string;
  timestamp: number;
}

interface AgentCommentCardProps {
  opinion: Opinion;
  agentAddress?: string;
}

const AgentCommentCard: React.FC<AgentCommentCardProps> = ({ opinion, agentAddress }) => {
  let label = "";
  let bgClass = "";
  let textClass = "";
  let borderClass = "";
  let IconComponent: React.ElementType | null = null;

  console.log("opinion", opinion);

  switch (opinion.support) {
    case 1:
      label = "For";
      bgClass = "bg-primary/20";
      textClass = "text-primary";
      borderClass = "border-primary/30";
      IconComponent = Check;
      break;
    case 0:
      label = "Against";
      bgClass = "bg-[#F97316]/20";
      textClass = "text-[#F97316]";
      borderClass = "border-[#F97316]/30";
      IconComponent = X;
      break;
    case 2:
      label = "Abstain";
      bgClass = "bg-blue-300/20";
      textClass = "text-blue-400";
      borderClass = "border-blue-300/30";
      IconComponent = CircleDot;
      break;
    default:
      label = "Unknown";
      bgClass = "bg-gray-200";
      textClass = "text-gray-600";
      borderClass = "border-gray-300";
      break;
  }

  const formattedDate = new Date(Number(opinion.timestamp) * 1000).toLocaleString();

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="space-y-1">
          {agentAddress ? (
            <h3>
              Agent: {agentAddress.slice(0, 6)}...
            </h3>
          ) : (
            <h3>
              Proposal #{opinion.proposalId.toString().slice(-4)}
            </h3>
          )}
        </div>
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${bgClass} ${textClass} border ${borderClass}`}>
          {IconComponent && <IconComponent className="h-3 w-3 mr-1" />}
          {label}
        </span>
      </div>
      <p className="text-muted-foreground text-sm mb-2">{opinion.opinion}</p>
      <p className="text-muted-foreground text-sm mb-2">{opinion.reasoning}</p>
      <span className="text-xs text-muted-foreground">{formattedDate}</span>
    </div>
  );
};

export default AgentCommentCard; 