
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const TokenomicsChart = () => {
  const tokenData = generateTokenData();

  return (
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
  );
};

export default TokenomicsChart;
