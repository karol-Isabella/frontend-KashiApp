/**
 * Sidebar Component
 * Navegación lateral del dashboard
 */

import React from 'react';
import styles from '../styles/sidebar.module.css';

interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

const DEFAULT_ITEMS: SidebarItem[] = [
  { id: 'ajustes', label: 'Ajustes' },
  { id: 'transacciones', label: 'Transacciones' },
  { id: 'explorar', label: 'Explorar' },
  { id: 'solicitudes', label: 'Solicitudes' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  items = DEFAULT_ITEMS,
  activeItem,
  onItemClick,
}) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <h2 className={styles.title}>KashiApp</h2>
        <nav className={styles.nav}>
          {items.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeItem === item.id ? styles.active : ''}`}
              onClick={() => onItemClick?.(item.id)}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
