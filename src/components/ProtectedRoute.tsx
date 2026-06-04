import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * Helper to get user object from localStorage.
 */
const getUser = (): { role?: string } | null => {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
};

/**
 * ProtectedRoute — requires login, blocks admin users.
 * Admin users are redirected to /admin/dashboard instead.
 * Regular users who are not logged in are redirected to /login.
 */
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

/**
 * AdminRoute — requires login AND admin role.
 * Non-admin users are redirected to home page.
 * Unauthenticated users are redirected to /login.
 */
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
