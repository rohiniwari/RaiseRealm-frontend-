import api from './api';

export const impactService = {
  // Create new impact report
  createImpactReport: async (data) => {
    const response = await api.post('/impact', data);
    return response.data;
  },

  // Get impact reports for a project
  getProjectImpactReports: async (projectId) => {
    const response = await api.get(`/impact/project/${projectId}`);
    return response.data;
  },

  // Get single impact report
  getImpactReportById: async (id) => {
    const response = await api.get(`/impact/${id}`);
    return response.data;
  },

  // Update impact report
  updateImpactReport: async (id, data) => {
    const response = await api.put(`/impact/${id}`, data);
    return response.data;
  },

  // Delete impact report
  deleteImpactReport: async (id) => {
    const response = await api.delete(`/impact/${id}`);
    return response.data;
  },

  // Get creator impact dashboard stats
  getCreatorImpactStats: async () => {
    const response = await api.get('/impact/dashboard');
    return response.data;
  }
};
