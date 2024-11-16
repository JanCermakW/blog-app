import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserDetailsModal = ({ show, onClose, user }) => {
    if (!user) return null; // Pokud není uživatel definován, nevracíme žádný obsah

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserDetailsModal;
