/**
 * LoginForm Component
 * Formulario de login - Componente visual específico del módulo de auth
 * Gestiona la presentación y validación básica
 */

import React, { useState, FormEvent } from 'react';
import { LoginCredentials } from '../domain/auth.model';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../../../globals/components/Button';
import { Input } from '../../../globals/components/Input';
import styles from '../styles/auth.module.css';

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  onShowRegister?: () => void;
  onOtpRequired?: (email: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onShowRegister, onOtpRequired }) => {
  const { login, isLoading, error: authError, clearError } = useAuth();
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    // Validación de contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    // Limpiar error general
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
      await login(formData);
      onOtpRequired?.(formData.email);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Acceder</h1>

        {authError && (
          <div className={styles.errorAlert}>
            <p>{authError}</p>
          </div>
        )}

        <div className={styles.formGroup}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="tu@email.com"
            error={errors.email}
            disabled={isLoading}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••"
            error={errors.password}
            disabled={isLoading}
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
        </Button>

        <p className={styles.signupLink}>
          {onShowRegister ? (
            <>
              ¿Aún no tienes usuario y contraseña?{' '}
              <button
                type="button"
                className={styles.link}
                onClick={onShowRegister}
                disabled={isLoading}
              >
                Registrarse aquí
              </button>
            </>
          ) : (
            'Ya tienes cuenta'
          )}
        </p>
      </div>
    </form>
  );
};
