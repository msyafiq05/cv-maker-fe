import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * A route wrapper that checks if the user is authenticated.
 * If not authenticated, redirects to /login and preserves the
 * intended destination so we can redirect back after login.
 */
const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!token || !isLoggedIn) {
    // Pass the current location in state so the login page
    // can redirect back after successful authentication
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
