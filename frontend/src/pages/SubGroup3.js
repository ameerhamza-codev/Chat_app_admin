import React, { useState } from 'react';
import useSearchSubGroup3 from '../hooks/groups/searchSubGroup3Hook';
import SearchBar from '../components/Searchbar';
import { Button, Modal, Form } from 'react-bootstrap';
import ModalForm from '../components/Form Models/AddSubGroup3Form';
import {
  addSubGroup3,
  importSubGroup3,
  exportSubGroup3,
  deleteSubGroup3,
  updateSubGroup3,
} from '../api/groupsApi';

const SubGroup3 = () => {
  const [showAddModal, setShowAddModal] = useState(false); // Add modal visibility
  const [showEditModal, setShowEditModal] = useState(false); // Edit modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete confirmation modal visibility
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success alert modal visibility
  const [currentSubGroup, setCurrentSubGroup] = useState(null); // Data of the row being edited
  const [successMessage, setSuccessMessage] = useState(''); // Success message for modal
  const [editFormData, setEditFormData] = useState({
    mainGroupCode: '',
    subGroup1Code: '',
    subGroup2Code: '',
    name: '',
  });
  const [showTable, setShowTable] = useState(false); // Control table visibility

  const {
    query,
    filter,
    results,
    handleQueryChange,
    handleFilterChange: onFilterChange,
    handleSearch: performSearch,
  } = useSearchSubGroup3();

  // Handle Add New SubGroup3
  const handleAdd = async (data) => {
    try {
      await addSubGroup3(data);
      setShowAddModal(false); // Close the Add modal
      setSuccessMessage('Sub Group 3 added successfully!'); // Set success message
      setShowSuccessModal(true); // Show success modal
      performSearch(); // Refresh data
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding Sub Group 3');
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (row) => {
    setCurrentSubGroup(row); // Store the row being edited
    setEditFormData({
      mainGroupCode: row.main_group_code,
      subGroup1Code: row.sub_group1_code,
      subGroup2Code: row.sub_group2_code,
      name: row.name,
    }); // Pre-fill form data
    setShowEditModal(true); // Open the modal
  };

  // Handle Update SubGroup3
  const handleUpdate = async () => {
    try {
      await updateSubGroup3(currentSubGroup.id, editFormData); // Update backend
      setShowEditModal(false); // Close the edit modal
      setSuccessMessage('Sub Group 3 updated successfully!'); // Set success message
      setShowSuccessModal(true); // Show success modal
      performSearch(); // Refresh data
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update Sub Group 3');
    }
  };

  // Handle Search Button Click
  const handleSearch = async () => {
    await performSearch();
    setShowTable(true); // Show table after search
  };

  // Handle Filter Change
  const handleFilterChange = (e) => {
    onFilterChange(e); // Call the hook's filter change handler
    setShowTable(false); // Hide table on filter change
  };

  // Handle Delete Confirmation
  const confirmDelete = (group) => {
    setCurrentSubGroup(group);
    setShowDeleteModal(true);
  };

  // Handle Delete Sub Group 3
  const handleDeleteConfirm = async () => {
    try {
      await deleteSubGroup3(currentSubGroup.id); // Delete from backend
      setShowDeleteModal(false); // Close the modal
      performSearch(); // Refresh data
    } catch (error) {
      alert('Failed to delete Sub Group 3');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h3>Sub Group 3</h3>
        <div>
          {/* Add Sub Group Button */}
          <Button
            onClick={() => {
              setShowAddModal(true); // Open the Add modal
            }}
            variant="primary"
            className="mx-2"
          >
            Add Sub Group 3
          </Button>

          {/* Import and Export Buttons */}
          <input
            type="file"
            id="importSubGroup3"
            style={{ display: 'none' }}
            onChange={(e) => importSubGroup3(e.target.files[0]).then(() => performSearch())}
          />
          <button
            onClick={() => document.getElementById('importSubGroup3').click()}
            className="btn btn-primary mx-2"
          >
            Import
          </button>
          <button onClick={exportSubGroup3} className="btn btn-primary mx-2">
            Export
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        placeholder="Search Sub Group 3..."
        query={query}
        filter={filter}
        onQueryChange={handleQueryChange}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        filters={[
          { value: 'main_group_code', label: 'Main Group Code' },
          { value: 'sub_group1_code', label: 'Sub Group 1 Code' },
          { value: 'sub_group2_code', label: 'Sub Group 2 Code' },
          { value: 'name', label: 'Sub Group 3 Name' },
        ]}
      />

      {/* Conditional Rendering for Table */}
      {showTable ? (
        results.length > 0 ? (
          <div className="results mt-3">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Main Group Code</th>
                  <th>Sub Group 1 Code</th>
                  <th>Sub Group 2 Code</th>
                  <th>Sub Group 3 Name</th>
                  <th>Sub Group 2 Code</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={row.id}>
                    <td>{row.main_group_code}</td>
                    <td>{row.sub_group1_code}</td>
                    <td>{row.sub_group2_code}</td>
                    <td>{row.name}</td>
                    <td>{row.code}</td>
                    <td>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEditClick(row)} // Open the modal for editing
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => confirmDelete(row)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted mt-3">No results found for your search.</p>
        )
      ) : (
        <p className="text-muted mt-3">No Data</p>
      )}

      {/* Add Modal */}
      <ModalForm
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSubmit={handleAdd} // Use handleAdd for adding
      />

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Sub Group 3</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="mainGroupCode">
              <Form.Label>Main Group Code</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.mainGroupCode}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, mainGroupCode: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="subGroup1Code">
              <Form.Label>Sub Group 1 Code</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.subGroup1Code}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, subGroup1Code: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="subGroup2Code">
              <Form.Label>Sub Group 2 Code</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.subGroup2Code}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, subGroup2Code: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Sub Group 3 Name</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
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

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete Sub Group 3{' '}
            <strong>{currentSubGroup?.name}</strong>?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubGroup3;
