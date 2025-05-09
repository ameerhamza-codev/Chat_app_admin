import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { colors } from '../../utils/colors';

const AddRespTypeForm = ({ show, handleClose, handleSubmit, formData, handleChange }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(); // Submit the form using the hook
        handleClose(); // Close the modal
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Responsibility Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Responsibility Type Name</Form.Label>
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

export default AddRespTypeForm;
