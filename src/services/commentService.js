import api from './api';

export const commentService = {
  createComment: async (data) => {
    const response = await api.post('/comments', data);
    return response.data;
  },

  getProjectComments: async (projectId) => {
    const response = await api.get(`/comments/project/${projectId}`);
    return response.data;
  },

  deleteComment: async (commentId) => {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  }
};
