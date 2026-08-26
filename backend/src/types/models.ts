export interface ICompany {
  id: string;
  name: string;
  name_ar: string;
  registration_number: string;
  tax_number?: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo_url?: string;
  currency: string;
  vat_percentage: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IBranch {
  id: string;
  company_id: string;
  name: string;
  name_ar: string;
  branch_code: string;
  branch_type: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  manager_id?: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IUser {
  id: string;
  company_id: string;
  username: string;
  email: string;
  email_verified: boolean;
  first_name: string;
  last_name: string;
  phone?: string;
  profile_picture_url?: string;
  employee_id?: string;
  department_id?: string;
  job_title?: string;
  active: boolean;
  two_factor_enabled: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface IProject {
  id: string;
  company_id: string;
  branch_id: string;
  project_name: string;
  project_name_ar: string;
  project_code: string;
  project_type: string;
  client_id?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  project_manager_id?: string;
  start_date: Date;
  end_date: Date;
  planned_duration_days: number;
  actual_start_date?: Date;
  actual_end_date?: Date;
  contract_value: number;
  project_status: string;
  progress_percentage: number;
  created_at: Date;
  updated_at: Date;
}

export interface IActivity {
  id: string;
  project_id: string;
  phase_id?: string;
  activity_name: string;
  activity_name_ar: string;
  description?: string;
  activity_code?: string;
  assigned_to?: string;
  start_date: Date;
  end_date: Date;
  planned_duration_days: number;
  actual_duration_days?: number;
  planned_cost?: number;
  actual_cost?: number;
  activity_status: string;
  progress_percentage: number;
  priority: string;
  created_at: Date;
  updated_at: Date;
}
