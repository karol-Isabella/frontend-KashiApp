/**
 * AuthLayout Component
 * Layout principal para la sección de autenticación
 * Incluye header con logo y botones de navegación
 */

import React from 'react';
import styles from '../styles/authLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
  onContinue?: () => void;
  showNavButtons?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  onLogout,
  onContinue,
  showNavButtons = false,
}) => {
  return (
    <div className={styles.layoutContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <h1>KashiApp</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};
