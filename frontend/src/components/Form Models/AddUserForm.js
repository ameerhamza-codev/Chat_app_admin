import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { colors } from '../../utils/colors';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AddUserForm = ({ isEditMode, show, handleClose, formData, handleChange, handleSubmit, dropdownOptions, showSuccessModal, setShowSuccessModal }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    };

    const renderOptions = (options = [], useCode = false) => {
        if (!Array.isArray(options) || options.length === 0) {
            return <option>Loading...</option>;
        }
        return options.map((option) => (
            <option key={option.id || option.code} value={useCode ? option.code : option.name}>
                {useCode ? option.code : option.name}
            </option>
        ));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Edit User' : 'Add User'}</Modal.Title>
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
                                    value={formData.mainGroupCode || ""}
                                    onChange={handleChange}
                                    
                                >
                                    <option value="">Select</option>
                                    {renderOptions(dropdownOptions?.mainGroupCodes, true)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="subGroup1Code">
                                <Form.Label>Sub Group 1 Code</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="subGroup1Code"
                                    value={formData.subGroup1Code || ""}
                                    onChange={handleChange}
                                    
                                >
                                    <option value="">Select</option>
                                    {renderOptions(dropdownOptions?.subGroup1Codes, true)}
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
                                    value={formData.subGroup2Code || ""}
                                    onChange={handleChange}
                                    
                                >
                                    <option value="">Select</option>
                                    {renderOptions(dropdownOptions?.subGroup2Codes, true)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="subGroup3Code">
                                <Form.Label>Sub Group 3 Code</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="subGroup3Code"
                                    value={formData.subGroup3Code || ""}
                                    onChange={handleChange}
                                    
                                >
                                    <option value="">Select</option>
                                    {renderOptions(dropdownOptions?.subGroup3Codes, true)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="subGroup4Code">
                                <Form.Label>Sub Group 4 Code</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="subGroup4Code"
                                    value={formData.subGroup4Code || ""}
                                    onChange={handleChange}
                                    
                                >
                                    <option value="">Select</option>
                                    {renderOptions(dropdownOptions?.subGroup4Codes, true)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="displayName">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="displayName"
                                    value={formData.displayName || ""}
                                    onChange={handleChange}
                                    
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="DOB">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="DOB"
                                    value={formData.DOB || ""}
                                    onChange={handleChange}
                                    
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="landline">
                                <Form.Label>Landline</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="landline"
                                    value={formData.landline || ""}
                                    onChange={handleChange}
                                
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="companyName">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName || ""}
                                    onChange={handleChange}
                                    
                                />
                            </Form.Group>
                        </Col>
                        <Col>
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
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="fatherName">
                                <Form.Label>Father Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="workingCountry">
                                <Form.Label>Working Country</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="workingCountry"
                                    value={formData.workingCountry}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    {renderOptions(dropdownOptions?.workingCountries)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="workingCity">
                                <Form.Label>Working City</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="workingCity"
                                    value={formData.workingCity}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    {renderOptions(dropdownOptions?.workingCities)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="occupation">
                                <Form.Label>Occupation</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    {renderOptions(dropdownOptions?.occupations)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
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
                        </Col>
                        <Col>
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
                        </Col>
                    </Row>
                    <Form.Group controlId="mobile">
                        <Form.Label>Mobile</Form.Label>
                        <PhoneInput
                            country={'sa'}
                            value={formData.mobile}
                            onChange={(phone) => handleChange({ target: { name: 'mobile', value: phone } })}
                            inputProps={{
                                name: 'mobile',
                                required: true,
                            }}
                            containerStyle={{ width: '100%' }}
                            inputStyle={{ width: '100%' }}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {isEditMode && (
                        <>
                            <Row>
                                <Col>
                                    <Form.Group controlId="referToFriend">
                                        <Form.Label>Refer to Friend</Form.Label>
                                        <Form.Check
                                            type="checkbox"
                                            name="referToFriend"
                                            checked={formData.referToFriend || false}
                                            onChange={(e) => handleChange({ target: { name: 'referToFriend', value: e.target.checked } })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="groupCode">
                                        <Form.Label>Group Code</Form.Label>
                                        <Form.Check
                                            type="checkbox"
                                            name="groupCode"
                                            checked={formData.groupCode || false}
                                            onChange={(e) => handleChange({ target: { name: 'groupCode', value: e.target.checked } })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Form.Group controlId="action">
                                        <Form.Label>Action</Form.Label>
                                        <Form.Check
                                            type="checkbox"
                                            name="action"
                                            checked={formData.action || false}
                                            onChange={(e) => handleChange({ target: { name: 'action', value: e.target.checked } })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="subGroup1Representative">
                                        <Form.Label>Sub Group 1 Representative</Form.Label>
                                        <Form.Check
                                            type="checkbox"
                                            name="subGroup1Representative"
                                            checked={formData.subGroup1Representative || false}
                                            onChange={(e) => handleChange({ target: { name: 'subGroup1Representative', value: e.target.checked } })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="subGroup2Representative">
                                        <Form.Label>Sub Group 2 Representative</Form.Label>
                                        <Form.Check
                                            type="checkbox"
                                            name="subGroup2Representative"
                                            checked={formData.subGroup2Representative || false}
                                            onChange={(e) => handleChange({ target: { name: 'subGroup2Representative', value: e.target.checked } })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="subGroup3Representative">
                                        <Form.Label>Sub Group 3 Representative</Form.Label>
                                        <Form.Check
                                            type="checkbox"
                                            name="subGroup3Representative"
                                            checked={formData.subGroup3Representative || false}
                                            onChange={(e) => handleChange({ target: { name: 'subGroup3Representative', value: e.target.checked } })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="subGroup4Representative">
                                        <Form.Label>Sub Group 4 Representative</Form.Label>
                                        <Form.Check
                                            type="checkbox"
                                            name="subGroup4Representative"
                                            checked={formData.subGroup4Representative || false}
                                            onChange={(e) => handleChange({ target: { name: 'subGroup4Representative', value: e.target.checked } })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </>
                    )}

                    <Button
                        variant="primary"
                        type="submit"
                        className="btn btn-primary mt-3"
                        style={{ backgroundColor: colors.secondary }}
                    >
                        {isEditMode ? 'Save Changes' : 'Add User'}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{isEditMode ? 'User details have been updated successfully!' : 'User has been added successfully!'}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Modal>
    );
};

export default AddUserForm;
