import api from './api';

// Mock data for comments
const mockComments = [
  {
    id: 1,
    project_id: 1,
    user_name: "Alice Johnson",
    content: "This is exactly what the education sector needs! The AI personalization sounds incredible.",
    created_at: "2024-01-15T10:30:00Z",
    user_id: 101
  },
  {
    id: 2,
    project_id: 1,
    user_name: "Bob Smith",
    content: "How will you ensure data privacy for students? This is crucial for educational tools.",
    created_at: "2024-01-16T14:20:00Z",
    user_id: 102
  },
  {
    id: 3,
    project_id: 1,
    user_name: "Creator Reply",
    content: "Great question! We use end-to-end encryption and comply with FERPA regulations. All data is anonymized for AI training.",
    created_at: "2024-01-17T09:15:00Z",
    user_id: 1
  }
];

export const commentService = {
  createComment: async (data) => {
    try {
      const response = await api.post('/comments', data);
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating comment creation');
      return {
        ...data,
        id: Date.now(),
        created_at: new Date().toISOString(),
        user_name: "Test User"
      };
    }
  },

  getProjectComments: async (projectId) => {
    try {
      const response = await api.get(`/comments/project/${projectId}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock comments');
      return mockComments.filter(c => c.project_id === parseInt(projectId));
    }
  },

  deleteComment: async (commentId) => {
    try {
      const response = await api.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating comment deletion');
      return { success: true };
    }
  }
};
