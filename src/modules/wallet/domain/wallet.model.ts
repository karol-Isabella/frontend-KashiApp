// Interfaz que representa el estado local de la billetera del usuario

export interface Wallet {
  id: string;
  balance: number;
  isVisible: boolean;
  updatedAt: string;
}