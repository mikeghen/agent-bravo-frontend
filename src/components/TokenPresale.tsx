
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TokenPresale = () => {
  // Calculate token supply data for 36 months
  const generateTokenData = () => {
    const data = [];
    const monthlyMint = 10000; // 10K tokens minted per month

    for (let month = 1; month <= 36; month++) {
      const supply = monthlyMint * month;
      const inflationRate = (monthlyMint / supply) * 100;
      
      data.push({
        month: month,
        supply: supply,
        inflationRate: inflationRate,
      });
    }
    return data;
  };

  const tokenData = generateTokenData();

  return (
    <section className="py-20 bg-white">
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
              <div className="p-4 rounded-lg bg-white">
                <h3 className="font-semibold text-gray-600">Current Price</h3>
                <p className="text-2xl font-bold text-gray-900">$0.05</p>
              </div>
              <div className="p-4 rounded-lg bg-white">
                <h3 className="font-semibold text-gray-600">Total Supply</h3>
                <p className="text-2xl font-bold text-gray-900">10K</p>
              </div>
              <div className="p-4 rounded-lg bg-white">
                <h3 className="font-semibold text-gray-600">Monthly Mint</h3>
                <p className="text-2xl font-bold text-gray-900">10K</p>
              </div>
              <div className="p-4 rounded-lg bg-white">
                <h3 className="font-semibold text-gray-600">Initial Rate</h3>
                <p className="text-2xl font-bold text-gray-900">100%</p>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tokenomics</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tokenData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="month" 
                      label={{ value: 'Months', position: 'bottom', offset: -5 }}
                      tickLine={false}
                      tick={false}
                    />
                    <YAxis 
                      yAxisId="left"
                      label={{ 
                        value: 'Token Supply', 
                        angle: -90, 
                        position: 'insideLeft'
                      }}
                      tickLine={false}
                      tick={false}
                      domain={[0, 400000]}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      label={{ 
                        value: 'Inflation Rate', 
                        angle: 90, 
                        position: 'insideRight'
                      }}
                      tickLine={false}
                      tick={false}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => {
                        if (name === 'Token Supply') {
                          return [`${value.toLocaleString()} tokens`, name];
                        }
                        return [`${value.toFixed(2)}%`, 'Inflation Rate'];
                      }}
                      labelFormatter={(month) => `Month ${month}`}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="supply" 
                      stroke="#22C55E" 
                      name="Token Supply"
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="inflationRate" 
                      stroke="#6B7280" 
                      name="Inflation Rate"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

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

          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Token Details</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Token Distribution</h3>
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">50/50 Split</h4>
                      <p className="text-gray-600">Emissions are split equally between the community and developers</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Community Share</h4>
                      <p className="text-gray-600">5,000 BRAVO tokens distributed monthly through Uniswap V4 BRAVO-ETH and BRAVO-USDC pools</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Developer Share</h4>
                      <p className="text-gray-600">Allocated to the development team for platform enhancement and growth</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Token Utilities</h3>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-mint-600">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Discord Access</h4>
                        <p className="text-gray-600">Exclusive access to token-gated chat channels on Discord</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-mint-600">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Merchandise Store</h4>
                        <p className="text-gray-600">Purchase exclusive Agent Bravo merchandise using BRAVO tokens</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-mint-600">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Agent Management</h4>
                        <p className="text-gray-600">Use BRAVO tokens as payment for managing Agent Bravo instances</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenPresale;
