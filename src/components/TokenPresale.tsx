
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const TokenPresale = () => {
  return (
    <section className="py-20 bg-mint-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold text-gray-900">
            BRAVO Token Presale
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            The governance token powering the Agent Bravo Framework
          </p>
          
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-mint-50">
                <h3 className="font-semibold text-gray-900">Current Price</h3>
                <p className="text-2xl font-bold text-mint-600">$0.05</p>
              </div>
              <div className="p-4 rounded-lg bg-mint-50">
                <h3 className="font-semibold text-gray-900">Tokens Left</h3>
                <p className="text-2xl font-bold text-mint-600">4.5M</p>
              </div>
              <div className="p-4 rounded-lg bg-mint-50">
                <h3 className="font-semibold text-gray-900">Ends In</h3>
                <p className="text-2xl font-bold text-mint-600">14 Days</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-full h-4">
                <div 
                  className="bg-mint-600 h-full rounded-full"
                  style={{ width: '55%' }}
                />
              </div>
              <p className="text-sm text-gray-600">
                5.5M / 10M tokens sold
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </div>
    </section>
  );
};

export default TokenPresale;
