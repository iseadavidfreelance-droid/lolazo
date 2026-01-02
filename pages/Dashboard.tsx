
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Card from '../components/Card';
import { assets, pins, transactions, matrices } from '../lib/mockData';
import { Asset, RarityTier, LifecycleStage } from '../types';
import RarityBadge from '../components/RarityBadge';

const RARITY_COLORS: Record<RarityTier, string> = {
    [RarityTier.COMMON]: '#6B7280',
    [RarityTier.UNCOMMON]: '#16A34A',
    [RarityTier.RARE]: '#2563EB',
    [RarityTier.EPIC]: '#9333EA',
    [RarityTier.LEGENDARY]: '#F59E0B',
};

const Dashboard: React.FC = () => {
  const totalRevenue = useMemo(() =>
    transactions.reduce((sum, txn) => sum + txn.amount, 0),
    []
  );

  const orphanPins = useMemo(() => pins.filter(p => !p.asset_id).length, []);

  const rarityData = useMemo(() => {
    const counts = assets.reduce((acc, asset) => {
      acc[asset.current_rarity] = (acc[asset.current_rarity] || 0) + 1;
      return acc;
    }, {} as Record<RarityTier, number>);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const lifecycleData = useMemo(() => {
     const counts = assets.reduce((acc, asset) => {
      acc[asset.lifecycle_state] = (acc[asset.lifecycle_state] || 0) + 1;
      return acc;
    }, {} as Record<LifecycleStage, number>);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const topAssets = useMemo(() => [...assets].sort((a,b) => b.total_score - a.total_score).slice(0, 5), []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} description={`${transactions.length} transactions`} />
        <Card title="Total Assets" value={assets.length} description={`${matrices.length} matrices`} />
        <Card title="Total Pins" value={pins.length} />
        <Card title="Orphan Pins" value={orphanPins} description="Pins without an assigned asset" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Assets by Rarity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rarityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: 'rgba(107, 114, 128, 0.2)'}} contentStyle={{backgroundColor: '#1F2937', border: '1px solid #4B5563'}}/>
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {rarityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={RARITY_COLORS[entry.name as RarityTier]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
           <h3 className="text-lg font-semibold text-white mb-4">Top 5 Assets by Score</h3>
           <div className="space-y-4">
               {topAssets.map((asset) => (
                   <div key={asset.id} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-md">
                       <div>
                           <p className="font-medium text-white text-sm">{asset.sku_slug}</p>
                           <RarityBadge rarity={asset.current_rarity} />
                       </div>
                       <p className="font-semibold text-lg text-cyan-400">{asset.total_score.toLocaleString()}</p>
                   </div>
               ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
