import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from './Common';
 
// handle the private routes
const PrivateRoute = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />
  }
 
export default PrivateRoute;