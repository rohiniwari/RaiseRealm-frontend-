import api from './api';

export const contributionService = {
  createContribution: async (data) => {
    const response = await api.post('/contributions', data);
    return response.data;
  },

  getUserContributions: async () => {
    // backend exposes user's contributions at /contributions/my-contributions
    const response = await api.get('/contributions/my-contributions');
    const data = response.data;
    // some endpoints may return { error: ... } on failure
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.contributions)) return data.contributions;
    // otherwise return empty array to avoid runtime errors
    return [];
  },

  getProjectContributions: async (projectId) => {
    const response = await api.get(`/contributions/project/${projectId}`);
    return response.data;
  }
};
