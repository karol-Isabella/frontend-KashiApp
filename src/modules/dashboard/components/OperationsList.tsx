/**
 * OperationsList Component
 * Lista de operaciones disponibles
 */

import React, { useState } from 'react';
import { Operation } from '../domain/dashboard.model';
import styles from '../styles/operations.module.css';

interface OperationsListProps {
  operations: Operation[];
  isLoading?: boolean;
}

const MOCK_OPERATIONS: Operation[] = [
  { id: '1', type: 'Ajustes', title: 'Tu usuario', description: 'Manage your profile' },
  { id: '2', type: 'Ajustes', title: 'Bloqueos', description: 'View blocked accounts' },
  { id: '3', type: 'Ajustes', title: 'Preferencias de Plata', description: 'Manage preferences' },
  { id: '4', type: 'Ajustes', title: 'Califica Nuestra app', description: 'Rate the application' },
  { id: '5', type: 'Transacciones', title: 'Tus llaves', description: 'View your keys' },
  { id: '6', type: 'Transacciones', title: 'Recibir plata', description: 'Receive money' },
  { id: '9', type: 'Transacciones', title: 'Ver saldos y movimientos', description: 'View balance' },
];

export const OperationsList: React.FC<OperationsListProps> = ({
  operations = MOCK_OPERATIONS,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredOperations = operations.filter((op) => {
    const matchesSearch = op.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !selectedFilter || op.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const groupedOperations = filteredOperations.reduce((acc, op) => {
    if (!acc[op.type]) {
      acc[op.type] = [];
    }
    acc[op.type].push(op);
    return acc;
  }, {} as Record<string, Operation[]>);

  return (
    <div className={styles.container}>
      {/* Search Bar */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search tickets..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.filterButton}>
            <span>⚙️</span>
            <span>Filter</span>
          </button>
        </div>

        <div className={styles.viewOptions}>
          <button className={styles.viewButton}></button>
          <button className={styles.viewButton}></button>
          <button className={styles.viewButton}></button>
        </div>
      </div>

      {/* Operations List */}
      <div className={styles.operationsList}>
        {Object.entries(groupedOperations).map(([category, ops]) => (
          <div key={category} className={styles.categoryGroup}>
            <h3 className={styles.categoryTitle}>{category}</h3>
            {ops.map((op) => (
              <div key={op.id} className={styles.operationItem}>
                <div className={styles.operationInfo}>
                  <span className={styles.operationType}>{op.type}</span>
                  <span className={styles.operationTitle}>{op.title}</span>
                </div>
                <button className={styles.moreButton}>⋯</button>
              </div>
            ))}
          </div>
        ))}

        {filteredOperations.length === 0 && (
          <div className={styles.emptyState}>
            <p>No operations found</p>
          </div>
        )}
      </div>
    </div>
  );
};
