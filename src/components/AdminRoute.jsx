import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const role = localStorage.getItem('role');

    if (role !== 'Administrator') {
        return <Navigate to="/" replace />;
    }

    return children; //vyrenderuju child komponentu
};

export default AdminRoute;

