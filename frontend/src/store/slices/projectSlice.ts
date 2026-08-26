import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  id: string;
  project_name: string;
  project_code: string;
  project_status: string;
  progress_percentage: number;
  contract_value: number;
}

interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
}

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
  loading: false
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setSelectedProject: (state, action: PayloadAction<Project>) => {
      state.selectedProject = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { setProjects, setSelectedProject, setLoading } = projectSlice.actions;
export default projectSlice.reducer;
