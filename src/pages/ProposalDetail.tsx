import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Calendar, Check, X } from "lucide-react";

const ProposalDetail = () => {
  const { id } = useParams();

  // Mock data - replace with actual API call
  const proposal = {
    id: 1,
    title: "Upgrade Protocol Parameters",
    status: "active",
    date: "2024-02-20",
    description: "This proposal aims to adjust key protocol parameters to optimize platform performance and risk management. The changes will affect interest rates and collateral factors across multiple markets.",
    votes: {
      for: 1500000,
      against: 500000,
    },
    creator: "0x1234...5678",
    endDate: "2024-03-05",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-mint-100 text-mint-800">
                Active Proposal
              </span>
              <div className="flex items-center text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {proposal.date}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {proposal.title}
            </h1>
            
            <p className="text-gray-600">
              {proposal.description}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Votes</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-1" />
                    For
                  </span>
                  <span className="font-medium">{proposal.votes.for.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="flex items-center text-red-600">
                    <X className="h-4 w-4 mr-1" />
                    Against
                  </span>
                  <span className="font-medium">{proposal.votes.against.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{
                      width: `${(proposal.votes.against / (proposal.votes.for + proposal.votes.against)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Created by</span>
                <p className="font-medium text-gray-900">{proposal.creator}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Voting Ends</span>
                <p className="font-medium text-gray-900">{proposal.endDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;