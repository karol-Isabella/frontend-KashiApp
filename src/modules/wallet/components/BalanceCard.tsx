// Componente que muestra el saldo actual de la billetera
// Incluye opción para ocultar/mostrar el monto por privacidad

import React from "react";
import { useWallet } from "../hooks/useWallet";
import { Button } from "../../../globals/components/Button";
import styles from "../styles/wallet.module.css";

export const BalanceCard: React.FC = () => {
  const { wallet, isLoading, error, toggleVisibility } = useWallet();

  if (isLoading) return <div className={styles.statusContainer}><span className={styles.loading}>Cargando...</span></div>;
  
  if (error) return <div className={styles.statusContainer}><span className={styles.error}>Error de Billetera</span></div>;

  if (!wallet) return null;

  return (
    <div className={styles.walletContainer}>
      <div className={styles.infoArea}>
        <span className={styles.label}>Saldo Disponible</span>
        {wallet.isVisible ? (
          <span className={styles.amount}>
            ${wallet.balance.toLocaleString("es-CO", { minimumFractionDigits: 2 })}
          </span>
        ) : (
          <span className={styles.hiddenAmount}>*****</span>
        )}
      </div>
      <Button 
        variant="secondary" 
        onClick={toggleVisibility}
        style={{ padding: '6px 12px', fontSize: '12px', height: 'auto' }}
      >
        {wallet.isVisible ? "Esconder" : "Mostrar Saldo"}
      </Button>
    </div>
  );
};