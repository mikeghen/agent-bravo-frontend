
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TokenStatsCard from "./token/TokenStatsCard";
import TokenomicsChart from "./token/TokenomicsChart";
import TokenDetailsSection from "./token/TokenDetailsSection";

const TokenPresale = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold text-gray-900">
            Buy BRAVO Tokens
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            The governance token powering the Agent Bravo Framework
          </p>
          
          <div className="max-w-4xl mx-auto bg-mint-50 rounded-2xl shadow-lg p-8">
            <div className="grid gap-6 md:grid-cols-4">
              <TokenStatsCard title="Current Price" value="$0.05" />
              <TokenStatsCard title="Current Supply" value="10K" />
              <TokenStatsCard title="Emission Rate" value="10K/month" />
              <TokenStatsCard title="Initial Rate" value="100%" />
            </div>

            <TokenomicsChart />

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/presale"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-mint-600 text-white hover:bg-mint-700 transition-colors"
              >
                Buy Tokens
              </Link>
              <Link
                to="/whitepaper"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-mint-600 border border-mint-200 hover:border-mint-300 transition-colors"
              >
                Read Whitepaper
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          <TokenDetailsSection />
        </div>
      </div>
    </section>
  );
};

export default TokenPresale;
