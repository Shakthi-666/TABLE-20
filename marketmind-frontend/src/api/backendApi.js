// API service for backend calls
// This file will contain Axios/Fetch configurations for MongoDB integration

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Example API functions (to be implemented when backend is ready)
export const api = {
  // Auth
  login: (credentials) => fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }),
  
  // Dashboard data
  getDashboardData: () => fetch(`${API_BASE_URL}/dashboard`),
  
  // Competitors
  getCompetitors: () => fetch(`${API_BASE_URL}/competitors`),
  
  // Opportunities
  getOpportunities: () => fetch(`${API_BASE_URL}/opportunities`),
  
  // Reports
  getReports: () => fetch(`${API_BASE_URL}/reports`),
  
  // Profile
  updateProfile: (data) => fetch(`${API_BASE_URL}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
};

export default api;