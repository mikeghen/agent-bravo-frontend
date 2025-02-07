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
  active: "bg-mint-100 text-mint-800",
  passed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  pending: "bg-gray-100 text-gray-800",
};

const ProposalCard = ({ id, title, status, date, description }: ProposalCardProps) => {
  return (
    <Link
      to={`/proposals/${id}`}
      className="block group"
    >
      <div className="p-6 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm hover:border-mint-200 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            {date}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-mint-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center text-mint-600 font-medium">
          View Details
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default ProposalCard;