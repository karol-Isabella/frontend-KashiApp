/**
 * useAuth Hook
 * Gestiona el estado de autenticación y proporciona métodos para login/logout
 * Encapsula toda la lógica de React (useState, useEffect, etc)
 */

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { LoginCredentials, RegisterCredentials, VerifyOtpCredentials, AuthState, UserAuth } from '../domain/auth.model';
import { authService } from '../services/authService';
import { mapAuthFromApi, mapUserProfileFromApi } from '../services/authMapper';

const INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
  accessToken: null,
  isOtpRequired: false,
  loginAttempts: 0,
  isLoginLocked: false,
};

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<UserAuth>;
  verifyOtp: (credentials: VerifyOtpCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<AuthState>(INITIAL_STATE);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userJson = localStorage.getItem('user');
    const savedAttempts = Number(localStorage.getItem('loginAttempts') || '0');

    if (token) {
      let user: UserAuth | null = null;

      if (userJson) {
        try {
          user = JSON.parse(userJson);
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
        }
      }

      setState({
        isAuthenticated: true,
        isLoading: false,
        error: null,
        user,
        accessToken: token,
        isOtpRequired: false,
        loginAttempts: savedAttempts,
        isLoginLocked: savedAttempts >= 5,
      });
    } else {
      setState((prev) => ({
        ...prev,
        loginAttempts: savedAttempts,
        isLoginLocked: savedAttempts >= 5,
      }));
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    if (state.isLoginLocked) {
      const errorMessage = 'Has alcanzado el máximo de intentos. Intenta más tarde.';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw new Error(errorMessage);
    }

    try {
      await authService.login(credentials);

      localStorage.removeItem('loginAttempts');

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
        isOtpRequired: true,
        loginAttempts: 0,
        isLoginLocked: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
      const attempts = Math.min(state.loginAttempts + 1, 5);
      const locked = attempts >= 5;

      localStorage.setItem('loginAttempts', String(attempts));

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: locked ? 'Has alcanzado el máximo de intentos. Intenta más tarde.' : errorMessage,
        loginAttempts: attempts,
        isLoginLocked: locked,
      }));

      throw error;
    }
  }, [state.isLoginLocked, state.loginAttempts]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authService.register(credentials);
      const mappedUser = mapUserProfileFromApi(response);

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));

      return mappedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrar el usuario';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const verifyOtp = useCallback(async (credentials: VerifyOtpCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authService.verifyOtp(credentials.email, credentials.otp);
      const mappedAuth = mapAuthFromApi(response);

      localStorage.setItem('accessToken', mappedAuth.accessToken);
      localStorage.removeItem('user');

      setState({
        isAuthenticated: true,
        isLoading: false,
        error: null,
        user: null,
        accessToken: mappedAuth.accessToken,
        isOtpRequired: false,
        loginAttempts: 0,
        isLoginLocked: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'OTP inválido';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('loginAttempts');

    setState(INITIAL_STATE);
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        verifyOtp,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
