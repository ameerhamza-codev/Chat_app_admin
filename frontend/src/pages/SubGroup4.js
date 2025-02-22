import React, { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import useSearchSubGroup4 from '../hooks/groups/searchSubGroup4';
import useSubGroup4Form from '../hooks/model-forms/AddSubGroup4Hook';
import SearchBar from '../components/Searchbar';
import { colors } from '../utils/colors';
import ModalForm from '../components/Form Models/AddSubGroup4Form';
import {
    importSubGroup4,
    exportSubGroup4,
    deleteSubGroup4,
    updateSubGroup4,
} from '../api/groupsApi';

const SubGroup4 = () => {
    const {
        query,
        filter,
        results,
        setResults,
        loading,
        error,
        handleQueryChange,
        handleFilterChange,
        handleSearch,
    } = useSearchSubGroup4();

    const { handleSubmit } = useSubGroup4Form();

    const filters = [
        { value: 'main_group_code', label: 'Main Group Code' },
        { value: 'sub_group1_code', label: 'Sub Group 1 Code' },
        { value: 'sub_group2_code', label: 'Sub Group 2 Code' },
        { value: 'sub_group3_code', label: 'Sub Group 3 Code' },
        { value: 'name', label: 'Sub Group 4 Name' },
    ];

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false); // State to control edit modal
    const [editData, setEditData] = useState(null); // State to store data for editing
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [editError, setEditError] = useState(''); // Error message for the edit modal
    const [successMessage, setSuccessMessage] = useState(''); // Dynamic success message

    const fileInputRef = useRef(null);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSuccessClose = () => {
        setShowSuccessModal(false);
        setSuccessMessage(''); // Clear success message
    };

    const handleImportClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert('No file selected.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', file);
            await importSubGroup4(formData);

            setSuccessMessage('Data imported successfully!');
            setShowSuccessModal(true);

            handleSearch();
        } catch (error) {
            console.error('Import failed:', error);
            alert('Failed to import Sub Group 4 data.');
        }
    };

    const handleExport = async () => {
        try {
            await exportSubGroup4();
            setSuccessMessage('Data exported successfully!');
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Export failed:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Failed to export Sub Group 4.');
        }
    };
    
    

    const handleEdit = async (id, updatedData) => {
        try {
            // Validate required fields
            if (!updatedData.name || !updatedData.code) {
                setEditError('Name and Code are required!'); // Show error in the modal
                return;
            }

            await updateSubGroup4(id, updatedData);

            // Show success modal instead of alert
            setSuccessMessage('Sub Group 4 updated successfully!');
            setShowSuccessModal(true);

            setShowEditModal(false); // Close the edit modal
            handleSearch(); // Refresh data
        } catch (error) {
            console.error('Edit failed:', error.response?.data || error.message);
            setEditError(error.response?.data?.error || 'Failed to update Sub Group 4.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteSubGroup4(id);

            setSuccessMessage('Sub Group 4 deleted successfully!');
            setShowSuccessModal(true);

            handleSearch();
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete Sub Group 4.');
        }
    };

    return (
        <div>
            <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
                <h3>Sub Group 4</h3>
                <div>
                    <Button
                        variant="primary"
                        type="button"
                        className="btn btn-primary"
                        style={{ backgroundColor: colors.secondary }}
                        onClick={handleShow}
                    >
                        Add Sub Group 4
                    </Button>
                    <ModalForm
                        show={showModal}
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                        onSuccess={() => {
                            setSuccessMessage('Sub Group 4 added successfully!');
                            setShowSuccessModal(true);
                        }}
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept=".csv"
                        onChange={handleImport}
                    />
                    <button
                        className="btn btn-primary mx-2"
                        style={{ backgroundColor: colors.secondary }}
                        onClick={handleImportClick}
                    >
                        Import
                    </button>
                    <button
                        className="btn btn-primary mx-2"
                        style={{ backgroundColor: colors.secondary }}
                        onClick={handleExport}
                    >
                        Export
                    </button>
                </div>
            </div>
            <SearchBar
                placeholder="Search..."
                query={query}
                filter={filter}
                onQueryChange={handleQueryChange}
                onFilterChange={(e) => {
                    handleFilterChange(e);
                    setResults([]); // Clear results on filter change
                }}
                onSearch={handleSearch}
                filters={filters}
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="results-table">
                {results && results.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Main Group Code</th>
                                <th>Sub Group 1 Code</th>
                                <th>Sub Group 2 Code</th>
                                <th>Sub Group 3 Code</th>
                                <th>Sub Group 4 Name</th>
                                <th>Sub Group 4 Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.mainGroupCode || 'N/A'}</td>
                                    <td>{item.subGroup1Code || 'N/A'}</td>
                                    <td>{item.subGroup2Code || 'N/A'}</td>
                                    <td>{item.subGroup3Code || 'N/A'}</td>
                                    <td>{item.name || 'N/A'}</td>
                                    <td>{item.code}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning mx-1"
                                            onClick={() => {
                                                setEditData(item); // Set the data to edit
                                                setShowEditModal(true); // Open edit modal
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger mx-1"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No Data Found</p>
                )}
            </div>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Sub Group 4</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editError && <div className="alert alert-danger">{editError}</div>}
                    {editData && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleEdit(editData.id, editData);
                            }}
                        >
                            <div className="form-group">
                                <label>Main Group Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editData.mainGroupCode}
                                    onChange={(e) =>
                                        setEditData({ ...editData, mainGroupCode: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Sub Group 1 Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editData.subGroup1Code}
                                    onChange={(e) =>
                                        setEditData({ ...editData, subGroup1Code: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Sub Group 2 Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editData.subGroup2Code}
                                    onChange={(e) =>
                                        setEditData({ ...editData, subGroup2Code: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Sub Group 3 Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editData.subGroup3Code}
                                    onChange={(e) =>
                                        setEditData({ ...editData, subGroup3Code: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editData.name}
                                    onChange={(e) =>
                                        setEditData({ ...editData, name: e.target.value })
                                    }
                                />
                            </div>
                            
                            <button type="submit" className="btn btn-primary mt-3">
                                Save Changes
                            </button>
                        </form>
                    )}
                </Modal.Body>
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={handleSuccessClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{successMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSuccessClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SubGroup4;
