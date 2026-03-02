import api from './api';

export const projectService = {
  // Get all projects with filters
  getProjects: async (params = {}) => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  // Get single project by ID
  getProjectById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Create new project
  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Update project
  updateProject: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  // Delete project
  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  // Get user's projects
  getUserProjects: async () => {
    const response = await api.get('/projects/my-projects');
    return response.data;
  },

  // Get projects user has backed
  getBackedProjects: async () => {
    const response = await api.get('/projects/backed');
    return response.data;
  },

  // Make a contribution
  createContribution: async (contributionData) => {
    const response = await api.post('/contributions', contributionData);
    return response.data;
  },

  // Get user's contributions
  getUserContributions: async () => {
    const response = await api.get('/contributions/my-contributions');
    return response.data;
  },

  // Get project contributions (for owner)
  getProjectContributions: async (projectId) => {
    const response = await api.get(`/contributions/project/${projectId}`);
    return response.data;
  },

  // Get project milestones
  getProjectMilestones: async (projectId) => {
    const response = await api.get(`/milestones/project/${projectId}`);
    return response.data;
  },

  // Create milestone
  createMilestone: async (milestoneData) => {
    const response = await api.post('/milestones', milestoneData);
    return response.data;
  },

  // Update milestone
  updateMilestone: async (id, milestoneData) => {
    const response = await api.put(`/milestones/${id}`, milestoneData);
    return response.data;
  },

  // Complete milestone
  completeMilestone: async (id, data) => {
    const response = await api.post(`/milestones/${id}/complete`, data);
    return response.data;
  },

  // Delete milestone
  deleteMilestone: async (id) => {
    const response = await api.delete(`/milestones/${id}`);
    return response.data;
  },

  // Get project rewards
  getProjectRewards: async (projectId) => {
    const response = await api.get(`/rewards/project/${projectId}`);
    return response.data;
  },

  // Create reward
  createReward: async (rewardData) => {
    const response = await api.post('/rewards', rewardData);
    return response.data;
  },

  // Update reward
  updateReward: async (id, rewardData) => {
    const response = await api.put(`/rewards/${id}`, rewardData);
    return response.data;
  },

  // Delete reward
  deleteReward: async (id) => {
    const response = await api.delete(`/rewards/${id}`);
    return response.data;
  },

  // Get project comments
  getProjectComments: async (projectId, params = {}) => {
    const response = await api.get(`/comments/project/${projectId}`, { params });
    return response.data;
  },

  // Create comment
  createComment: async (commentData) => {
    const response = await api.post('/comments', commentData);
    return response.data;
  },

  // Delete comment
  deleteComment: async (id) => {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  },
};
