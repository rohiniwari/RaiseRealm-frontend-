import api from './api';

// Mock data for impact reports
const mockImpactReports = [
  {
    id: 1,
    project_id: 1,
    title: "Q1 Progress Update",
    description: "We've successfully completed the MVP development phase and are now entering beta testing. The AI tutoring system has shown promising results with 85% student engagement improvement.",
    created_at: "2024-01-15T10:00:00Z",
    media: [],
    milestones_achieved: ["MVP Development"],
    funds_used: 15000,
    impact_metrics: {
      students_reached: 500,
      engagement_rate: 85,
      satisfaction_score: 4.7
    }
  },
  {
    id: 2,
    project_id: 2,
    title: "Vertical Farm Prototype Complete",
    description: "Our first vertical farming unit is operational and producing 200kg of vegetables weekly. Local restaurants are already interested in our sustainable produce.",
    created_at: "2024-02-01T14:00:00Z",
    media: [],
    milestones_achieved: ["Prototype Build"],
    funds_used: 30000,
    impact_metrics: {
      produce_yield: 200,
      co2_reduction: 1500,
      restaurants_partnered: 5
    }
  }
];

const mockImpactStats = {
  totalProjects: 3,
  totalImpactReports: 5,
  totalFundsUsed: 125000,
  totalBeneficiaries: 2500,
  averageSatisfaction: 4.6
};

export const impactService = {
  // Create new impact report
  createImpactReport: async (data) => {
    try {
      const response = await api.post('/impact', data);
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating impact report creation');
      return { ...data, id: Date.now(), created_at: new Date().toISOString() };
    }
  },

  // Get impact reports for a project
  getProjectImpactReports: async (projectId) => {
    try {
      const response = await api.get(`/impact/project/${projectId}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock impact reports');
      return mockImpactReports.filter(r => r.project_id === parseInt(projectId));
    }
  },

  // Get single impact report
  getImpactReportById: async (id) => {
    try {
      const response = await api.get(`/impact/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock impact report');
      return mockImpactReports.find(r => r.id === parseInt(id)) || mockImpactReports[0];
    }
  },

  // Update impact report
  updateImpactReport: async (id, data) => {
    try {
      const response = await api.put(`/impact/${id}`, data);
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating impact report update');
      return { ...data, id: parseInt(id) };
    }
  },

  // Delete impact report
  deleteImpactReport: async (id) => {
    try {
      const response = await api.delete(`/impact/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating impact report deletion');
      return { success: true };
    }
  },

  // Get creator impact dashboard stats
  getCreatorImpactStats: async () => {
    try {
      const response = await api.get('/impact/dashboard');
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock impact stats');
      return mockImpactStats;
    }
  }
};
