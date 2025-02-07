
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

interface ProposalCardProps {
  id: number;
  title: string;
  status: "active" | "passed" | "failed" | "pending";
  date: string;
  description: string;
}

const statusColors = {
  active: "bg-primary/20 text-primary border-primary/30",
  passed: "bg-green-900/20 text-green-400 border-green-500/30",
  failed: "bg-red-900/20 text-red-400 border-red-500/30",
  pending: "bg-gray-800/40 text-gray-400 border-gray-600/30",
};

const ProposalCard = ({ id, title, status, date, description }: ProposalCardProps) => {
  return (
    <Link
      to={`/proposals/${id}`}
      className="block group"
    >
      <div className="p-6 rounded-lg glass-card hover:border-primary/30 transition-all duration-300">
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
          {title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center text-primary font-medium">
          View Details
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default ProposalCard;
