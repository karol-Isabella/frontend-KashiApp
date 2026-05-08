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

}
