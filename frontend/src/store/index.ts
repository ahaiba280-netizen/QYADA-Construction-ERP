import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import companyReducer from './slices/companySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    companies: companyReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
