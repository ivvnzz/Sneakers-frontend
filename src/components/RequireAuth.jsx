import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import AuthService from '../services/AuthService';

function RequireAuth({ children, allowedRoles }) {
  const token = AuthService.getAuthToken();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (allowedRoles && allowedRoles.length > 0) {
    const user = AuthService.getCurrentUser();
    const userRole = user?.rol || user?.role || (user && user.username ? (user.rol || user.role) : null);
    if (!userRole || !allowedRoles.map(r => r.toLowerCase()).includes(userRole.toLowerCase())) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
  return children;
}

export default RequireAuth;
