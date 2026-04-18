import api from './api';

// Mock users for development
const mockUsers = {
  'creator@test.com': {
    id: 1,
    name: 'Test Creator',
    email: 'creator@test.com',
    role: 'creator',
    token: 'mock-creator-token'
  },
  'backer@test.com': {
    id: 2,
    name: 'Test Backer',
    email: 'backer@test.com',
    role: 'backer',
    token: 'mock-backer-token'
  }
};

export const authService = {
  register: async (email, password, name, role) => {
    try {
      const response = await api.post('/auth/register', { email, password, name, role });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating registration');
      const user = {
        id: Date.now(),
        name,
        email,
        role: role || 'backer'
      };
      const token = `mock-token-${Date.now()}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { user, token };
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating login');
      const user = mockUsers[email];
      if (user && password === 'password') {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        return { user, token: user.token };
      }
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.warn('API not available, using stored user');
      return authService.getStoredUser();
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await api.put('/auth/profile', data);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating profile update');
      const currentUser = authService.getStoredUser();
      const updatedUser = { ...currentUser, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    }
  },

  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};
