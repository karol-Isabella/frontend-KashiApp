/**
 * Dashboard Domain Models
 * Define las entidades del dominio del dashboard
 */

export interface Operation {
  id: string;
  type: 'Ajustes' | 'Transacciones' | 'Explorar' | 'Solicitudes';
  title: string;
  description?: string;
}

export interface UserBalance {
  amount: number;
  currency: string;
}

export interface DashboardState {
  isLoading: boolean;
  error: string | null;
  operations: Operation[];
  userBalance: UserBalance;
}
