import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddUserModal = ({ show, onClose, onAdd }) => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('Customer'); // Defaultní role

    const handleAdd = () => {
        if (username.trim() === '') {
            alert('Username is required');
            return;
        }

        const newUser = { username, role };
        onAdd(newUser); // Předáme nového uživatele
        setUsername(''); // Vyčištění formuláře
        setRole('Customer');
        onClose(); // Zavření modálního okna
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="Administrator">Administrator</option>
                            <option value="Editor">Editor</option>
                            <option value="Customer">Customer</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAdd}>
                    Add User
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddUserModal;
