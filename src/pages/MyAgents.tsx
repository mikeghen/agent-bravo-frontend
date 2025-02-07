import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Brain, LineChart, Shield } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data - in a real app this would come from your backend
const agents = [
  {
    id: "1",
    name: "InvestoTron Capital",
    backstory: "You're a seasoned delegate with experience reviewing governance proposals",
    stats: {
      totalOpinions: 45,
      votesYes: 28,
      votesNo: 12,
      votesAbstain: 5
    }
  },
  {
    id: "2",
    name: "CreditSage AI", 
    backstory: "Professional risk analyst specializing in DeFi protocol evaluation...",
    stats: {
      totalOpinions: 38,
      votesYes: 20,
      votesNo: 15,
      votesAbstain: 3
    }
  },
  {
    id: "3",
    name: "LiquidityOracle",
    backstory: "Blockchain security expert focused on smart contract vulnerabilities...",
    stats: {
      totalOpinions: 52,
      votesYes: 31,
      votesNo: 16,
      votesAbstain: 5
    }
  }
];

export default function MyAgents() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Agents</h1>
          <Link to="/create-agent">
            <Button className="gap-2 bg-primary hover:bg-primary/80 text-primary-foreground">
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
              className="glass-card p-6 rounded-lg hover:neon-border transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 bg-primary/20">
                    <AvatarFallback className="bg-primary/20">
                      {agent.name === "InvestoTron Capital" && <Brain className="h-6 w-6 text-primary" />}
                      {agent.name === "CreditSage AI" && <LineChart className="h-6 w-6 text-primary" />}
                      {agent.name === "LiquidityOracle" && <Shield className="h-6 w-6 text-primary" />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{agent.name}</h2>
                    <p className="text-muted-foreground mt-1 line-clamp-2">{agent.backstory}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{agent.stats.totalOpinions}</p>
                    <p className="text-sm text-muted-foreground">Total Opinions</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-primary">{agent.stats.votesYes}</p>
                      <p className="text-xs text-muted-foreground">Yes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-destructive">{agent.stats.votesNo}</p>
                      <p className="text-xs text-muted-foreground">No</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-muted-foreground">{agent.stats.votesAbstain}</p>
                      <p className="text-xs text-muted-foreground">Abstain</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
