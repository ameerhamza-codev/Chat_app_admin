import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { colors } from '../../utils/colors';
import { getMainGroups, searchSubGroup1, searchSubGroup2, searchSubGroup3 } from '../../api/groupsApi';

const AddSubGroup4Form = ({ show, handleClose, handleSubmit, onSuccess }) => {
    const [formData, setFormData] = useState({
        mainGroupCode: '',
        subGroup1Code: '',
        subGroup2Code: '',
        subGroup3Code: '',
        name: '',
        code: '',
    });

    const [mainGroups, setMainGroups] = useState([]);
    const [subGroup1Options, setSubGroup1Options] = useState([]);
    const [subGroup2Options, setSubGroup2Options] = useState([]);
    const [subGroup3Options, setSubGroup3Options] = useState([]);

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const mainGroupsData = await getMainGroups();
                setMainGroups(mainGroupsData);

                const subGroup1Data = await searchSubGroup1('', 'code');
                setSubGroup1Options(subGroup1Data);

                const subGroup2Data = await searchSubGroup2('', 'code');
                setSubGroup2Options(subGroup2Data);

                const subGroup3Data = await searchSubGroup3('', 'code');
                setSubGroup3Options(subGroup3Data);
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            }
        };

        fetchDropdownData();
    }, []);

    // Auto-generate Sub Group 4 Code based on Sub Group 3 Code
    useEffect(() => {
        if (formData.subGroup3Code) {
            const latestCodeParts = formData.subGroup3Code.split("-");
            const newCode = `${formData.subGroup3Code}-${String(latestCodeParts[latestCodeParts.length - 1] ? parseInt(latestCodeParts[latestCodeParts.length - 1], 10) + 1 : 1).padStart(3, "0")}`;
            handleChange({ target: { name: "code", value: newCode } });
        }
    }, [formData.subGroup3Code]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.trim(), // Ensure no empty strings
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (typeof handleSubmit !== 'function') {
            console.error('handleSubmit is not a function'); // Log for debugging
            return;
        }
        try {
            await handleSubmit(formData); // Call the passed handleSubmit function
            setFormData({
                mainGroupCode: '',
                subGroup1Code: '',
                subGroup2Code: '',
                subGroup3Code: '',
                name: '',
                code: '',
            });
            handleClose(); // Close the modal
            if (typeof onSuccess === 'function') onSuccess(); // Trigger success modal
        } catch (error) {
            console.error('Submission failed:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Sub-Group 4</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Row>
                        <Col>
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
                        </Col>
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
                                    {subGroup1Options.map((group) => (
                                        <option key={group.code} value={group.code}>
                                            {group.code}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
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
                                    {subGroup2Options.map((group) => (
                                        <option key={group.code} value={group.code}>
                                            {group.code}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="subGroup3Code">
                                <Form.Label>Sub Group 3 Code</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="subGroup3Code"
                                    value={formData.subGroup3Code}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    {subGroup3Options.map((group) => (
                                        <option key={group.code} value={group.code}>
                                            {group.code}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="name">
                        <Form.Label>Sub Group 4 Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    {/* Auto-generated Sub Group 4 Code */}
                   
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

export default AddSubGroup4Form;
