/**
 * Global Types
 * Tipos compartidos entre módulos
 */

/**
 * API Response Wrapper
 * Estructura estándar para respuestas del backend
 */
export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/**
 * Paginated Response
 * Para listados paginados
 */
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Filter & Sort Options
 * Parámetros comunes para búsqueda
 */
export interface FilterOptions {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

/**
 * Async State
 * Estado genérico para operaciones asincrónicas
 */
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * ID Types
 * Para mayor tipo-seguridad con IDs
 */
export type UserId = string & { readonly __brand: 'UserId' };
export type TransactionId = string & { readonly __brand: 'TransactionId' };
export type ContactId = string & { readonly __brand: 'ContactId' };

export const createUserId = (id: string): UserId => id as UserId;
export const createTransactionId = (id: string): TransactionId => id as TransactionId;
export const createContactId = (id: string): ContactId => id as ContactId;

/**
 * Date Utility
 * Manejo de fechas consistente
 */
export type ISOString = string & { readonly __brand: 'ISOString' };

export const toISOString = (date: Date): ISOString => date.toISOString() as ISOString;
export const fromISOString = (iso: ISOString): Date => new Date(iso);
