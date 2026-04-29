/**
 * RegistrationSuccessMessage Component
 * Muestra un mensaje de éxito después del registro
 */

import React from 'react';
import { Button } from '../../../globals/components/Button';
import styles from '../styles/auth.module.css';

interface RegistrationSuccessMessageProps {
  onGoToLogin?: () => void;
}

export const RegistrationSuccessMessage: React.FC<RegistrationSuccessMessageProps> = ({
  onGoToLogin,
}) => {
  return (
    <div className={styles.form}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>¡Registro Exitoso!</h1>
        <p className={styles.subtitle}>
          Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesión con tus credenciales.
        </p>

        <div className={styles.successIcon}>
          ✓
        </div>

        <Button
          type="button"
          variant="primary"
          className={styles.submitButton}
          onClick={onGoToLogin}
        >
          Ir a Iniciar Sesión
        </Button>
      </div>
    </div>
  );
};
