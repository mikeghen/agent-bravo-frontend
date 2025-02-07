
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import { ArrowLeft, ExternalLink, Check, X, CircleDot } from "lucide-react";

export default function AgentDetail() {
  const { id } = useParams();

  // Mock data - in a real app this would come from your backend
  const agent = {
    id: "1",
    name: "Agent Bravo",
    backstory: "You're a seasoned delegate with experience reviewing governance proposals",
    voteNoConditions: "The proposal does not clearly demonstrate a return on investment (ROI) of at least 10% annually.",
    voteYesConditions: "The proposal clearly demonstrates a return on investment (ROI) of 10% or more annually.",
    voteAbstainConditions: "The proposal's return on investment (ROI) cannot be accurately determined from the provided information.",
    contractAddress: "0x1234567890123456789012345678901234567890",
    votingHistory: [
      {
        id: 1,
        proposalTitle: "Upgrade Protocol Parameters",
        vote: "for",
        timestamp: "2024-02-21 14:30",
        comment: "The proposed parameter adjustments show a clear ROI potential of 15% through increased TVL while maintaining conservative risk levels. This aligns perfectly with our voting criteria for risk-adjusted returns.",
      },
      {
        id: 2,
        proposalTitle: "Implement New Liquidation Module",
        vote: "against",
        timestamp: "2024-02-15 09:45",
        comment: "While the liquidation module upgrade is well-intentioned, our analysis indicates the projected ROI falls short of our 10% threshold. Implementation costs and reduced capital efficiency would result in approximately 7% annual returns.",
      },
      {
        id: 3,
        proposalTitle: "Launch Governance Token Staking",
        vote: "abstain",
        timestamp: "2024-02-10 16:20",
        comment: "The staking mechanism's ROI potential cannot be accurately quantified due to variable market conditions and incomplete tokenomics data. We require additional information to make an informed decision.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <Link to="/agents" className="inline-flex items-center gap-2 text-mint-600 hover:text-mint-700">
            <ArrowLeft className="w-4 h-4" />
            Back to Agents
          </Link>
          <Link to={`/agents/${id}/edit`}>
            <Button className="bg-mint-600 hover:bg-mint-700">Edit Agent</Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-4xl font-bold text-gray-900">{agent.name}</h1>
            <a 
              href={`https://sepolia.etherscan.io/address/${agent.contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mint-600 hover:text-mint-700"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Agent Specifications */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Voting Policy</h2>
                
                <div className="space-y-6">
                  <div className="bg-white border border-gray-900 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Backstory</h3>
                    <p className="text-gray-900 whitespace-pre-wrap">{agent.backstory}</p>
                  </div>

                  <div className="bg-red-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Vote NO Conditions</h3>
                    <p className="text-red-700 whitespace-pre-wrap">{agent.voteNoConditions}</p>
                  </div>

                  <div className="bg-mint-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-mint-800 mb-2">Vote YES Conditions</h3>
                    <p className="text-mint-700 whitespace-pre-wrap">{agent.voteYesConditions}</p>
                  </div>

                  <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Vote ABSTAIN Conditions</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{agent.voteAbstainConditions}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Voting History */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Voting History</h2>
              <div className="space-y-4">
                {agent.votingHistory.map((vote) => (
                  <div key={vote.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-900">{vote.proposalTitle}</h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            vote.vote === 'for' 
                              ? 'bg-mint-100 text-mint-800'
                              : vote.vote === 'against'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {vote.vote === 'for' && <Check className="h-3 w-3 mr-1" />}
                            {vote.vote === 'against' && <X className="h-3 w-3 mr-1" />}
                            {vote.vote === 'abstain' && <CircleDot className="h-3 w-3 mr-1" />}
                            {vote.vote.charAt(0).toUpperCase() + vote.vote.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{vote.comment}</p>
                        <span className="text-xs text-gray-500">{vote.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
