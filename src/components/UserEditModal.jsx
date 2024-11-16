import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserEditModal = ({ show, onClose, user, onSave }) => {
    const [username, setUsername] = useState(user?.username || '');
    const [role, setRole] = useState(user?.role || '');

    const handleSave = () => {
        const updatedUser = { username, role }; // Aktualizovaná data
        onSave(updatedUser); // Předáme aktualizovaného uživatele
        onClose(); // Zavřeme modální okno
    };

    if (!user) return null;

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
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
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserEditModal;
