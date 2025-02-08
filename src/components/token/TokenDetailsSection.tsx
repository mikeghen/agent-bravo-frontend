
import React from 'react';

interface DetailCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  isUtility?: boolean;
}

const DetailCard = ({ icon, title, description, isUtility = false }: DetailCardProps) => (
  <div className={`glass-card p-6 rounded-lg ${isUtility ? 'bg-primary/20' : ''}`}>
    <div className="flex items-start gap-4">
      {icon && (
        <div className={`w-12 h-12 ${isUtility ? 'bg-primary/20' : 'bg-primary/20'} rounded-full flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
      )}
      <div>
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

const TokenDetailsSection = () => {
  return (
    <div className="max-w-4xl mx-auto mt-24">
      <h2 className="text-3xl font-bold gradient-text mb-12">Token Details</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <DetailCard
            title="50/50 Split"
            description="10K/month BRAVO emissions are split equally between the community and developers"
          />
          <DetailCard
            title="Community Share"
            description="5K/month donated through hooks on Uniswap V4 BRAVO-ETH and BRAVO-USDC"
          />
          <DetailCard
            title="Developer Share"
            description="5K/month allocated to the developers to support the Agent Bravo's development"
          />
        </div>
        
        <div className="space-y-4">
          <DetailCard
            title="Community Access"
            description="Exclusive access to token-gated communications channels on Discord"
            isUtility={true}
          />
          <DetailCard
            title="Build Reputation"
            description="Have a voice and a vote on the future of the Agent Bravo Framework"
            isUtility={true}
          />
          <DetailCard
            title="Merchandise Store"
            description="Purchase exclusive Agent Bravo merchandise using BRAVO tokens"
            isUtility={true}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenDetailsSection;

