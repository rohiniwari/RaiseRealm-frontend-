import api from './api';

export const contributionService = {
  createContribution: async (data) => {
    const response = await api.post('/contributions', data);
    return response.data;
  },

  getUserContributions: async () => {
    const response = await api.get('/contributions/user');
    return response.data;
  },

  getProjectContributions: async (projectId) => {
    const response = await api.get(`/contributions/project/${projectId}`);
    return response.data;
  }
};
