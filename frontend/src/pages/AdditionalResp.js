import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { colors } from '../utils/colors';
//import AddAdditionalRespForm from '../components/FormModels/AddAdditionalRespForm';
import AddAdditionalRespForm from '../components/Form Models/AddAdditionalRespForm';
import { fetchResponsibilities, deleteResponsibility, updateResponsibility } from '../api/formApi'; // Assuming update API exists
import useAdditionalRespForm from '../hooks/model-forms/AddAdditionalRespHook';

const AdditionalResp = () => {
    const [responsibilities, setResponsibilities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingResp, setEditingResp] = useState(null); // Track the responsibility being edited
    const { handleSubmit } = useAdditionalRespForm();

    // Fetch responsibilities from backend
    const fetchAllResponsibilities = async () => {
        try {
            const data = await fetchResponsibilities();
            setResponsibilities(data);
        } catch (error) {
            console.error('Error fetching responsibilities:', error);
        }
    };

    // Handle deleting a responsibility
    const handleDelete = async (id) => {
        try {
            await deleteResponsibility(id);
            fetchAllResponsibilities(); // Refresh list after deletion
        } catch (error) {
            console.error('Error deleting responsibility:', error);
        }
    };

    // Handle edit button click
    const handleEdit = (resp) => {
        setEditingResp(resp); // Set the current responsibility to edit
        setShowModal(true); // Open the modal
    };

    // Handle saving edited responsibility
    const handleSaveEdit = async (formData) => {
        try {
            await updateResponsibility(editingResp.id, formData); // Assuming update API exists
            fetchAllResponsibilities(); // Refresh list after editing
            setEditingResp(null); // Clear the editing state
            setShowModal(false); // Close the modal
        } catch (error) {
            console.error('Error updating responsibility:', error);
        }
    };

    useEffect(() => {
        fetchAllResponsibilities();
    }, []);

    // Modal Handlers
    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setEditingResp(null); // Clear the editing state on close
    };

    return (
        <div>
            <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
                <h3>Additional Responsibility</h3>
                <Button
                    variant="primary"
                    style={{ backgroundColor: colors.secondary }}
                    onClick={handleShow}
                >
                    Add Additional Responsibility
                </Button>
                <AddAdditionalRespForm
                    show={showModal}
                    handleClose={handleClose}
                    handleSubmit={(formData) =>
                        editingResp
                            ? handleSaveEdit(formData) // Save the edited responsibility
                            : handleSubmit(formData, fetchAllResponsibilities) // Add a new responsibility
                    }
                    initialData={editingResp} // Pass initial data for editing
                />
            </div>
            <div className="m-2">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responsibilities.map((resp) => (
                            <tr key={resp.id}>
                                <td>{resp.code}</td>
                                <td>{resp.name}</td>
                                <td>{resp.type}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => handleEdit(resp)}
                                        className="me-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(resp.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default AdditionalResp;
