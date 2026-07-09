const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.gwa.gm/v1';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiError {
  status: number;
  message: string;
  code?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error: ApiError = {
        status: response.status,
        message: json.error || json.message || 'Something went wrong',
        code: json.code,
      };
      throw error;
    }

    return (json.data || json) as T;
  }

  get<T>(endpoint: string) {
    return this.request<T>('GET', endpoint);
  }

  post<T>(endpoint: string, body?: unknown) {
    return this.request<T>('POST', endpoint, body);
  }

  put<T>(endpoint: string, body?: unknown) {
    return this.request<T>('PUT', endpoint, body);
  }

  patch<T>(endpoint: string, body?: unknown) {
    return this.request<T>('PATCH', endpoint, body);
  }

  delete<T>(endpoint: string) {
    return this.request<T>('DELETE', endpoint);
  }
}

export const api = new ApiClient();
export type { ApiError };
