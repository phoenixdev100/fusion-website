import axios from 'axios';

const API_URL = '/api';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  lastLogin: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export const authService = {
  // Authentication
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      return response.data;
    } catch (error: any) {
      console.error('Auth service login error:', error.response?.data || error);
      throw error;
    }
  },

  async register(username: string, email: string, password: string): Promise<RegisterResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });
      
      if (response.data.success) {
        // Store the token immediately
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Auth service registration error:', error.response?.data || error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // User Management (Admin)
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createUser(userData: { username: string; email: string; password: string; role: string }) {
    try {
      const response = await axios.post(`${API_URL}/admin/users`, userData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(userId: string, userData: { username?: string; email?: string; password?: string; role?: string }) {
    try {
      const response = await axios.put(`${API_URL}/admin/users/${userId}`, userData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(userId: string) {
    try {
      const response = await axios.delete(`${API_URL}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  }
}; 