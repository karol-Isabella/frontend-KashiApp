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

  //constructor con la variable de entorno para la URL base de la API
  constructor(baseURL: string) {
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

        const errorText = await response.text();
        let errorMessage = `Error HTTP: ${response.status}`;

        try {
          const errorData = errorText ? JSON.parse(errorText) : null;
          if (errorData && typeof errorData.message === 'string') {
            errorMessage = errorData.message;
          }
        } catch {
          // Ignorar errores de parseo de JSON y usar el mensaje genérico
        }

        throw new Error(errorMessage);
      }

      let data: T;
      try {
        data = await response.json();
      } catch {
        data = {} as T;
      }

      return {
        status: response.status,
        data,
        message: (data as any)?.message,
      };
    } catch (error) {
      console.error('API Request Error:', error);

      if (error instanceof TypeError) {
        throw new Error('No se pudo conectar con el servidor. Verifica tu conexión y vuelve a intentarlo.');
      }

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

export const apiClient = new ApiClient(import.meta.env.VITE_API_URL);
