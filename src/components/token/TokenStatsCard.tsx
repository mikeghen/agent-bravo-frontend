
import React from 'react';

interface TokenStatsCardProps {
  title: string;
  value: string;
}

const TokenStatsCard = ({ title, value }: TokenStatsCardProps) => {
  return (
    <div className="p-4 rounded-lg bg-white">
      <h3 className="font-semibold text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default TokenStatsCard;
