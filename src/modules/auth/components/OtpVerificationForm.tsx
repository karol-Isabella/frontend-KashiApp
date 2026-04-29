/**
 * OtpVerificationForm Component
 * Formulario para verificar código OTP después del registro
 * Componente visual específico del módulo de auth
 */

import React, { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../../../globals/components/Button';
import { Input } from '../../../globals/components/Input';
import styles from '../styles/auth.module.css';

interface OtpVerificationFormProps {
  email: string;
  onSuccess?: () => void;
  onBack?: () => void;
}

export const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
  email,
  onSuccess,
  onBack,
}) => {
  const { verifyOtp, isLoading, error: authError, clearError } = useAuth();
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<{ otp?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { otp?: string } = {};

    if (!otp) {
      newErrors.otp = 'El código OTP es requerido';
    } else if (otp.length !== 6) {
      newErrors.otp = 'El código OTP debe tener 6 dígitos';
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = 'El código OTP debe contener solo números';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Solo números
    setOtp(value);

    if (errors.otp) {
      setErrors({});
    }

    if (authError) {
      clearError();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await verifyOtp({ email, otp });
      onSuccess?.();
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  const handleResendOtp = () => {
    // TODO: Implementar reenvío de OTP
    console.log('Reenviar OTP a:', email);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Verificar Código</h1>
        <p className={styles.subtitle}>
          Ingresa el código de 6 dígitos enviado a <strong>{email}</strong>
        </p>

        {authError && (
          <div className={styles.errorAlert}>
            <p>{authError}</p>
          </div>
        )}

        <div className={styles.formGroup}>
          <Input
            label="Código OTP"
            type="text"
            value={otp}
            onChange={handleInputChange}
            placeholder="123456"
            error={errors.otp}
            disabled={isLoading}
            maxLength={6}
            required
          />
          <p className={styles.helperText}>
            El código expira en 10 minutos
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? 'Verificando...' : 'Verificar Código'}
        </Button>

        <div className={styles.otpActions}>
          <button
            type="button"
            className={styles.link}
            onClick={handleResendOtp}
            disabled={isLoading}
          >
            Reenviar código
          </button>

          {onBack && (
            <button
              type="button"
              className={styles.link}
              onClick={onBack}
              disabled={isLoading}
            >
              Volver
            </button>
          )}
        </div>
      </div>
    </form>
  );
};