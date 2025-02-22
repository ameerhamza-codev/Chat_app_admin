import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { colors } from '../../utils/colors';

const AddCountryForm = ({ show, handleClose, handleSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmit(formData); // Pass formData to handleSubmit
            handleClose();
        } catch (error) {
            console.error('Error while submitting form:', error.response || error);
            alert('Failed to add the country. Please try again.');
        }
    };
    
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Country</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Country Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='btn btn-primary mt-3' style={{ backgroundColor: colors.secondary }}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddCountryForm;
