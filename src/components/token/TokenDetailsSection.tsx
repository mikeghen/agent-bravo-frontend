
import React from 'react';

interface DetailCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  isUtility?: boolean;
}

const DetailCard = ({ icon, title, description, isUtility = false }: DetailCardProps) => (
  <div className={`bg-mint-50 p-6 rounded-lg shadow-sm ${isUtility ? 'bg-mint-800 text-white' : ''}`}>
    <div className="flex items-start gap-4">
      {icon && (
        <div className={`w-12 h-12 ${isUtility ? 'bg-mint-100' : 'bg-mint-100'} rounded-full flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
      )}
      <div>
        <h4 className={`font-semibold ${isUtility ? 'text-white' : 'text-gray-800'} mb-1`}>{title}</h4>
        <p className={isUtility ? 'text-mint-50' : 'text-gray-600'}>{description}</p>
      </div>
    </div>
  </div>
);

const TokenDetailsSection = () => {
  return (
    <div className="max-w-4xl mx-auto mt-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-12">Token Details</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <DetailCard
            title="50/50 Split"
            description="Emissions are split equally between the community and developers"
          />
          <DetailCard
            title="Community Share"
            description="5,000 BRAVO tokens donated monthly through Uniswap V4 BRAVO-ETH and BRAVO-USDC pools"
          />
          <DetailCard
            title="Developer Share"
            description="Allocated to the development team for platform enhancement and growth"
          />
        </div>
        
        <div className="space-y-4">
          <DetailCard
            title="Discord Access"
            description="Exclusive access to token-gated chat channels on Discord"
            isUtility={true}
          />
          <DetailCard
            title="Merchandise Store"
            description="Purchase exclusive Agent Bravo merchandise using BRAVO tokens"
            isUtility={true}
          />
          <DetailCard
            title="Build Reputation"
            description="Have a voice and a vote on the future of the Agent Bravo Framework"
            isUtility={true}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenDetailsSection;
