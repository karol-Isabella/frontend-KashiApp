/**
 * Dashboard Component
 * Componente principal del dashboard
 */

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { OperationsList } from './OperationsList';
import { useAuth } from '../../auth/hooks/useAuth';
import styles from '../styles/dashboard.module.css';

interface DashboardSidebarItem {
  id: string;
  label: string;
  icon?: string;
}

const SIDEBAR_ITEMS: DashboardSidebarItem[] = [
  { id: 'ajustes', label: 'Ajustes' },
  { id: 'transacciones', label: 'Transacciones' },
  { id: 'explorar', label: 'Explorar' },
  { id: 'solicitudes', label: 'Solicitudes' },
];

export const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string>('ajustes');
  const [userBalance] = useState({ amount: 0, currency: 'COP' });

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <h1>KashiApp</h1>
          </div>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Sidebar */}
        <Sidebar
          items={SIDEBAR_ITEMS}
          activeItem={activeMenu}
          onItemClick={setActiveMenu}
        />

        {/* Content Area */}
        <div className={styles.contentArea}>
          <div className={styles.topBar}>
            <h2 className={styles.pageTitle}>Buscar Operación</h2>
            <div className={styles.balanceCard}>
              <span className={styles.balanceLabel}>Tu Monto</span>
              <span className={styles.balanceAmount}>
                {userBalance.amount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Operations List */}
          <OperationsList operations={[]} />
        </div>
      </div>
    </div>
  );
};
