/**
 * useAuth Hook
 * Gestiona el estado de autenticación y proporciona métodos para login/logout
 * Encapsula toda la lógica de React (useState, useEffect, etc)
 */

import { useState, useCallback, useEffect } from 'react';
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
};

export const useAuth = () => {
  const [state, setState] = useState<AuthState>(INITIAL_STATE);

  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userJson = localStorage.getItem('user');

    if (token && userJson) {
      try {
        const user: UserAuth = JSON.parse(userJson);
        setState({
          isAuthenticated: true,
          isLoading: false,
          error: null,
          user,
          accessToken: token,
          isOtpRequired: false,
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      }
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      await authService.login(credentials);

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
        isOtpRequired: true,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error during login';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

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
      const errorMessage = error instanceof Error ? error.message : 'Error during registration';
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

      // Guardar en localStorage
      localStorage.setItem('accessToken', mappedAuth.accessToken);
      localStorage.removeItem('user');

      setState({
        isAuthenticated: true,
        isLoading: false,
        error: null,
        user: null,
        accessToken: mappedAuth.accessToken,
        isOtpRequired: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid OTP';
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

    setState(INITIAL_STATE);
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    register,
    verifyOtp,
    logout,
    clearError,
  };
};
