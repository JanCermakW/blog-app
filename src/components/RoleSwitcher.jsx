import React from 'react';

const RoleSwitcher = ({ currentRole, onRoleChange }) => {
    // Definice dostupných rolí
    const allRoles = ['Administrator', 'Editor', 'Customer'];

    // Filtrování dostupných rolí na základě aktuální role
    const availableRoles = allRoles.filter((role) => {
        if (currentRole === 'Administrator') return role !== 'Administrator';
        if (currentRole === 'Editor') return role === 'Customer';
        return false; // Customer nemá dostupné jiné role
    });

    return (
        <div className="mt-4">
            <h4>Switch Role</h4>
            <p>
                Current Role: <strong>{currentRole}</strong>
            </p>
            {availableRoles.length > 0 ? (
                <div className="btn-group" role="group" aria-label="Role switcher">
                    {availableRoles.map((role) => (
                        <button
                            key={role}
                            className="btn btn-outline-primary"
                            onClick={() => onRoleChange(role)}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            ) : (
                <p>No other roles available.</p>
            )}
        </div>
    );
};

export default RoleSwitcher;
