
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TokenStatsCard from "./token/TokenStatsCard";
import TokenomicsChart from "./token/TokenomicsChart";
import TokenDetailsSection from "./token/TokenDetailsSection";

const TokenPresale = () => {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold gradient-text">
            Buy BRAVO Tokens
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            The governance token powering the Agent Bravo Framework
          </p>
          
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8">
            <div className="grid gap-6 md:grid-cols-4">
              <TokenStatsCard title="Current Price" value="$0.05" />
              <TokenStatsCard title="Current Supply" value="10K" />
              <TokenStatsCard title="Emission Rate" value="10K/month" />
              <TokenStatsCard title="Market Cap" value="$500" />
            </div>

            <TokenomicsChart />

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/presale"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors border border-primary/30"
              >
                Buy Tokens
              </Link>
              <Link
                to="/whitepaper"
                className="inline-flex items-center px-6 py-3 rounded-lg glass-card text-primary hover:neon-border transition-all duration-300"
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
