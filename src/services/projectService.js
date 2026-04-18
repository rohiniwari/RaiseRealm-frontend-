import api from './api';

// Mock data for development when API is not available
const mockProjects = [
  {
    id: 1,
    title: "AI-Powered Learning Platform",
    description: "Revolutionizing education with personalized AI tutors for students worldwide. Our platform adapts to each student's learning style and pace.",
    category: "technology",
    goal_amount: 50000,
    current_amount: 32500,
    end_date: "2024-12-31",
    creator_name: "Dr. Sarah Chen",
    creator_id: 1,
    is_active: true,
    image_url: "/api/placeholder/400/300",
    milestones: [
      { id: 1, title: "MVP Development", description: "Complete core AI tutoring system", amount_required: 15000, target_date: "2024-06-01", completed: true },
      { id: 2, title: "Beta Testing", description: "Test with 1000 students", amount_required: 25000, target_date: "2024-09-01", completed: false },
      { id: 3, title: "Full Launch", description: "Global platform launch", amount_required: 50000, target_date: "2024-12-01", completed: false }
    ],
    rewards: [
      { id: 1, title: "Early Access", description: "1 year free premium access", min_amount: 1000 },
      { id: 2, title: "VIP Support", description: "Priority customer support", min_amount: 2500 },
      { id: 3, title: "Co-founder Status", description: "Your name in credits", min_amount: 10000 }
    ]
  },
  {
    id: 2,
    title: "Sustainable Urban Farming",
    description: "Vertical farming solution for cities. Growing fresh produce locally reduces transportation emissions by 90%.",
    category: "environment",
    goal_amount: 75000,
    current_amount: 52000,
    end_date: "2024-11-15",
    creator_name: "Mike Rodriguez",
    creator_id: 2,
    is_active: true,
    image_url: "/api/placeholder/400/300",
    milestones: [
      { id: 4, title: "Prototype Build", description: "Construct first vertical farm unit", amount_required: 30000, target_date: "2024-07-01", completed: true },
      { id: 5, title: "Field Testing", description: "6-month urban farm test", amount_required: 50000, target_date: "2024-10-01", completed: false }
    ],
    rewards: [
      { id: 4, title: "Fresh Produce Box", description: "Monthly organic produce delivery", min_amount: 500 },
      { id: 5, title: "Farm Tour", description: "Private tour of our facilities", min_amount: 1500 }
    ]
  },
  {
    id: 3,
    title: "Mental Health Companion App",
    description: "AI-powered mental health support app with 24/7 crisis intervention and personalized therapy recommendations.",
    category: "health",
    goal_amount: 100000,
    current_amount: 78000,
    end_date: "2024-10-30",
    creator_name: "Dr. Emily Watson",
    creator_id: 3,
    is_active: true,
    image_url: "/api/placeholder/400/300",
    milestones: [
      { id: 6, title: "Core App Development", description: "Build main app features", amount_required: 40000, target_date: "2024-08-01", completed: true },
      { id: 7, title: "Clinical Trials", description: "Partner with mental health clinics", amount_required: 75000, target_date: "2024-11-01", completed: false }
    ],
    rewards: [
      { id: 6, title: "Lifetime Access", description: "Free app access forever", min_amount: 2000 },
      { id: 7, title: "Therapy Session", description: "One free therapy session", min_amount: 5000 }
    ]
  }
];

const mockUser = {
  id: 1,
  name: "Test Creator",
  email: "creator@test.com",
  role: "creator"
};

const mockBackedProjects = [
  {
    id: 2,
    title: "Sustainable Urban Farming",
    description: "Vertical farming solution for cities...",
    current_amount: 52000,
    goal_amount: 75000,
    end_date: "2024-11-15",
    creator_name: "Mike Rodriguez"
  }
];

const mockContributions = [
  { id: 1, project_id: 2, amount: 1500, created_at: "2024-01-15" },
  { id: 2, project_id: 3, amount: 2500, created_at: "2024-01-20" }
];

export const projectService = {
  // Get all projects with filters
  getProjects: async (params = {}) => {
    try {
      const response = await api.get('/projects', { params });
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data for projects');
      // Filter mock data based on params
      let filteredProjects = [...mockProjects];
      if (params.category && params.category !== 'all') {
        filteredProjects = filteredProjects.filter(p => p.category === params.category);
      }
      if (params.search) {
        filteredProjects = filteredProjects.filter(p =>
          p.title.toLowerCase().includes(params.search.toLowerCase()) ||
          p.description.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      if (params.sort === 'popular') {
        filteredProjects.sort((a, b) => (b.current_amount / b.goal_amount) - (a.current_amount / a.goal_amount));
      } else if (params.sort === 'ending') {
        filteredProjects.sort((a, b) => new Date(a.end_date) - new Date(b.end_date));
      }
      if (params.limit) {
        filteredProjects = filteredProjects.slice(0, params.limit);
      }
      return filteredProjects;
    }
  },

  // Get single project by ID
  getProjectById: async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data for project');
      return mockProjects.find(p => p.id === parseInt(id)) || mockProjects[0];
    }
  },

  // Create new project
  createProject: async (projectData) => {
    try {
      const response = await api.post('/projects', projectData);
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating project creation');
      return { ...projectData, id: Date.now(), creator_id: mockUser.id };
    }
  },

  // Update project
  updateProject: async (id, projectData) => {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating project update');
      return { ...projectData, id: parseInt(id) };
    }
  },

  // Delete project
  deleteProject: async (id) => {
    try {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating project deletion');
      return { success: true };
    }
  },

  // Get user's projects
  getUserProjects: async () => {
    try {
      const response = await api.get('/projects/my-projects');
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock user projects');
      return mockProjects.filter(p => p.creator_id === mockUser.id);
    }
  },

  // Get projects user has backed
  getBackedProjects: async () => {
    try {
      const response = await api.get('/projects/backed');
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock backed projects');
      return mockBackedProjects;
    }
  },

  // Make a contribution
  createContribution: async (contributionData) => {
    try {
      const response = await api.post('/contributions', contributionData);
      return response.data;
    } catch (error) {
      console.warn('API not available, simulating contribution');
      return { ...contributionData, id: Date.now(), created_at: new Date().toISOString() };
    }
  },

  // Get project updates
  getProjectUpdates: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}/updates`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock project updates');
      return [
        {
          id: 1,
          project_id: parseInt(projectId),
          title: "Development Progress Update",
          description: "We've made significant progress on the core features. The team has been working hard to implement the latest requirements.",
          created_at: "2024-01-15T10:00:00Z",
          media: []
        },
        {
          id: 2,
          project_id: parseInt(projectId),
          title: "Community Feedback Incorporated",
          description: "Based on backer feedback, we've added new features and improved the user experience.",
          created_at: "2024-02-01T14:00:00Z",
          media: []
        }
      ];
    }
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
    try {
      const response = await api.get(`/rewards/project/${projectId}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock project rewards');
      const project = mockProjects.find(p => p.id === parseInt(projectId));
      return project ? project.rewards : [];
    }
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
