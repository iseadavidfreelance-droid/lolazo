
import React from 'react';
import { RarityTier } from '../types';

interface RarityBadgeProps {
  rarity: RarityTier;
}

const rarityStyles: Record<RarityTier, string> = {
  [RarityTier.COMMON]: 'bg-gray-600 text-gray-100',
  [RarityTier.UNCOMMON]: 'bg-green-600 text-white',
  [RarityTier.RARE]: 'bg-blue-600 text-white',
  [RarityTier.EPIC]: 'bg-purple-600 text-white',
  [RarityTier.LEGENDARY]: 'bg-yellow-500 text-black',
};

const RarityBadge: React.FC<RarityBadgeProps> = ({ rarity }) => {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${rarityStyles[rarity]}`}
    >
      {rarity}
    </span>
  );
};

export default RarityBadge;
