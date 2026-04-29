/**
 * RegisterForm Component
 * Formulario de registro de usuario
 * Componente visual específico del módulo de auth
 */

import React, { useState, FormEvent } from 'react';
import { RegisterCredentials } from '../domain/auth.model';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../../../globals/components/Button';
import { Input } from '../../../globals/components/Input';
import styles from '../styles/auth.module.css';

interface RegisterFormProps {
  onRegistrationSuccess?: () => void;
  onBack?: () => void;
}

interface FormErrors {
  username?: string;
  numberPhone?: string;
  identificationNumber?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegistrationSuccess,
  onBack,
}) => {
  const { register, isLoading, error: authError, clearError } = useAuth();
  const [formData, setFormData] = useState<RegisterCredentials & { confirmPassword: string }>({
    username: '',
    numberPhone: '',
    identificationNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!formData.numberPhone.trim()) {
      newErrors.numberPhone = 'El número de teléfono es requerido';
    } else if (formData.numberPhone.length > 10) {
      newErrors.numberPhone = 'El número de teléfono no puede exceder 10 dígitos';
    }

    if (!formData.identificationNumber.trim()) {
      newErrors.identificationNumber = 'La cédula o identificador es requerido';
    } else if (formData.identificationNumber.length > 10) {
      newErrors.identificationNumber = 'La cédula no puede exceder 10 dígitos';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Restricción de 10 dígitos para teléfono e identificación
    if ((name === 'numberPhone' || name === 'identificationNumber') && value.length > 10) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
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
      await register({
        username: formData.username,
        numberPhone: formData.numberPhone,
        identificationNumber: formData.identificationNumber,
        email: formData.email,
        password: formData.password,
      });

      onRegistrationSuccess?.();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Registrarse</h1>

        {authError && (
          <div className={styles.errorAlert}>
            <p>{authError}</p>
          </div>
        )}

        <div className={styles.formGroup}>
          <Input
            label="Nombre de usuario"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="tu_usuario"
            error={errors.username}
            disabled={isLoading}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <Input
            label="Teléfono"
            type="tel"
            name="numberPhone"
            value={formData.numberPhone}
            onChange={handleInputChange}
            placeholder="3001234567"
            error={errors.numberPhone}
            disabled={isLoading}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <Input
            label="Cédula / Identificación"
            type="text"
            name="identificationNumber"
            value={formData.identificationNumber}
            onChange={handleInputChange}
            placeholder="1234567890"
            error={errors.identificationNumber}
            disabled={isLoading}
            required
          />
        </div>

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
          <p className={styles.helperText}>
            Mínimo 6 caracteres
          </p>
        </div>

        <div className={styles.formGroup}>
          <Input
            label="Confirmar Contraseña"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="••••••"
            error={errors.confirmPassword}
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
          {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Button>

        <p className={styles.signupLink}>
          ¿Ya tienes cuenta?{' '}
          {onBack && (
            <button
              type="button"
              className={styles.link}
              onClick={onBack}
              disabled={isLoading}
            >
              Inicia sesión aquí
            </button>
          )}
        </p>
      </div>
    </form>
  );
};