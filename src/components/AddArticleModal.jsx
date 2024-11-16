import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddArticleModal = ({ show, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleAdd = () => {
        if (!title || !content) {
            alert('Both title and content are required!');
            return;
        }

        const newArticle = {
            title,
            content
        };
        onAdd(newArticle); // Předáme nový článek
        setTitle(''); // Resetujeme pole
        setContent('');
        onClose(); // Zavřeme modální okno
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Article</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter article title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter article content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAdd}>
                    Add Article
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddArticleModal;
