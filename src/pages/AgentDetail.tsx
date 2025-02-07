
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
    backstory: "I am a seasoned delegate with experience reviewing governance proposals",
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
            <h1 className="text-4xl font-bold gradient-text">{agent.name}</h1>
            <a 
              href={`https://sepolia.etherscan.io/address/${agent.contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Agent Specifications */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Voting Policy</h2>
                <p className="text-muted-foreground mb-6 whitespace-pre-wrap">{agent.backstory}</p>
                
                <div className="space-y-6">
                  <div className="bg-destructive/20 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-destructive mb-2">Vote NO Conditions</h3>
                    <p className="text-destructive/90 whitespace-pre-wrap">{agent.voteNoConditions}</p>
                  </div>

                  <div className="bg-primary/20 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary mb-2">Vote YES Conditions</h3>
                    <p className="text-primary/90 whitespace-pre-wrap">{agent.voteYesConditions}</p>
                  </div>

                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Vote ABSTAIN Conditions</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{agent.voteAbstainConditions}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Voting History */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Voting History</h2>
              <div className="space-y-4">
                {agent.votingHistory.map((vote) => (
                  <div key={vote.id} className="glass-card rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-foreground">{vote.proposalTitle}</h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            vote.vote === 'for' 
                              ? 'bg-primary/20 text-primary'
                              : vote.vote === 'against'
                              ? 'bg-destructive/20 text-destructive'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {vote.vote === 'for' && <Check className="h-3 w-3 mr-1" />}
                            {vote.vote === 'against' && <X className="h-3 w-3 mr-1" />}
                            {vote.vote === 'abstain' && <CircleDot className="h-3 w-3 mr-1" />}
                            {vote.vote.charAt(0).toUpperCase() + vote.vote.slice(1)}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{vote.comment}</p>
                        <span className="text-xs text-muted-foreground">{vote.timestamp}</span>
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
