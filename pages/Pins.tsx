
import React, { useState, useMemo } from 'react';
import { pins } from '../lib/mockData';

const Pins: React.FC = () => {
  const [showOrphansOnly, setShowOrphansOnly] = useState(false);

  const filteredPins = useMemo(() => {
    if (showOrphansOnly) {
      return pins.filter(pin => !pin.asset_id);
    }
    return pins;
  }, [showOrphansOnly]);

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="mb-4 flex items-center">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOrphansOnly}
            onChange={e => setShowOrphansOnly(e.target.checked)}
            className="form-checkbox h-5 w-5 bg-gray-700 border-gray-600 rounded text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-gray-300">Show Orphan Pins Only</span>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900/50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6">Image</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">External ID</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Title</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Impressions</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Outbound Clicks</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Asset ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-800">
            {filteredPins.map(pin => (
              <tr key={pin.id} className="hover:bg-gray-700/50">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                  <img src={pin.image_url} alt={pin.title || 'Pin image'} className="h-10 w-10 rounded-md object-cover"/>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{pin.external_pin_id}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{pin.title}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{pin.last_stats.impressions?.toLocaleString() || 0}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{pin.last_stats.outbound_clicks?.toLocaleString() || 0}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                  {pin.asset_id ? 
                    <span className="text-green-400">{pin.asset_id}</span> : 
                    <span className="text-yellow-500 font-bold">ORPHAN</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pins;
