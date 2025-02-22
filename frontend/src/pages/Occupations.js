import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ModalForm from '../components/Form Models/AddOccupationForm';
import { addOccupation, fetchOccupations, exportOccupations, importOccupations, deleteOccupation, updateOccupation } from '../api/formApi';

const Occupations = () => {
    const [showModal, setShowModal] = useState(false);
    const [occupations, setOccupations] = useState([]);
    const [editOccupation, setEditOccupation] = useState(null);

    const fetchData = async () => {
        try {
            const data = await fetchOccupations();
            console.log('Fetched Occupations:', data);
            setOccupations(data);
        } catch (error) {
            console.error('Error fetching occupations:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddOccupation = async (newOccupation) => {
        try {
            const addedOccupation = await addOccupation(newOccupation);
            setOccupations((prevOccupations) => [...prevOccupations, addedOccupation.data]);
            setShowModal(false);
        } catch (error) {
            console.error('Error adding occupation:', error);
        }
    };
    
    const handleExport = async () => {
        try {
            const blob = await exportOccupations();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'occupations.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting occupations:', error);
        }
    };

    const handleImport = async (file) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            const occupations = text.split('\n').map((line) => {
                const [name, type] = line.split(',');
                return { name, type };
            });
            await importOccupations(occupations);
            fetchData();
        };
        reader.readAsText(file);
    };

    const handleDelete = async (id) => {
        try {
            console.log('Deleting occupation with ID:', id);
            await deleteOccupation(id);
            setOccupations((prevOccupations) =>
                prevOccupations.filter((occupation) => occupation.id !== id)
            );
        } catch (error) {
            console.error('Error deleting occupation:', error);
        }
    };

    const handleEdit = (occupation) => {
        console.log('Editing Occupation:', occupation); // Debugging
        setEditOccupation(occupation);
        setShowModal(true);
    };
    

    const handleModalClose = () => {
        setEditOccupation(null);
        setShowModal(false);
    };

    const handleSaveEdit = async (updatedData) => {
        try {
            // Log editOccupation.id for debugging
            console.log('Updating occupation:', { id: editOccupation?.id, ...updatedData });
            if (!editOccupation?.id) {
                console.error('Invalid ID for updating occupation');
                return;
            }
    
            const response = await updateOccupation(editOccupation.id, updatedData); // Ensure ID is valid
            console.log('Update Response:', response);
    
            setOccupations((prevOccupations) =>
                prevOccupations.map((occupation) =>
                    occupation.id === editOccupation.id
                        ? { ...occupation, ...updatedData }
                        : occupation
                )
            );
            handleModalClose();
        } catch (error) {
            console.error('Error updating occupation:', error);
        }
    };
    
    

    return (
        <div>
            <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
                <h3>Occupations</h3>
                <div>
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        Add Occupation
                    </Button>
                    <Button variant="secondary" onClick={handleExport} className="mx-2">
                        Export
                    </Button>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleImport(e.target.files[0])}
                        style={{ display: 'none' }}
                        id="file-input"
                    />
                    <label htmlFor="file-input" className="btn btn-secondary">
                        Import
                    </label>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {occupations.map((occ, index) => (
                        <tr key={occ.id || index}>
                            <td>{occ.id || 'N/A'}</td>
                            <td>{occ.name}</td>
                            <td>{occ.type}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => handleEdit(occ)}
                                    className="mx-1"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(occ.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <ModalForm
                    show={showModal}
                    handleClose={handleModalClose}
                    handleSubmit={editOccupation ? handleSaveEdit : handleAddOccupation}
                    editData={editOccupation}
                />
            )}
        </div>
    );
};

export default Occupations;
