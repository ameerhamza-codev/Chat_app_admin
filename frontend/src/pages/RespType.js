import React, { useState, useEffect } from 'react';
import { colors } from '../utils/colors';
import { Button, Alert } from 'react-bootstrap';
import AddRespTypeForm from '../components/Form Models/AddRespTypeForm';
import useAddRespTypeForm from '../hooks/model-forms/AddRespTypeHook';
import { fetchResponsibilityTypes, deleteResponsibilityType } from '../api/formApi';

const RespType = () => {
    const [showModal, setShowModal] = useState(false);
    const [responsibilityTypes, setResponsibilityTypes] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Function to fetch responsibility types
    const loadResponsibilityTypes = async () => {
        try {
            const data = await fetchResponsibilityTypes();
            setResponsibilityTypes(data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load responsibility types.');
        }
    };

    // Initialize responsibility types on component mount
    useEffect(() => {
        loadResponsibilityTypes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteResponsibilityType(id);
            setSuccess('Responsibility type deleted successfully!');
            loadResponsibilityTypes(); // Refresh the list after deletion
        } catch (err) {
            console.error('Delete failed:', err);
            setError('Failed to delete responsibility type.');
        }
    };

    const { formData, handleChange, handleSubmit } = useAddRespTypeForm(loadResponsibilityTypes);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div>
            <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
                <h3>Responsibility Type</h3>
                <Button
                    variant="primary"
                    className="mx-2"
                    style={{ backgroundColor: colors.secondary }}
                    onClick={handleShow}
                >
                    Add Responsibility Type
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <AddRespTypeForm
                show={showModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                formData={formData}
                handleChange={handleChange}
            />

            <div className="m-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responsibilityTypes.length > 0 ? (
                            responsibilityTypes.map((item, index) => (
                                <tr key={item.id || index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No responsibility types found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RespType;
