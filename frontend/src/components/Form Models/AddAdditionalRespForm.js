import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddAdditionalRespForm = ({ show, handleClose, handleSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        type: '',
    });

    // Populate form fields when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                code: initialData.code || '',
                name: initialData.name || '',
                type: initialData.type || '',
            });
        }
    }, [initialData]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit form
    const onSubmit = async (e) => {
        e.preventDefault();
        await handleSubmit(formData); // Wait for the submission to complete
        handleClose(); // Close the modal
        setFormData({ code: '', name: '', type: '' }); // Clear the form
    };
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Edit Responsibility' : 'Add Responsibility'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label> Responsibility Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="Enter code"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Responsibility Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Responsibility Type</Form.Label>
                        <Form.Control
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            placeholder="Enter type"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {initialData ? 'Update' : 'Add'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddAdditionalRespForm;
