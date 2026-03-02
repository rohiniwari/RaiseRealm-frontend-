// AI-powered project suggestions service
// This service provides intelligent suggestions based on project data

export const aiSuggestionService = {
  // Get suggestions for a specific project
  getProjectSuggestions: async (project) => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const suggestions = [];
    const { current_amount, goal_amount, backers_count, milestones } = project;
    
    // Funding progress analysis
    const progress = (current_amount / goal_amount) * 100;
    
    if (progress < 25) {
      suggestions.push({
        type: 'funding',
        priority: 'high',
        title: 'Boost Initial Funding',
        description: 'Your project is in the early stages. Consider sharing on social media more frequently and reaching out to your personal network.',
        action: 'Share Now'
      });
    } else if (progress < 50) {
      suggestions.push({
        type: 'funding',
        priority: 'medium',
        title: 'Mid-Campaign Push',
        description: 'Time to create buzz! Update your project page with new content and engage with your backers.',
        action: 'Update Project'
      });
    } else if (progress < 75) {
      suggestions.push({
        type: 'funding',
        priority: 'low',
        title: 'Almost There!',
        description: 'You\'re making great progress. Keep the momentum going with milestone updates.',
        action: 'Post Update'
      });
    } else {
      suggestions.push({
        type: 'funding',
        priority: 'low',
        title: 'Final Push',
        description: 'Almost at your goal! Encourage final backers and share your success story.',
        action: 'Share Project'
      });
    }

    // Backer engagement suggestions
    if (!backers_count || backers_count < 10) {
      suggestions.push({
        type: 'engagement',
        priority: 'high',
        title: 'Build Your Backer Community',
        description: 'Low backer count. Try offering early-bird rewards or exclusive perks to attract more supporters.',
        action: 'Add Reward'
      });
    }

    // Milestone suggestions
    if (!milestones || milestones.length === 0) {
      suggestions.push({
        type: 'milestone',
        priority: 'high',
        title: 'Add Milestones',
        description: 'Milestones help build trust with backers. Add clear deliverables and timelines.',
        action: 'Add Milestone'
      });
    } else if (milestones.length < 3) {
      suggestions.push({
        type: 'milestone',
        priority: 'medium',
        title: 'Expand Your Milestones',
        description: 'Consider breaking down your project into more detailed milestones for better transparency.',
        action: 'View Milestones'
      });
    }

    // Content suggestions
    const daysLeft = Math.ceil((new Date(project.end_date) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysLeft > 0 && daysLeft < 7) {
      suggestions.push({
        type: 'urgency',
        priority: 'high',
        title: 'Last Days Campaign',
        description: 'Your campaign ends soon! Send a final update to remind potential backers.',
        action: 'Send Update'
      });
    }

    return suggestions;
  },

  // Get general dashboard suggestions
  getDashboardSuggestions: async (userProjects) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const suggestions = [];
    const activeProjects = userProjects.filter(p => p.status === 'active');
    const fundedProjects = userProjects.filter(p => p.status === 'funded');
    
    if (activeProjects.length === 0 && fundedProjects.length === 0) {
      suggestions.push({
        type: 'start',
        priority: 'high',
        title: 'Start Your First Project',
        description: 'You haven\'t created any projects yet. Launch your idea and bring it to life with community support!',
        action: 'Create Project',
        link: '/create-project'
      });
    } else if (activeProjects.length > 0) {
      suggestions.push({
        type: 'optimize',
        priority: 'medium',
        title: 'Optimize Active Projects',
        description: `You have ${activeProjects.length} active project${activeProjects.length > 1 ? 's' : ''}. Check for AI suggestions to improve your chances.`,
        action: 'View Projects',
        link: '/dashboard'
      });
    }

    if (fundedProjects.length > 0) {
      suggestions.push({
        type: 'success',
        priority: 'low',
        title: 'Celebrate Your Success!',
        description: `Congratulations! You\'ve successfully funded ${fundedProjects.length} project${fundedProjects.length > 1 ? 's' : ''}. Share your success story!`,
        action: 'Share Story'
      });
    }

    return suggestions;
  },

  // Get content improvement suggestions
  getContentSuggestions: async (project) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const suggestions = [];
    
    // Title analysis
    if (project.title && project.title.length < 20) {
      suggestions.push({
        type: 'content',
        priority: 'medium',
        title: 'Enhance Your Title',
        description: 'A more descriptive title can attract more backers. Consider adding key details about your project.',
      });
    }

    // Description analysis
    if (project.description && project.description.length < 100) {
      suggestions.push({
        type: 'content',
        priority: 'high',
        title: 'Expand Your Description',
        description: 'A detailed description helps backers understand your project better. Add more information about your goals and vision.',
      });
    }

    // Image suggestions
    if (!project.image_url) {
      suggestions.push({
        type: 'media',
        priority: 'high',
        title: 'Add Project Image',
        description: 'Projects with images receive more attention. Upload a compelling cover image.',
        action: 'Add Image'
      });
    }

    // Video suggestions
    if (!project.video_url) {
      suggestions.push({
        type: 'media',
        priority: 'medium',
        title: 'Add a Video',
        description: 'Projects with videos are 50% more likely to be funded. Consider adding a pitch video.',
        action: 'Add Video'
      });
    }

    return suggestions;
  }
};

export default aiSuggestionService;
