
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";

// Mock data - in a real app this would come from your backend
const agents = [
  {
    id: "1",
    name: "Agent Bravo",
    backstory: "You're a seasoned delegate with experience reviewing governance proposals...",
  },
  // Add more mock agents as needed
];

export default function MyAgents() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Agents</h1>
          <Link to="/create-agent">
            <Button className="gap-2">
              <Plus size={20} />
              Create Agent
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              to={`/agents/${agent.id}`}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{agent.name}</h2>
                  <p className="text-gray-600 mt-1 line-clamp-2">{agent.backstory}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
