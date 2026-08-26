import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import store from './store';
import { queryClient } from './services/api';
import MainLayout from './layouts/MainLayout';
import Toaster from 'react-hot-toast';
import './i18n';

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainLayout />
          <Toaster position="top-right" />
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
