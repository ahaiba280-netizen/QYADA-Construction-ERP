import apiClient from './api';

export const authService = {
  login: (email: string, password: string, companyId: string) =>
    apiClient.post('/auth/login', { email, password, companyId }),

  register: (data: any) =>
    apiClient.post('/auth/register', data),

  refreshToken: (token: string) =>
    apiClient.post('/auth/refresh-token', { refreshToken: token })
};

export const companyService = {
  getCompanies: () =>
    apiClient.get('/companies'),

  getCompanyById: (id: string) =>
    apiClient.get(`/companies/${id}`),

  createCompany: (data: any) =>
    apiClient.post('/companies', data),

  updateCompany: (id: string, data: any) =>
    apiClient.put(`/companies/${id}`, data)
};

export const projectService = {
  getProjects: () =>
    apiClient.get('/projects'),

  getProjectById: (id: string) =>
    apiClient.get(`/projects/${id}`),

  createProject: (data: any) =>
    apiClient.post('/projects', data),

  updateProject: (id: string, data: any) =>
    apiClient.put(`/projects/${id}`, data),

  getProjectDashboard: (id: string) =>
    apiClient.get(`/projects/${id}/dashboard`)
};

export const dashboardService = {
  getExecutiveDashboard: () =>
    apiClient.get('/dashboard/executive'),

  getProjectManagerDashboard: () =>
    apiClient.get('/dashboard/project-manager'),

  getSiteEngineerDashboard: () =>
    apiClient.get('/dashboard/site-engineer')
};

export const financeService = {
  getFinancialDashboard: () =>
    apiClient.get('/finance/dashboard'),

  getInvoices: () =>
    apiClient.get('/finance/invoices'),

  getPayments: () =>
    apiClient.get('/finance/payments')
};
