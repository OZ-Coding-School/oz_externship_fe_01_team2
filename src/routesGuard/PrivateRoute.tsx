import React from 'react';
import { Navigate } from 'react-router-dom';

// 예시용 로그인 여부 (실제 로직으로 대체하세요)
const isAuthenticated = !!localStorage.getItem('token');

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
