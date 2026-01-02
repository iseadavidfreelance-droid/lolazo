
import React, { useState } from 'react';
import { Page } from '../App';
import { DashboardIcon, AssetIcon, PinIcon, SettingsIcon, MatrixIcon, MenuIcon, CloseIcon } from './icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  page: Page;
  currentPage: Page;
  onClick: (page: Page) => void;
}> = ({ icon, label, page, currentPage, onClick }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onClick(page)}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-gray-700 text-white'
          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: <DashboardIcon />, label: 'Dashboard', page: Page.Dashboard },
    { icon: <AssetIcon />, label: 'Assets', page: Page.Assets },
    { icon: <PinIcon />, label: 'Pins', page: Page.Pins },
    { icon: <MatrixIcon />, label: 'Matrices', page: Page.Matrices },
    { icon: <SettingsIcon />, label: 'Settings', page: Page.Settings },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    if(isOpen) setIsOpen(false);
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
            <h1 className="text-xl font-bold text-white tracking-wider">ALFA OS</h1>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                <CloseIcon className="h-6 w-6"/>
            </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {navItems.map(item => (
                <NavItem key={item.page} {...item} currentPage={currentPage} onClick={handleNavClick} />
            ))}
        </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-800 text-gray-300">
          <MenuIcon className="h-6 w-6"/>
      </button>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-30 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden bg-gray-800 border-r border-gray-700 w-64`}>
          {sidebarContent}
      </div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden" onClick={() => setIsOpen(false)}></div>}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0">
          <div className="flex flex-col w-64 bg-gray-800 border-r border-gray-700">
              {sidebarContent}
          </div>
      </div>
    </>
  );
};

export default Sidebar;
