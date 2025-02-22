import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { colors } from '../../utils/colors';

const AddMainGroupForm = ({ show, handleClose, handleSubmit }) => {
    const [formData, setFormData] = React.useState({ name: '', code: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmit(formData);
            setFormData({ name: '', code: '' }); // Clear the form after submission
            handleClose();
        } catch (error) {
            console.error('Failed to add Main Group:', error.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Main Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCode">
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        style={{ backgroundColor: colors.secondary }}
                        className="mt-3"
                    >
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddMainGroupForm;
