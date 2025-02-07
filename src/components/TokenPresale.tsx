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
              <div className="h-[400px] w-full">
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
        </div>
      </div>
    </section>
  );
};

export default TokenPresale;
