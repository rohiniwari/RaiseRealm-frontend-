import api from './api';

// Mock data for contributions
const mockContributions = [
  { id: 1, project_id: 2, amount: 1500, created_at: "2024-01-15T10:00:00Z", project_title: "Sustainable Urban Farming" },
  { id: 2, project_id: 3, amount: 2500, created_at: "2024-01-20T14:30:00Z", project_title: "Mental Health Companion App" },
  { id: 3, project_id: 1, amount: 1000, created_at: "2024-02-01T09:15:00Z", project_title: "AI-Powered Learning Platform" }
];

const mockProjectContributions = [
  { id: 1, user_name: "Alice Johnson", amount: 500, created_at: "2024-01-10T08:00:00Z" },
  { id: 2, user_name: "Bob Smith", amount: 1000, created_at: "2024-01-12T11:30:00Z" },
  { id: 3, user_name: "Carol Davis", amount: 750, created_at: "2024-01-15T16:45:00Z" }
];

export const contributionService = {
  createContribution: async (data) => {
    try {
      const response = await api.post('/contributions', data);
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating contribution creation');
      return { ...data, id: Date.now(), created_at: new Date().toISOString() };
    }
  },

  getUserContributions: async () => {
    try {
      const response = await api.get('/contributions/my-contributions');
      const data = response.data;
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.contributions)) return data.contributions;
      return [];
    } catch (error) {
      console.warn('API not available, using mock user contributions');
      return mockContributions;
    }
  },

  getProjectContributions: async (projectId) => {
    try {
      const response = await api.get(`/contributions/project/${projectId}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock project contributions');
      return mockProjectContributions;
    }
  }
};
