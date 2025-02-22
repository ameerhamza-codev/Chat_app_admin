import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { colors } from "../../utils/colors";
import { getMainGroups, searchSubGroup1 } from "../../api/groupsApi";

const AddSubGroup2Form = ({ show, handleClose, handleSubmit, formData, handleChange, actionType }) => {
  const [mainGroups, setMainGroups] = useState([]);
  const [subGroup1, setSubGroup1] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMainGroups = async () => {
      try {
        const data = await getMainGroups();
        setMainGroups(data);
      } catch (err) {
        setError("Error fetching main group codes.");
        console.error("Error fetching main group codes:", err);
      }
    };

    fetchMainGroups();
  }, []);

  useEffect(() => {
    if (formData.mainGroupCode) {
      const fetchSubGroup1 = async () => {
        try {
          const data = await searchSubGroup1(formData.mainGroupCode, "mainGroupCode");
          setSubGroup1(data);
        } catch (err) {
          console.error("Error fetching Sub Group 1:", err);
        }
      };

      fetchSubGroup1();
    }
  }, [formData.mainGroupCode]);

  useEffect(() => {
    // Auto-generate Sub Group 2 Code based on Sub Group 1 Code
    if (formData.subGroup1Code) {
      const latestCodeParts = formData.subGroup1Code.split("-");
      const newCode = `${formData.subGroup1Code}-${String(latestCodeParts[1] ? parseInt(latestCodeParts[1], 10) + 1 : 1).padStart(3, "0")}`;
      handleChange({ target: { name: "code", value: newCode } });
    }
  }, [formData.subGroup1Code, handleChange]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{actionType === "edit" ? "Edit Sub-Group 2" : "Add Sub-Group 2"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Common Fields */}
          <Form.Group controlId="mainGroupCode">
            <Form.Label>Main Group Code</Form.Label>
            <Form.Control
              as="select"
              name="mainGroupCode"
              value={formData.mainGroupCode || ""}
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

          <Form.Group controlId="subGroup1Code">
            <Form.Label>Sub Group 1 Code</Form.Label>
            <Form.Control
              as="select"
              name="subGroup1Code"
              value={formData.subGroup1Code || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {subGroup1.map((group) => (
                <option key={group.id} value={group.code}>
                  {group.code}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Sub Group 2 Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Sub Group 2 Code (auto-generated) */}
          

          <Button variant="primary" type="submit" style={{ backgroundColor: colors.secondary }}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddSubGroup2Form;
