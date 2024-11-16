import React, {useEffect, useState} from 'react';
import RoleSwitcher from "./RoleSwitcher";

const ProfilePage = () => {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [role, setRole] = useState('');

    const handleSave = () => {
        localStorage.setItem('username', username); // Save updated username
        localStorage.setItem('email', email); // Save updated email
        alert('Profile updated successfully!');
        window.location.reload();
    };

    useEffect(() => {
        const savedRole = localStorage.getItem('role');
        if (savedRole) {
            setRole(savedRole);
        }
    }, []);

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        localStorage.setItem('role', newRole);
        window.location.reload();
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
            <h2>My Profile</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Save Changes
                </button>
            </form>
                    <RoleSwitcher currentRole={role} onRoleChange={handleRoleChange} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
