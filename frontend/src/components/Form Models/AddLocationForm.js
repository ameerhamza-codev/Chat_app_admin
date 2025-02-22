import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { colors } from '../../utils/colors';

const AddLocationForm = ({ show, handleClose, handleSubmit, editData }) => {
  const [formData, setFormData] = useState({ name: '', code: '' });

  useEffect(() => {
    if (editData) {
      setFormData({ name: editData.name, code: editData.code });
    } else {
      setFormData({ name: '', code: '' });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData); // Pass the form data to the parent component
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editData ? 'Edit Location' : 'Add Location'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          {/* Location Name Field */}
          <Form.Group controlId="formName">
            <Form.Label>Location Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter location name"
              required
            />
          </Form.Group>

          {/* Location Code Field */}
          <Form.Group controlId="formCode" className="mt-3">
            <Form.Label>Location Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter location code"
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

export default AddLocationForm;
