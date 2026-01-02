
import React from 'react';
import { matrices } from '../lib/mockData';
import { MatrixType } from '../types';

const matrixTypeColors: Record<MatrixType, string> = {
    [MatrixType.PRIMARY]: 'bg-blue-500 text-white',
    [MatrixType.SECONDARY]: 'bg-purple-500 text-white',
};

const Matrices: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Matrices Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900/50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6">Code</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Name</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Type</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-800">
            {matrices.map(matrix => (
              <tr key={matrix.id} className="hover:bg-gray-700/50">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono font-medium text-cyan-400 sm:pl-6">{matrix.code}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{matrix.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${matrixTypeColors[matrix.type]}`}>
                    {matrix.type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{new Date(matrix.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Matrices;
