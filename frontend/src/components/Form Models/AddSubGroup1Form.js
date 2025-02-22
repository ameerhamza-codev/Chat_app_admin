import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { colors } from '../../utils/colors';
import { getMainGroups } from '../../api/groupsApi';

const AddSubGroup1Form = ({ show, handleClose, handleSubmit, formData, handleChange }) => {
    const [mainGroups, setMainGroups] = useState([]);
    const [error, setError] = useState('');

    // Fetch main group codes from the backend
    useEffect(() => {
        const fetchMainGroups = async () => {
            try {
                const data = await getMainGroups();
                setMainGroups(data); // Populate state with fetched data
            } catch (err) {
                setError('Error fetching main group codes.');
                console.error('Error fetching main group codes:', err); // Log error for debugging
            }
        };

        fetchMainGroups();
    }, []);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Sub-Group 1</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(); // Trigger the parent submit logic
                        handleClose();
                    }}
                >
                    {/* Dropdown for Main Groups */}
                    <Form.Group controlId="mainGroup">
                        <Form.Label>Main Group Code</Form.Label>
                        <Form.Control
                             as="select"
                             name="mainGroupCode" // Ensure this matches the backend field name
                            value={formData.mainGroupCode || ''} // Correct field name
                             onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            {mainGroups.map((group) => (
                                <option key={group.id} value={group.code}>
                                    {group.code}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    {/* Sub Group 1 Name Field */}
                    <Form.Group controlId="formName">
                        <Form.Label>Sub Group 1 Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData?.name || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Sub Group 1 Code Field */}
                    <Form.Group controlId="formCode">
                        <Form.Label>Sub Group 1 Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="code"
                            value={formData?.code || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Submit Button */}
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

export default AddSubGroup1Form;
