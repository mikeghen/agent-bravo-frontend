
import { ArrowRight, Info } from "lucide-react";
import { Progress } from "./ui/progress";
import { Link } from "react-router-dom";

const TokenPresale = () => {
  const progress = 97; // Example progress percentage
  
  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">BRAVO Presale</h2>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-mint-600 text-white">
              LIVE
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="text-gray-400">
              <div className="text-sm">Actual Price</div>
              <div className="text-xl font-bold text-white">$0.025</div>
            </div>
            <div className="text-gray-400 md:text-right">
              <div className="text-sm">Listing Price</div>
              <div className="text-xl font-bold text-white">$0.030</div>
            </div>
          </div>
          
          <Progress value={progress} className="h-3 mb-4" />
          
          <div className="text-center mb-8">
            <div className="text-gray-400 text-sm">USD Raised</div>
            <div className="text-xl font-bold text-white">
              $7,578,582 / $7,800,000
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="text-gray-400 mb-3">Presale payment methods</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["ETH", "USDT", "USDC"].map((token) => (
                  <div
                    key={token}
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-mint-600 flex items-center justify-center text-white font-bold">
                      {token.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{token}</div>
                      <div className="text-gray-400 text-sm">Chain ETH</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <button className="w-full py-4 rounded-lg bg-mint-600 text-white font-medium hover:bg-mint-700 transition-colors">
                Connect Wallet
              </button>
              
              <Link
                to="/whitepaper"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-mint-600 border border-mint-200 hover:border-mint-300 transition-colors"
              >
                Read Whitepaper
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="flex items-start gap-2 p-4 rounded-lg bg-gray-800 text-sm text-gray-300">
              <Info className="h-5 w-5 flex-shrink-0 text-mint-400" />
              <p>
                Processing fee and network fee will be included on top of your purchase amount.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPresale;
