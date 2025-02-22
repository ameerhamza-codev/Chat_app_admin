import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getMainGroups, searchSubGroup1, fetchSubGroup2, searchSubGroup2 } from '../../api/groupsApi';

const AddSubGroup3Form = ({ show, handleClose, handleSubmit }) => {
    const [formData, setFormData] = useState({
        mainGroupCode: '',
        subGroup1Code: '',
        subGroup2Code: '',
        name: '',
        code: '',
    });

    const [mainGroups, setMainGroups] = useState([]);
    const [subGroup1, setSubGroup1] = useState([]);
    const [subGroup2, setSubGroup2] = useState([]);
    const [subGroup3Data, setSubGroup3Data] = useState([]);

    // Fetch main groups, sub-group 1, and sub-group 2 initially
    useEffect(() => {
        const fetchData = async () => {
            try {
                setMainGroups(await getMainGroups());
                setSubGroup1(await searchSubGroup1('', ''));
                setSubGroup2(await searchSubGroup2('', ''));
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            }
        };
        fetchData();
    }, []);

    // Fetch Sub Group 2 data when mainGroupCode or subGroup1Code changes
    useEffect(() => {
        const fetchSubGroup2Data = async () => {
            try {
                if (formData.mainGroupCode && formData.subGroup1Code) {
                    const data = await fetchSubGroup2(formData.mainGroupCode, formData.subGroup1Code);
                    setSubGroup2(data);
                } else {
                    setSubGroup2([]);
                }
            } catch (error) {
                console.error('Error fetching Sub Group 2:', error);
                setSubGroup2([]);
            }
        };

        fetchSubGroup2Data();
    }, [formData.mainGroupCode, formData.subGroup1Code]);

    // Auto-generate Sub Group 3 Code based on Sub Group 2 Code
    useEffect(() => {
        if (formData.subGroup2Code) {
            const latestCodeParts = formData.subGroup2Code.split("-");
            const newCode = `${formData.subGroup2Code}-${String(latestCodeParts[1] ? parseInt(latestCodeParts[1], 10) + 1 : 1).padStart(3, "0")}`;
            setFormData(prevState => ({ ...prevState, code: newCode }));
        }
    }, [formData.subGroup2Code]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Form submission
    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = Object.values(formData).every((field) => field.trim() !== '');
        if (!isValid) {
            alert('Please fill in all required fields.');
            return;
        }
        handleSubmit(formData); // Pass formData directly to handleSubmit
        handleClose(); // Close the modal
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Sub-Group 3</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="mainGroupCode">
                        <Form.Label>Main Group Code</Form.Label>
                        <Form.Control
                            as="select"
                            name="mainGroupCode"
                            value={formData.mainGroupCode}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            {mainGroups.map((group) => (
                                <option key={group.code} value={group.code}>
                                    {group.code}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="subGroup1Code">
                                <Form.Label>Sub Group 1 Code</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="subGroup1Code"
                                    value={formData.subGroup1Code}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    {subGroup1.map((group) => (
                                        <option key={group.code} value={group.code}>
                                            {group.code}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="subGroup2Code">
                                <Form.Label>Sub Group 2 Code</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="subGroup2Code"
                                    value={formData.subGroup2Code}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    {subGroup2.map((group) => (
                                        <option key={group.id} value={group.code}>
                                            {group.code}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="name">
                        <Form.Label>Sub Group 3 Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    {/* Auto-generated Sub Group 3 Code */}
                    
                    <Button variant="primary" type="submit" className="mt-3">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddSubGroup3Form;
