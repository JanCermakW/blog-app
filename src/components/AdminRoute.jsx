import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const role = localStorage.getItem('role'); // Get the user's role

    if (role !== 'Administrator') {
        return <Navigate to="/" replace />; // Redirect unauthorized users to home
    }

    return children; // Render the child component (Dashboard)
};

export default AdminRoute;

