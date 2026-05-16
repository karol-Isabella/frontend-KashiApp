// Maneja todas las peticiones HTTP relacionadas con la billetera.

import { apiClient } from "../../../services/apiClient";
import { ENDPOINTS } from "../../../services/endpoint";
import { Wallet } from "../domain/wallet.model";
import { walletMapper } from "./walletMapper";

export interface WalletResponseDTO {
  id: string;
  balance: number;
  visible: boolean;
  updatedAt: string;
}

export class WalletService {
  async getWalletData(): Promise<Wallet> {

    const response = await apiClient.get<WalletResponseDTO>(
      ENDPOINTS.WALLET.BALANCE,
      {}
    );
    return walletMapper.toModel(response.data as any);
  }

  async toggleVisibility(): Promise<Wallet> {
    const response = await apiClient.request<WalletResponseDTO>(
      ENDPOINTS.WALLET.VISIBILITY,
      { 
        method: 'PATCH' 
      }
    );
    return walletMapper.toModel(response.data as any);
  }
}

export const walletService = new WalletService();