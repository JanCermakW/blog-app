import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "./DataTable";

const Dashboard = () => {
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedRole = localStorage.getItem('role');
        if (!savedRole) {
            navigate('/'); // Pokud není role, přesměruj na login
        } else {
            setRole(savedRole);
        }
    }, [navigate]);

    return (
        <div className="container mt-5">
            <h2>Admin panel</h2>
            <p>
                You are logged in as: <strong>{role}</strong>
            </p>
            <div className="mt-4">
                {role === 'Administrator' && (
                    <div>
                        <DataTable />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
