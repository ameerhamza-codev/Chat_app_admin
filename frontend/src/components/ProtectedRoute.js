import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists in localStorage
    console.log("Is Authenticated:", isAuthenticated);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

};

export default ProtectedRoute;
