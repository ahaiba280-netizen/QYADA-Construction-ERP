import React from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import ExecutiveDashboard from '../pages/ExecutiveDashboard';
import ProjectsPage from '../pages/ProjectsPage';
import FinancePage from '../pages/FinancePage';
import ProcurementPage from '../pages/ProcurementPage';
import InventoryPage from '../pages/InventoryPage';
import HRPage from '../pages/HRPage';
import AssetsPage from '../pages/AssetsPage';

const MainLayout: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="flex h-screen bg-primary-dark">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex w-full">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <TopHeader />
                  <main className="flex-1 overflow-auto bg-primary-dark p-6">
                    <Routes>
                      <Route path="/" element={<ExecutiveDashboard />} />
                      <Route path="/projects" element={<ProjectsPage />} />
                      <Route path="/finance" element={<FinancePage />} />
                      <Route path="/procurement" element={<ProcurementPage />} />
                      <Route path="/inventory" element={<InventoryPage />} />
                      <Route path="/hr" element={<HRPage />} />
                      <Route path="/assets" element={<AssetsPage />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default MainLayout;
