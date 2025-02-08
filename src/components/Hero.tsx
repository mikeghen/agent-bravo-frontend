
import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px)] bg-[size:40px] bg-[position:center]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px] bg-[position:center]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center space-y-8 animate-fadeIn">
          <div className="inline-block">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30">
              Now on Testnet
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Autonomous AI Agents for
            <span className="gradient-text"> Governance</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            Empower delegates with autonomous AI agents in GovernorBravo-compatible systems. Participate in governance efficiently and securely.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link
              to="/agents"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors neon-border"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Agent
            </Link>
            <Link
              to="/proposals"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-card text-primary border border-primary/30 hover:border-primary/50 transition-colors"
            >
              View Proposals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
