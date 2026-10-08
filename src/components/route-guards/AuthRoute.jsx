import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthStore } from '../../stores/authStore';
import { ROUTES } from '../../constants';

const AuthRoute = ({ redirectTo = ROUTES.LOGIN }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

AuthRoute.propTypes = {
  redirectTo: PropTypes.string,
};

export default AuthRoute;