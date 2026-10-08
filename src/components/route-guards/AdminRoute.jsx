import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthStore } from '../../stores/authStore';
import { ROUTES } from '../../constants';

const AdminRoute = ({ redirectTo = ROUTES.HOME }) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  return isAuthenticated && user?.role === 'admin' ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

AdminRoute.propTypes = {
  redirectTo: PropTypes.string,
};

export default AdminRoute;