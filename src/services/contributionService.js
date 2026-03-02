import api from './api';

export const contributionService = {
  createContribution: async (data) => {
    const response = await api.post('/contributions', data);
    return response.data;
  },

  getUserContributions: async () => {
    // backend exposes user's contributions at /contributions/my-contributions
    const response = await api.get('/contributions/my-contributions');
    return response.data;
  },

  getProjectContributions: async (projectId) => {
    const response = await api.get(`/contributions/project/${projectId}`);
    return response.data;
  }
};
