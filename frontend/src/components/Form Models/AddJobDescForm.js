import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { colors } from '../../utils/colors';

const AddJobDescForm = ({ show, handleClose, handleSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData); // Populate form with initial data for editing
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData); // Call the passed handleSubmit function
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{initialData?.id ? 'Edit Job Description' : 'Add Job Description'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Job Description Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="btn btn-primary mt-3"
                        style={{ backgroundColor: colors.secondary }}
                    >
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddJobDescForm;
