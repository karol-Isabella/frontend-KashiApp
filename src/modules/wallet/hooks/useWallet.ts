// Gestiona el estado y lógica de la billetera

import { useState, useEffect, useCallback } from "react";
import { Wallet } from "../domain/wallet.model";
import { walletService } from "../services/walletService";

export const useWallet = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadWallet = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await walletService.getWalletData();
      setWallet(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error de conexion con la Billetera");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const handleToggle = async () => {
    try {
      setIsLoading(true);


      const updatedWallet = await walletService.toggleVisibility();

      // Guarda la billetera y actualizada en el estado de React
      setWallet(updatedWallet);

      setError(null);
    } catch (err: any) {
      console.error(
        "Error al actualizar visibilidad:",
        err.message
      );
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWallet();
  }, [loadWallet]);

  return { wallet, isLoading, error, toggleVisibility: handleToggle, refetch: loadWallet };
};