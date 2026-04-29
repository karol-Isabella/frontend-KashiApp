/**
 * Auth Component
 * Componente principal del módulo de autenticación
 * Maneja el flujo completo: Login → Register → OTP Verification
 */

import React, { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { OtpVerificationForm } from './OtpVerificationForm';
import { RegistrationSuccessMessage } from './RegistrationSuccessMessage';
import { useAuth } from '../hooks/useAuth';

type AuthView = 'login' | 'register' | 'otp' | 'registration-success';

export const Auth: React.FC = () => {
  const { logout } = useAuth();
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [otpEmail, setOtpEmail] = useState<string>('');

  const handleShowRegister = () => {
    setCurrentView('register');
  };

  const handleShowLogin = () => {
    setCurrentView('login');
  };

  const handleOtpRequired = (email: string) => {
    setOtpEmail(email);
    setCurrentView('otp');
  };

  const handleOtpSuccess = () => {
    // El OTP fue verificado exitosamente
    // El useAuth hook ya maneja la autenticación
    // Aquí podríamos redirigir a la app principal
    console.log('OTP verificado exitosamente');
  };

  const handleRegistrationSuccess = () => {
    setCurrentView('registration-success');
  };

  const handleLogout = () => {
    logout();
    setCurrentView('login');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'register':
        return (
          <RegisterForm
            onRegistrationSuccess={handleRegistrationSuccess}
            onBack={handleShowLogin}
          />
        );

      case 'registration-success':
        return (
          <RegistrationSuccessMessage
            onGoToLogin={handleShowLogin}
          />
        );

      case 'otp':
        return (
          <OtpVerificationForm
            email={otpEmail}
            onSuccess={handleOtpSuccess}
            onBack={handleShowLogin}
          />
        );

      case 'login':
      default:
        return (
          <LoginForm
            onShowRegister={handleShowRegister}
            onOtpRequired={handleOtpRequired}
          />
        );
    }
  };

  return (
    <AuthLayout>
      {renderCurrentView()}
    </AuthLayout>
  );
};