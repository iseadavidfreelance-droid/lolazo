
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex-shrink-0 bg-gray-800 border-b border-gray-700 lg:border-none">
      <div className="flex items-center justify-center lg:justify-start h-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-white mt-12 lg:mt-0">{title}</h2>
      </div>
    </header>
  );
};

export default Header;
