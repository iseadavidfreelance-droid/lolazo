
import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  description?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, description, children }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      {children}
    </div>
  );
};

export default Card;
