import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[position:center] z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[position:center] z-0"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center space-y-8 animate-fadeIn">
          <div className="inline-block">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-mint-100 text-mint-800">
              Now in Beta
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Autonomous AI Agents for
            <span className="text-mint-600"> Governance</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Empower delegates with autonomous AI agents in GovernorBravo-compatible systems. Participate in governance efficiently and securely.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link
              to="/proposals"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-mint-600 text-white hover:bg-mint-700 transition-colors"
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