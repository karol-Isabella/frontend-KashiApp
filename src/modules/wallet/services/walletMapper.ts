import { Wallet } from "../domain/wallet.model";
import { WalletResponseDTO } from "./walletService";

//  Transforma DTOs del backend al modelo de dominio del frontend.

interface ClientResponse<T> {
  success: boolean;  
  data: T;
  message?: string;
}

export const walletMapper = {
  toModel: (response: ClientResponse<WalletResponseDTO>): Wallet => {
    const dto = response.data; 
    return {
      id: dto.id,
      balance: dto.balance,
      isVisible: dto.visible, 
      updatedAt: dto.updatedAt,
    };
  }
};