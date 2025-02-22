import React, { useState, useEffect } from 'react';
import { colors } from '../utils/colors';
import { Button, Modal, Tabs, Tab, Form } from 'react-bootstrap';
import axios from 'axios';
import AddMainGroupForm from '../components/Form Models/AddMainGroupForm';

import '../styles/ModalStyles.css';
const MainGroups = () => {
    const [mainGroups, setMainGroups] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showSubGroupsModal, setShowSubGroupsModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal state
    const [successMessage, setSuccessMessage] = useState(''); // Success message state
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [subGroups, setSubGroups] = useState({
        group1: [],
        group2: [],
        group3: [],
        group4: [],
    });

    // Fetch all main groups
    const fetchMainGroups = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/main-group/all');
            setMainGroups(response.data);
        } catch (error) {
            console.error('Failed to fetch Main Groups:', error.response?.data || error.message);
        }
    };

    // Fetch sub-groups of a main group
const fetchSubGroups = async (mainGroupCode) => {
    console.log(`Fetching subgroups for mainGroupCode: ${mainGroupCode}`);  // Log the mainGroupCode
    try {
        const response = await axios.get(`http://localhost:5000/api/subgroups/${mainGroupCode}`);
        console.log('Subgroups data:', response.data);

        setSubGroups({
            group1: response.data.subGroup1 || [],
            group2: response.data.subGroup2 || [],
            group3: response.data.subGroup3 || [],
            group4: response.data.subGroup4 || [],
        });
    } catch (error) {
        console.error('Failed to fetch sub-groups:', error.response?.data || error.message);
    }
};

    
    

    // Add a new main group
    const handleAddMainGroup = async (newGroup) => {
        try {
            await axios.post('http://localhost:5000/api/main-group/add', newGroup);
            fetchMainGroups(); // Refresh the list
            setSuccessMessage('Main Group added successfully!');
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Failed to add Main Group:', error.message);
        }
    };

    // Delete a main group
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/main-group/delete/${id}`);
            setSuccessMessage(response.data.message || 'Main Group deleted successfully!');
            setShowSuccessModal(true);
            fetchMainGroups(); // Refresh the list
        } catch (error) {
            console.error('Error deleting group:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Failed to delete Main Group.');
        }
    };

    // Open edit modal
    const handleEditOpen = (group) => {
        setSelectedGroup(group);
        setShowEditModal(true);
    };

    // Close edit modal
    const handleEditClose = () => {
        setSelectedGroup(null);
        setShowEditModal(false);
    };

    // Submit edit changes
    const handleEditSubmit = async () => {
        if (!selectedGroup) return;

        try {
            const response = await axios.put(
                `http://localhost:5000/api/main-group/edit/${selectedGroup.id}`,
                {
                    name: selectedGroup.name,
                    code: selectedGroup.code,
                }
            );
            setSuccessMessage(response.data.message || 'Main Group updated successfully!');
            setShowSuccessModal(true);
            fetchMainGroups(); // Refresh the list
            handleEditClose(); // Close the modal
        } catch (error) {
            console.error('Error editing group:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Failed to update Main Group.');
        }
    };

    useEffect(() => {
        fetchMainGroups();
    }, []);

    return (
        <div>
            <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
                <h3>Main Groups</h3>
                <Button
                    variant="primary"
                    style={{ backgroundColor: colors.secondary }}
                    onClick={() => setShowAddModal(true)}
                >
                    Add Main Group
                </Button>
                <AddMainGroupForm
                    show={showAddModal}
                    handleClose={() => setShowAddModal(false)}
                    handleSubmit={(newGroup) => {
                        handleAddMainGroup(newGroup);
                        setShowAddModal(false); // Close modal after submission
                    }}
                />
            </div>
            <div className="m-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Sub Groups</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mainGroups.map((group) => (
                            <tr key={group.id}>
                                <td>{group.name}</td>
                                <td>{group.code}</td>
                                <td>
                                    <Button
                                        variant="link"
                                        onClick={() => {
                                            setSelectedGroup(group);
                                            fetchSubGroups(group.code);
                                            setShowSubGroupsModal(true);
                                        }}
                                    >
                                        View
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        className="btn btn-warning mx-1"
                                        onClick={() => handleEditOpen(group)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="btn btn-danger mx-1"
                                        onClick={() => handleDelete(group.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Main Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="editName">
                            <Form.Label>Main Group Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedGroup?.name || ''}
                                onChange={(e) =>
                                    setSelectedGroup((prev) => ({ ...prev, name: e.target.value }))
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="editCode" className="mt-3">
                            <Form.Label>Main Group Code</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedGroup?.code || ''}
                                onChange={(e) =>
                                    setSelectedGroup((prev) => ({ ...prev, code: e.target.value }))
                                }
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        style={{ backgroundColor: colors.secondary }}
                        onClick={handleEditSubmit}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Sub-Groups Modal */}
            <Modal show={showSubGroupsModal} onHide={() => setShowSubGroupsModal(false)} className='subGroupModal'>
                <Modal.Header closeButton>
                    <Modal.Title>View Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="subGroup1">
                        <Tab eventKey="subGroup1" title="Sub Group 1">
                            {subGroups.group1.length > 0 ? (
                                subGroups.group1.map((subGroup) => (
                                    <div key={subGroup.id}>
                                        <h5>{subGroup.name}</h5>
                                        <p>{subGroup.code}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No Sub Groups found.</p>
                            )}
                        </Tab>
                        <Tab eventKey="subGroup2" title="Sub Group 2">
                            {subGroups.group2.length > 0 ? (
                                subGroups.group2.map((subGroup) => (
                                    <div key={subGroup.id}>
                                        <h5>{subGroup.name}</h5>
                                        <p>{subGroup.code}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No Sub Groups found.</p>
                            )}
                        </Tab>
                        <Tab eventKey="subGroup3" title="Sub Group 3">
                            {subGroups.group3.length > 0 ? (
                                subGroups.group3.map((subGroup) => (
                                    <div key={subGroup.id}>
                                        <h5>{subGroup.name}</h5>
                                        <p>{subGroup.code}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No Sub Groups found.</p>
                            )}
                        </Tab>
                        <Tab eventKey="subGroup4" title="Sub Group 4">
                            {subGroups.group4.length > 0 ? (
                                subGroups.group4.map((subGroup) => (
                                    <div key={subGroup.id}>
                                        <h5>{subGroup.name}</h5>
                                        <p>{subGroup.code}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No Sub Groups found.</p>
                            )}
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{successMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MainGroups;
