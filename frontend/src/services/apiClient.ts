import { ApiResponse } from '../types';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
  isMultipart?: boolean;
}

class ApiClient {
  private getHeaders(customHeaders?: HeadersInit, isMultipart = false): Headers {
    const headers = new Headers(customHeaders);
    const token = localStorage.getItem('riotsys_auth_token');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    if (!isMultipart && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    return headers;
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { params, headers, isMultipart, ...restOptions } = options as any;

    let url = `${API_BASE_URL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes('?') ? '&' : '?') + queryString;
      }
    }

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: this.getHeaders(headers, isMultipart),
      });

      const data: ApiResponse<T> = await response.json();

      if (!response.ok) {
        if (response.status === 401 && !endpoint.includes('/auth/login')) {
          localStorage.removeItem('riotsys_auth_token');
          localStorage.removeItem('riotsys_auth_user');
          if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
            window.location.href = '/admin/login';
          }
        }
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (err: any) {
      console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, err);
      throw err;
    }
  }

  get<T>(endpoint: string, params?: Record<string, any>, headers?: HeadersInit) {
    return this.request<T>(endpoint, { method: 'GET', params, headers });
  }

  post<T>(endpoint: string, body?: any, isMultipart = false) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: isMultipart ? body : JSON.stringify(body),
      isMultipart,
    });
  }

  put<T>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  patch<T>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient();
