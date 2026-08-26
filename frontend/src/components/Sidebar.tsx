import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiBox, FiDollarSign, FiShoppingCart, FiUsers, FiTruck, FiFileText, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const menuItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: FiHome, path: '/' },
    { id: 'projects', label: t('nav.projects'), icon: FiBox, path: '/projects' },
    { id: 'finance', label: t('nav.finance'), icon: FiDollarSign, path: '/finance' },
    { id: 'procurement', label: t('nav.procurement'), icon: FiShoppingCart, path: '/procurement' },
    { id: 'inventory', label: t('nav.inventory'), icon: FiBox, path: '/inventory' },
    { id: 'hr', label: t('nav.hr'), icon: FiUsers, path: '/hr' },
    { id: 'assets', label: t('nav.assets'), icon: FiTruck, path: '/assets' },
    { id: 'documents', label: t('nav.documents'), icon: FiFileText, path: '/documents' }
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 right-6 z-50 p-2 bg-gold rounded-lg text-black"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } bg-primary-panel border-r border-gold-border transition-all duration-300 hidden md:flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-center border-b border-gold-border">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">Q</div>
            {isOpen && <div className="text-xs text-gold mt-1">QYADA</div>}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gold hover:text-black transition-all duration-200 text-left text-sm"
              >
                <Icon size={20} />
                {isOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-gold-border space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gold hover:text-black transition-all duration-200 text-sm">
            <FiSettings size={20} />
            {isOpen && <span>{t('nav.settings')}</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-status-error hover:text-white transition-all duration-200 text-sm"
          >
            <FiLogOut size={20} />
            {isOpen && <span>{t('nav.logout')}</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
