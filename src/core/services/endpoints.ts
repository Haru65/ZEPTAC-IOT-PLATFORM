import ApiService from './ApiService';
import type { AxiosRequestConfig, AxiosResponse } from "axios";

// Note: Authentication removed for development

// User Management APIs
export const UserAPI = {
  getAll: (params?: any): Promise<AxiosResponse> => 
    ApiService.query('/users', { params }),
  getOne: (id: number): Promise<AxiosResponse> => 
    ApiService.get('/users', id.toString()),
  create: (data: any): Promise<AxiosResponse> => 
    ApiService.post('/users', data),
  update: (id: number, data: any): Promise<AxiosResponse> => 
    ApiService.update('/users', id.toString(), data),
  delete: (id: number): Promise<AxiosResponse> => 
    ApiService.delete(`/users/${id}`),
  search: (params: any): Promise<AxiosResponse> => 
    ApiService.post('/user_search', params),
};

// Employee Management APIs
export const EmployeeAPI = {
  getAll: (params?: any): Promise<AxiosResponse> => 
    ApiService.query('/employee', { params }),
  getOne: (id: number): Promise<AxiosResponse> => 
    ApiService.get('/employee', id.toString()),
  create: (data: any): Promise<AxiosResponse> => 
    ApiService.post('/employee', data),
  update: (id: number, data: any): Promise<AxiosResponse> => 
    ApiService.update('/employee', id.toString(), data),
  delete: (id: number): Promise<AxiosResponse> => 
    ApiService.delete(`/employee/${id}`),
  search: (params: any): Promise<AxiosResponse> => 
    ApiService.post('/employee_search', params),
  export: (params: any): Promise<AxiosResponse> => 
    ApiService.post('/export_employees', params),
};

// Role & Permission Management APIs
export const RoleAPI = {
  getAll: (params?: any): Promise<AxiosResponse> => 
    ApiService.query('/roles', { params }),
  getOne: (id: number): Promise<AxiosResponse> => 
    ApiService.get('/roles', id.toString()),
  create: (data: any): Promise<AxiosResponse> => 
    ApiService.post('/roles', data),
  update: (id: number, data: any): Promise<AxiosResponse> => 
    ApiService.update('/roles', id.toString(), data),
  delete: (id: number): Promise<AxiosResponse> => 
    ApiService.delete(`/roles/${id}`),
};

export const PermissionAPI = {
  getAll: (params?: any): Promise<AxiosResponse> => 
    ApiService.query('/permission_manager', { params }),
  getOne: (id: number): Promise<AxiosResponse> => 
    ApiService.get('/permission_manager', id.toString()),
  create: (data: any): Promise<AxiosResponse> => 
    ApiService.post('/permission_manager', data),
  update: (id: number, data: any): Promise<AxiosResponse> => 
    ApiService.update('/permission_manager', id.toString(), data),
  delete: (id: number): Promise<AxiosResponse> => 
    ApiService.delete(`/permission_manager/${id}`),
  search: (params: any): Promise<AxiosResponse> => 
    ApiService.post('/permissions_search', params),
  updateSettings: (data: any): Promise<AxiosResponse> => 
    ApiService.post('/update_permission', data),
};

// Company Management APIs
export const CompanyAPI = {
  getAll: (params?: any): Promise<AxiosResponse> => 
    ApiService.query('/company', { params }),
  getOne: (id: number): Promise<AxiosResponse> => 
    ApiService.get('/company', id.toString()),
  create: (data: any): Promise<AxiosResponse> => 
    ApiService.post('/company', data),
  update: (id: number, data: any): Promise<AxiosResponse> => 
    ApiService.update('/company', id.toString(), data),
  delete: (id: number): Promise<AxiosResponse> => 
    ApiService.delete(`/company/${id}`),
  search: (params: any): Promise<AxiosResponse> => 
    ApiService.post('/company_search', params),
  getLogo: (id: number): Promise<AxiosResponse> => 
    ApiService.post('/get_company_logo', { id }),
};

// Training Management APIs
export const TrainingAPI = {
  getAll: (params?: any): Promise<AxiosResponse> => 
    ApiService.query('/training', { params }),
  getOne: (id: number): Promise<AxiosResponse> => 
    ApiService.get('/training', id.toString()),
  create: (data: any): Promise<AxiosResponse> => 
    ApiService.post('/training', data),
  update: (id: number, data: any): Promise<AxiosResponse> => 
    ApiService.update('/training', id.toString(), data),
  delete: (id: number): Promise<AxiosResponse> => 
    ApiService.delete(`/training/${id}`),
  search: (params: any): Promise<AxiosResponse> => 
    ApiService.post('/training_search', params),
  updateStatus: (data: any): Promise<AxiosResponse> => 
    ApiService.post('/training_status', data),
};

// Skill Matrix APIs
export const SkillMatrixAPI = {
  getAll: (params?: any): Promise<AxiosResponse> => 
    ApiService.query('/skill_matrix', { params }),
  getOne: (id: number): Promise<AxiosResponse> => 
    ApiService.get('/skill_matrix', id.toString()),
  create: (data: any): Promise<AxiosResponse> => 
    ApiService.post('/skill_matrix', data),
  update: (id: number, data: any): Promise<AxiosResponse> => 
    ApiService.update('/skill_matrix', id.toString(), data),
  delete: (id: number): Promise<AxiosResponse> => 
    ApiService.delete(`/skill_matrix/${id}`),
  search: (params: any): Promise<AxiosResponse> => 
    ApiService.post('/skill_matrix_search', params),
  updateStatus: (data: any): Promise<AxiosResponse> => 
    ApiService.post('/skill_matrix_status', data),
};

// File Management APIs
export const FileAPI = {
  uploadImage: (file: File, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('image', file);
    ApiService.imgsetHeader(); // Set multipart/form-data header
    return ApiService.post('/upload_image', formData, config);
  },
  removeImage: (fileId: string): Promise<AxiosResponse> => 
    ApiService.post('/remove_image', { fileId }),
};

// Notification APIs
export const NotificationAPI = {
  getAll: (params?: any): Promise<AxiosResponse> => 
    ApiService.query('/notifications', { params }),
  getLatest: (): Promise<AxiosResponse> => 
    ApiService.get('/notifications/latest', ''),
  markAsRead: (id: number): Promise<AxiosResponse> => 
    ApiService.post(`/notifications/${id}/read`, {}),
  search: (params: any): Promise<AxiosResponse> => 
    ApiService.post('/notification_search', params),
};

// Activity Logger APIs
export const ActivityLoggerAPI = {
  getAll: (params?: any): Promise<AxiosResponse> => 
    ApiService.query('/activity_logger', { params }),
  getOne: (id: number): Promise<AxiosResponse> => 
    ApiService.get('/activity_logger', id.toString()),
  create: (data: any): Promise<AxiosResponse> => 
    ApiService.post('/activity_logger', data),
  update: (id: number, data: any): Promise<AxiosResponse> => 
    ApiService.update('/activity_logger', id.toString(), data),
  delete: (id: number): Promise<AxiosResponse> => 
    ApiService.delete(`/activity_logger/${id}`),
  search: (params: any): Promise<AxiosResponse> => 
    ApiService.post('/logger_search', params),
};
