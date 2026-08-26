-- Companies Table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  registration_number VARCHAR(50) UNIQUE NOT NULL,
  tax_number VARCHAR(50),
  country VARCHAR(100) DEFAULT 'UAE',
  city VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  logo_url TEXT,
  currency VARCHAR(3) DEFAULT 'AED',
  vat_percentage DECIMAL(5,2) DEFAULT 5.00,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID,
  updated_by UUID
);

CREATE INDEX idx_companies_registration ON companies(registration_number);
CREATE INDEX idx_companies_active ON companies(active);

-- Branches Table
CREATE TABLE IF NOT EXISTS branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  branch_code VARCHAR(50) NOT NULL,
  branch_type VARCHAR(50), -- Factory, Workshop, Office, Warehouse, etc.
  country VARCHAR(100) DEFAULT 'UAE',
  city VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  manager_id UUID,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(company_id, branch_code)
);

CREATE INDEX idx_branches_company ON branches(company_id);
CREATE INDEX idx_branches_active ON branches(active);

-- Departments Table
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  department_code VARCHAR(50) NOT NULL,
  description TEXT,
  manager_id UUID,
  parent_department_id UUID REFERENCES departments(id),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(company_id, department_code)
);

CREATE INDEX idx_departments_company ON departments(company_id);
CREATE INDEX idx_departments_parent ON departments(parent_department_id);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  profile_picture_url TEXT,
  employee_id UUID,
  department_id UUID REFERENCES departments(id),
  job_title VARCHAR(100),
  active BOOLEAN DEFAULT true,
  two_factor_enabled BOOLEAN DEFAULT false,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(active);

-- Roles Table
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '[]',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(company_id, name)
);

CREATE INDEX idx_roles_company ON roles(company_id);

-- User Roles Table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, role_id)
);

CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role_id);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  project_name VARCHAR(255) NOT NULL,
  project_name_ar VARCHAR(255) NOT NULL,
  project_code VARCHAR(50) NOT NULL,
  project_type VARCHAR(50), -- Building, Infrastructure, Industrial, etc.
  client_id UUID,
  location VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  project_manager_id UUID REFERENCES users(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  planned_duration_days INT,
  actual_start_date DATE,
  actual_end_date DATE,
  contract_value DECIMAL(15, 2) NOT NULL,
  project_status VARCHAR(50) DEFAULT 'PLANNING', -- PLANNING, ACTIVE, ON_HOLD, CLOSED, CANCELLED
  progress_percentage DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(company_id, project_code)
);

CREATE INDEX idx_projects_company ON projects(company_id);
CREATE INDEX idx_projects_branch ON projects(branch_id);
CREATE INDEX idx_projects_status ON projects(project_status);

-- Project Phases Table
CREATE TABLE IF NOT EXISTS project_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  phase_name VARCHAR(255) NOT NULL,
  phase_name_ar VARCHAR(255) NOT NULL,
  phase_order INT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  planned_cost DECIMAL(15, 2),
  phase_status VARCHAR(50) DEFAULT 'NOT_STARTED',
  progress_percentage DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_phases_project ON project_phases(project_id);

-- Activities/Tasks Table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES project_phases(id) ON DELETE SET NULL,
  activity_name VARCHAR(255) NOT NULL,
  activity_name_ar VARCHAR(255) NOT NULL,
  description TEXT,
  activity_code VARCHAR(50),
  assigned_to UUID REFERENCES users(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  planned_duration_days INT,
  actual_duration_days INT,
  planned_cost DECIMAL(15, 2),
  actual_cost DECIMAL(15, 2),
  activity_status VARCHAR(50) DEFAULT 'NOT_STARTED',
  progress_percentage DECIMAL(5, 2) DEFAULT 0,
  priority VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, CRITICAL
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activities_project ON activities(project_id);
CREATE INDEX idx_activities_phase ON activities(phase_id);
CREATE INDEX idx_activities_status ON activities(activity_status);

-- Audit Trail Table
CREATE TABLE IF NOT EXISTS audit_trail (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_company ON audit_trail(company_id);
CREATE INDEX idx_audit_user ON audit_trail(user_id);
CREATE INDEX idx_audit_created ON audit_trail(created_at);
