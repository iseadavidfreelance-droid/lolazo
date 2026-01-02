
import React, { useState } from 'react';
import { systemSettings as initialSettings } from '../lib/mockData';
import { SystemSetting } from '../types';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSetting[]>(initialSettings);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [currentValue, setCurrentValue] = useState('');

  const handleEdit = (setting: SystemSetting) => {
    setEditKey(setting.key);
    setCurrentValue(setting.value);
  };

  const handleSave = (key: string) => {
    setSettings(prevSettings =>
      prevSettings.map(s => (s.key === key ? { ...s, value: currentValue, updated_at: new Date().toISOString() } : s))
    );
    setEditKey(null);
  };
  
  const handleCancel = () => {
      setEditKey(null);
  }

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">System Settings (God Mode)</h2>
      <div className="space-y-4">
        {settings.map(setting => (
          <div key={setting.key} className="bg-gray-900/50 p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <p className="font-mono text-cyan-400">{setting.key}</p>
              <p className="text-sm text-gray-400">{setting.description}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2 w-full sm:w-auto">
              {editKey === setting.key ? (
                <>
                  <input
                    type={setting.data_type === 'int' || setting.data_type === 'float' ? 'number' : 'text'}
                    step={setting.data_type === 'float' ? '0.01' : '1'}
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-white w-24"
                  />
                  <button onClick={() => handleSave(setting.key)} className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">Save</button>
                  <button onClick={handleCancel} className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-500">Cancel</button>
                </>
              ) : (
                <>
                  <span className="font-bold text-lg text-white">{setting.value}</span>
                  <button onClick={() => handleEdit(setting)} className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">Edit</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
