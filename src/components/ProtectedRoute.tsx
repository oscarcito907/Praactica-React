import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authStorage } from '../shared/authStorage';

export const ProtectedRoute: React.FC = () => {
  const isAuthenticated = !!authStorage.getToken();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};