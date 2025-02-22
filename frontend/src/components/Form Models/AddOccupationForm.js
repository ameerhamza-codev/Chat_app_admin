import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddOccupationForm = ({ show, handleClose, handleSubmit, editData }) => {
    const [formData, setFormData] = useState(editData || { code: '', name: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleSubmit(formData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editData ? 'Edit Occupation' : 'Add Occupation'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formCode">
                        <Form.Label>Occupation Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formName">
                        <Form.Label>Occupation Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formType">
                        <Form.Label>Occupation Type</Form.Label>
                        <Form.Control
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};


export default AddOccupationForm;
