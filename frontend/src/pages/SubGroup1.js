import React, { useState, useEffect } from 'react'; // Added useEffect
import useSearchSubGroup1 from '../hooks/groups/searchSubGroup1Hook';
import SearchBar from '../components/Searchbar';
import { colors } from '../utils/colors';
import { Button, Table, Modal } from 'react-bootstrap';
import ModalForm from '../components/Form Models/AddSubGroup1Form';
import useSubGroup1Form from '../hooks/model-forms/AddSubGroup1Hook';
import {
    exportSubGroup1,
    importSubGroup1,
    deleteSubGroup1,
    updateSubGroup1,
    addSubGroup1,
} from '../api/groupsApi';

const SubGroup1 = () => {
    const {
        query,
        filter,
        results,
        loading,
        error,
        handleQueryChange,
        handleFilterChange,
        handleSearch,
        setResults,
    } = useSearchSubGroup1();

    const filters = [
        { value: 'main_group_code', label: 'Main Group Code' },
        { value: 'name', label: 'Sub Group 1 Name' },
        { value: 'code', label: 'Sub Group 1 Code' },
    ];

    const [showModal, setShowModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false); // Success modal 
    const [deleteMessage, setDeleteMessage] = useState(''); // Message for delete modal
    const [selectedItem, setSelectedItem] = useState(null); // Selected item for edit/delete
    const { formData, handleChange, setFormData } = useSubGroup1Form();

    // **Handle Add Modal Show**
    const handleShow = () => {
        setFormData({ mainGroupCode: '', name: '', code: '' }); // Reset form for adding
        setShowModal(true);
    };

    // **Handle Modal Close**
    const handleClose = () => {
        setShowModal(false);
    };

    // **Handle Add Submit**
    const handleAddSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!formData.mainGroupCode || !formData.name || !formData.code) {
            console.error('All fields are required to add a new group!');
            return;
        }

        try {
            const response = await addSubGroup1(formData);
            console.log('Add Response:', response);

            // Add the new group to the UI immediately
            if (response && response.id) {
                setResults((prevResults) => [...prevResults, response]);
            }

            setShowModal(false); // Close the modal
            setSuccessModal(true); // Show success modal
        } catch (error) {
            console.error('Error adding Sub Group 1:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        if (e) e.preventDefault();
    
        if (!formData.name || !formData.code) {
            console.error('Sub Group 1 Name and Code are required!');
            return;
        }
    
        try {
            const response = await updateSubGroup1({
                id: formData.id,
                name: formData.name,
                code: formData.code,
            });
    
            console.log('Edit Response:', response);
    
            // Replace the updated item in the results array
            setResults((prevResults) =>
                prevResults.map((result) =>
                    result.id === formData.id
                        ? { ...result, name: formData.name, code: formData.code }
                        : result
                )
            );
    
            setShowModal(false); // Close the modal
        } catch (error) {
            console.error('Error updating Sub Group 1:', error);
        }
    };
    

    // **Handle Delete**
    const handleDelete = async () => {
        try {
            await deleteSubGroup1(selectedItem.id);

            // Remove the deleted item from the UI
            setResults((prevResults) =>
                prevResults.filter((result) => result.id !== selectedItem.id)
            );

            setDeleteMessage('Sub Group 1 deleted successfully');
            setAlertModal(true); // Show delete success modal
        } catch (error) {
            console.error('Error deleting Sub Group 1:', error);
            setDeleteMessage('Failed to delete Sub Group 1');
            setAlertModal(true); // Show delete error modal
        }
    };

    // **Handle Import**
    const handleImport = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv';
        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (!file) {
                alert('Please select a file to import.');
                return;
            }

            try {
                const response = await importSubGroup1(file);
                alert(response.message || 'File imported successfully');
                handleSearch(); // Refresh the list
            } catch (error) {
                console.error('Error importing file:', error);
                alert(error.response?.data?.error || 'Failed to import file');
            }
        };
        input.click();
    };

    // **Handle Export**
    const handleExport = async () => {
        try {
            await exportSubGroup1();
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    // **Clear Form Data on Modal Close**
    useEffect(() => {
        if (!showModal) {
            setFormData({ mainGroupCode: '', name: '', code: '' });
        }
    }, [showModal, setFormData]);
    return (
        <div>
            <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
                <h3>Sub Group 1</h3>
                <div>
                    <Button
                        variant="primary"
                        type="button"
                        style={{ backgroundColor: colors.secondary }}
                        onClick={handleShow}
                    >
                        Add Sub Group 1
                    </Button>
                    <ModalForm
                        show={showModal}
                        handleClose={handleClose}
                        handleSubmit={selectedItem ? handleEditSubmit : handleAddSubmit}
                        formData={formData}
                        handleChange={handleChange}
                    />
                    <button
                        className="btn btn-primary mx-2"
                        style={{ backgroundColor: colors.secondary }}
                        onClick={handleImport}
                    >
                        Import
                    </button>
                    <button
                        className="btn btn-primary"
                        style={{ backgroundColor: colors.secondary }}
                        onClick={handleExport}
                    >
                        Export
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <SearchBar
                placeholder="Search..."
                query={query}
                filter={filter}
                onQueryChange={handleQueryChange}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                filters={filters}
            />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {/* Results Table */}
            {results.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Main Group Code</th>
                            <th>Sub Group 1 Name</th>
                            <th>Sub Group 1 Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item) => (
                            <tr key={item.id}>
                                <td>{item.main_group_code}</td>
                                <td>{item.name}</td>
                                <td>{item.code}</td>
                                <td>
                                    <button
                                        className="btn btn-primary mx-1"
                                        onClick={() => {
                                            setFormData({
                                                id: item.id,
                                                mainGroupCode: item.main_group_code,
                                                name: item.name,
                                                code: item.code,
                                            });
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setAlertModal(true); // Show alert modal for delete
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Alert Modal */}
            <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {deleteMessage ? 'Delete Status' : 'Confirm Delete'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {deleteMessage || `Do you want to delete "${selectedItem?.name}"?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setAlertModal(false)}
                    >
                        Close
                    </Button>
                    {!deleteMessage && (
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                        >
                            Confirm
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            {/* Success Modal */}
            <Modal show={successModal} onHide={() => setSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sub Group 1 added successfully!</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => setSuccessModal(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SubGroup1;
