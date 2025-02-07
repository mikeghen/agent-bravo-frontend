
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";

export default function AgentDetail() {
  const { id } = useParams();

  // Mock data - in a real app this would come from your backend
  const agent = {
    id: "1",
    name: "Agent Bravo",
    backstory: "You're a seasoned delegate with experience reviewing governance proposals...",
    voteNoConditions: "The proposal does not clearly demonstrate a return on investment (ROI) of at least 10% annually.",
    voteYesConditions: "The proposal clearly demonstrates a return on investment (ROI) of 10% or more annually.",
    voteAbstainConditions: "The proposal's return on investment (ROI) cannot be accurately determined from the provided information.",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Link to="/agents" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Agents
        </Link>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{agent.name}</h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Backstory</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{agent.backstory}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Vote NO Conditions</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{agent.voteNoConditions}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Vote YES Conditions</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{agent.voteYesConditions}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Vote ABSTAIN Conditions</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{agent.voteAbstainConditions}</p>
            </div>

            <Link to={`/agents/${id}/edit`}>
              <Button className="w-full">Edit Agent</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
