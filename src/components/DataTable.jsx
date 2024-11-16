import React, { useState } from 'react';
import usersData from '../data/users.json';
import UserDetailsModal from './UserDetailsModal';
import UserEditModal from './UserEditModal';
import AddUserModal from './AddUserModal';

const DataTable = () => {
    const [users, setUsers] = useState(usersData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('All');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Aktuální stránka
    const itemsPerPage = 5; // Počet uživatelů na stránku

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole =
            selectedRole === 'All' || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    const indexOfLastItem = currentPage * itemsPerPage; // Poslední uživatel na stránce
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // První uživatel na stránce
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem); // Data pro aktuální stránku

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage); // Počet stránek

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const Pagination = ({ totalPages, currentPage, onPageChange }) => {
        const pages = Array.from({ length: totalPages }, (_, index) => index + 1); // Generování čísel stránek

        return (
            <nav>
                <ul className="pagination">
                    {pages.map((page) => (
                        <li
                            key={page}
                            className={`page-item ${page === currentPage ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };



    const exportToCSV = () => {
        const headers = ['Username,Role'];
        const rows = users.map((user) => `${user.username},${user.role}`);
        const csvContent = [headers, ...rows].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'users.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleAddUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    const handleSaveUser = (updatedUser) => {
        const updatedUsers = users.map((user) =>
            user.username === selectedUser.username ? { ...user, ...updatedUser } : user
        );
        setUsers(updatedUsers);
    };

    const handleCloseDetailsModal = () => {
        setSelectedUser(null);
        setShowDetailsModal(false);
    };

    const handleCloseEditModal = () => {
        setSelectedUser(null);
        setShowEditModal(false);
    };

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setShowDetailsModal(true);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDeleteUser = (username) => {
        if (window.confirm(`Are you sure you want to delete ${username}?`)) {
            const updatedUsers = users.filter((user) => user.username !== username);
            setUsers(updatedUsers);
        }
    };


    return (
        <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>User Management</h4>
                <div className={"d-flex flex-wrap gap-1"}>
                    <button
                        className="btn btn-success me-2"
                        onClick={() => setShowAddModal(true)}
                    >
                        Add User
                    </button>
                    <button className="btn btn-secondary" onClick={exportToCSV}>
                        Export to CSV
                    </button>
                </div>
            </div>

            <div className={"row"}>
                <div className={"col-md-8"}>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search by username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={"col-md-4"}>
                    <select
                        className="form-select mb-3"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="All">All Roles</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Editor">Editor</option>
                        <option value="Customer">Customer</option>
                    </select>
                </div>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user, index) => (
                    <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td className={"d-flex flex-wrap gap-1"}>
                            <button
                                className="btn btn-info btn-sm me-2"
                                onClick={() => handleRowClick(user)}
                            >
                                Details
                            </button>
                            <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => handleEditClick(user)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteUser(user.username)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />


            <UserDetailsModal
                show={showDetailsModal}
                onClose={handleCloseDetailsModal}
                user={selectedUser}
            />
            <UserEditModal
                show={showEditModal}
                onClose={handleCloseEditModal}
                user={selectedUser}
                onSave={handleSaveUser}
            />
            <AddUserModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddUser}
            />
        </div>
    );
};

export default DataTable;
