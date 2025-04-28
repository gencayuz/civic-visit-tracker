
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  allowDirectorate?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requireAdmin = false,
  allowDirectorate = true
}) => {
  const { isAuthenticated, isLoading, isAdmin, isDirectorate } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if admin access is required
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Check if this is a directorate user trying to access a non-directorate page
  if (isDirectorate() && !allowDirectorate && location.pathname !== '/directorates') {
    return <Navigate to="/directorates" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
