import React from 'react';
import { Calculator, BarChart3 } from 'lucide-react';

const Header: React.FC = () => {

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            <h1 className="text-lg sm:text-xl font-bold text-white">Project Analytics</h1>
          </div>
        </div>
        <nav className="flex items-center space-x-3 sm:space-x-6">
          <div className="flex items-center space-x-1 text-blue-400">
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">Estimation</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;