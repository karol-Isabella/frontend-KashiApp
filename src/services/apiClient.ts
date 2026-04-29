/**
 * HTTP Client
 * Encapsula la lógica de comunicación con la API
 * Maneja tokens JWT, interceptores y errores
 */

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: Record<string, unknown>;
}

interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  //constructor con opcion de baseURL para facilitar testing
  constructor(baseURL: string = 'http://localhost:8080/api/v1') {
    this.baseURL = baseURL;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private setAuthToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  private removeAuthToken(): void {
    localStorage.removeItem('accessToken');
  }

  // Construye los headers incluyendo el token de autenticación si está presente
  private buildHeaders(options?: RequestInit): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return { ...headers, ...options?.headers };
  }

  // Método genérico para realizar peticiones HTTP
  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(options as RequestInit);

    // Construir la peticion con los headers y el body (si existe)
    const config: RequestInit = {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          this.removeAuthToken();
        }
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      return {
        status: response.status,
        data,
        message: data.message,
      };
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Métodos específico para cada peticion HTTP
  async get<T>(endpoint: string, options:RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }


  async post<T>(
    endpoint: string,
    body?: Record<string, unknown>,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  async put<T>(
    endpoint: string,
    body?: Record<string, unknown>,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // Métodos para gestionar el token de autenticación JWT
  setToken(token: string): void {
    this.setAuthToken(token);
  }


  clearToken(): void {
    this.removeAuthToken();
  }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1');
