import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiBell, FiMessageSquare, FiUser, FiGlobe } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const TopHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="bg-primary-panel border-b border-gold-border px-8 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-3 text-gold" size={20} />
          <input
            type="text"
            placeholder={t('search')}
            className="w-full bg-primary-dark border border-gold-border rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-gold hover:text-black rounded-lg transition-all">
          <FiBell size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-status-error rounded-full"></span>
        </button>

        {/* Messages */}
        <button className="relative p-2 hover:bg-gold hover:text-black rounded-lg transition-all">
          <FiMessageSquare size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-status-warning rounded-full"></span>
        </button>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="p-2 hover:bg-gold hover:text-black rounded-lg transition-all flex items-center space-x-1"
        >
          <FiGlobe size={24} />
          <span className="text-sm">{i18n.language.toUpperCase()}</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-6 border-l border-gold-border">
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black font-bold">
            {user?.first_name?.[0]}
          </div>
          <div className="text-sm">
            <p className="text-white font-medium">{user?.first_name}</p>
            <p className="text-gray-400 text-xs">{user?.roles?.[0]}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
