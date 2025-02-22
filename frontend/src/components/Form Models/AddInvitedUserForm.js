import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AddInvitedUserForm = ({ 
    show, 
    handleClose, 
    handleSubmit, 
    dropdownData, 
    formData, 
    handleChange, 
    editMode 
}) => {
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(editMode, formData.id); // Pass `editMode` and `formData.id` for edit
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? 'Edit User' : 'Invite User'}</Modal.Title>
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
                            
                        >
                            <option value="">Select</option>
                            {dropdownData.mainGroups?.map((group) => (
                                <option key={group.id} value={group.code}>
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
                                    
                                >
                                    <option value="">Select</option>
                                    {dropdownData.subGroup1?.map((group) => (
                                        <option key={group.id} value={group.code}>
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
                                    
                                >
                                    <option value="">Select</option>
                                    {dropdownData.subGroup2?.map((group) => (
                                        <option key={group.id} value={group.code}>
                                            {group.code}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="subGroup3Code">
                                <Form.Label>Sub Group 3 Code</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="subGroup3Code"
                                    value={formData.subGroup3Code}
                                    onChange={handleChange}
                                    
                                >
                                    <option value="">Select</option>
                                    {dropdownData.subGroup3?.map((group) => (
                                        <option key={group.id} value={group.code}>
                                            {group.code}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="subGroup4Code">
                                <Form.Label>Sub Group 4 Code</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="subGroup4Code"
                                    value={formData.subGroup4Code}
                                    onChange={handleChange}
                                    
                                >
                                    <option value="">Select</option>
                                    {dropdownData.subGroup4?.map((group) => (
                                        <option key={group.id} value={group.code}>
                                            {group.code}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="mobile">
                        <Form.Label>Mobile</Form.Label>
                        <PhoneInput
                            country={'us'}
                            value={formData.mobile}
                            onChange={(phone) =>
                                handleChange({
                                    target: { name: 'mobile', value: phone },
                                })
                            }
                            inputProps={{
                                name: 'mobile',
                                required: true,
                            }}
                            containerStyle={{ width: '100%' }}
                            inputStyle={{ width: '100%' }}
                        />
                    </Form.Group>

                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                            as="select"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="additionalResponsibility">
                        <Form.Label>Additional Responsibility</Form.Label>
                        <Form.Control
                            type="text"
                            name="additionalResponsibility"
                            value={formData.additionalResponsibility}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="referrer">
                        <Form.Check
                            type="checkbox"
                            label="Referrer"
                            name="referrer"
                            checked={formData.referrer}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        {editMode ? 'Update User' : 'Add User'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddInvitedUserForm;
