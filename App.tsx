
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Pins from './pages/Pins';
import Settings from './pages/Settings';
import Matrices from './pages/Matrices';

export enum Page {
  Dashboard,
  Assets,
  Pins,
  Matrices,
  Settings,
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard />;
      case Page.Assets:
        return <Assets />;
      case Page.Pins:
        return <Pins />;
      case Page.Matrices:
          return <Matrices />;
      case Page.Settings:
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
     switch (currentPage) {
      case Page.Dashboard:
        return 'Dashboard';
      case Page.Assets:
        return 'Assets';
      case Page.Pins:
        return 'Pins';
      case Page.Matrices:
        return 'Matrices';
      case Page.Settings:
        return 'System Settings';
      default:
        return 'Dashboard';
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col">
        <Header title={getPageTitle()} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
