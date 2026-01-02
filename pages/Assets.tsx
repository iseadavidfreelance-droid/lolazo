
import React, { useState, useMemo } from 'react';
import { assets, matrices } from '../lib/mockData';
import RarityBadge from '../components/RarityBadge';
import { Asset, LifecycleStage } from '../types';
import { generateAssetDescription } from '../services/geminiService';

const lifecycleColors: Record<LifecycleStage, string> = {
  [LifecycleStage.INCUBATION]: 'text-blue-400',
  [LifecycleStage.MONETIZATION]: 'text-green-400',
  [LifecycleStage.DOMINANCE]: 'text-red-400',
};

const AssetDetailModal: React.FC<{ asset: Asset; onClose: () => void }> = ({ asset, onClose }) => {
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateDescription = async () => {
        setIsLoading(true);
        const desc = await generateAssetDescription(asset);
        setDescription(desc);
        setIsLoading(false);
    };
    
    const primaryMatrix = matrices.find(m => m.id === asset.primary_matrix_id)?.code;
    const secondaryMatrix = matrices.find(m => m.id === asset.secondary_matrix_id)?.code;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{asset.sku_slug}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div><strong className="text-gray-400">Primary Matrix:</strong> {primaryMatrix || 'N/A'}</div>
                        <div><strong className="text-gray-400">Secondary Matrix:</strong> {secondaryMatrix || 'N/A'}</div>
                        <div><strong className="text-gray-400">Rarity:</strong> <RarityBadge rarity={asset.current_rarity} /></div>
                        <div className={lifecycleColors[asset.lifecycle_state]}><strong className="text-gray-400">Lifecycle:</strong> {asset.lifecycle_state}</div>
                        <div><strong className="text-gray-400">Total Score:</strong> <span className="text-cyan-400 font-bold">{asset.total_score.toLocaleString()}</span></div>
                        <div><strong className="text-gray-400">Payhip Link:</strong> {asset.payhip_link ? <a href={asset.payhip_link} className="text-blue-400 hover:underline">Link</a> : <span className="text-yellow-500">Missing</span>}</div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-300 mb-2">Gemini-Powered Description</h4>
                        <div className="bg-gray-900 p-4 rounded-md min-h-[100px] text-gray-300">
                           {isLoading ? 'Generating...' : description || 'Click the button to generate a description.'}
                        </div>
                        <button 
                            onClick={handleGenerateDescription}
                            disabled={isLoading}
                            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-500"
                        >
                            {isLoading ? 'Generating...' : 'Generate Description'}
                        </button>
                    </div>
                </div>
                <div className="p-4 bg-gray-900/50 text-right">
                   <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Close</button>
                </div>
            </div>
        </div>
    );
};


const Assets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const filteredAssets = useMemo(() => {
    return assets.filter(asset =>
      asset.sku_slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
       {selectedAsset && <AssetDetailModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by SKU..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-xs bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900/50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6">SKU</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Score</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Rarity</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Lifecycle</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Payhip Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-800">
            {filteredAssets.map(asset => (
              <tr key={asset.id} className="hover:bg-gray-700/50 cursor-pointer" onClick={() => setSelectedAsset(asset)}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">{asset.sku_slug}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-cyan-400 font-semibold">{asset.total_score.toLocaleString()}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300"><RarityBadge rarity={asset.current_rarity} /></td>
                <td className={`whitespace-nowrap px-3 py-4 text-sm font-medium ${lifecycleColors[asset.lifecycle_state]}`}>{asset.lifecycle_state}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                  {asset.payhip_link ? 
                    <span className="text-green-400">Active</span> : 
                    <span className="text-yellow-500">Missing</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assets;
