import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username') || 'User';

    const handleLogout = () => {
        localStorage.clear(); //vyčistit local storage data
        navigate('/');
        window.location.reload(); // refresh stránky aby zmizli věci pro admina například
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Blog Application
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Articles
                            </Link>
                        </li>
                        {role === 'Administrator' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">
                                    User Management
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex align-items-center">
                        {role && (
                            <div className="me-3">
                                <Link
                                    to="/profile"
                                    className="text-white text-decoration-none d-flex align-items-center"
                                >
                                    <FaUserCircle size={24} className="me-2" />
                                    {username}
                                </Link>
                            </div>
                        )}
                        {role ? (
                            <button className="btn btn-outline-light me-2" onClick={handleLogout}>
                                Log Out
                            </button>
                        ) : (
                            <Link className="btn btn-outline-light me-2" to="/login">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
