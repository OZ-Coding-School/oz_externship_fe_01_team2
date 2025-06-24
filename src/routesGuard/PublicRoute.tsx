import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = !!localStorage.getItem('token');

type Props = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: Props) => {
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
