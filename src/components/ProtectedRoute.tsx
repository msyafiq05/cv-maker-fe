import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


const getUser = (): { role?: string } | null => {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
};

export const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!token || !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Block admin from accessing user-only pages
  const user = getUser();
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export const AdminRoute: React.FC = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!token || !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const user = getUser();
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
