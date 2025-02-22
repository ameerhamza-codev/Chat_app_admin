import React, { useState, useEffect, useRef } from 'react';
import { Button, Table } from 'react-bootstrap';
import AddLocationForm from '../components/Form Models/AddLocationForm';
import {
  fetchLocations,
  submitAddLocationForm,
  deleteLocation,
  exportLocations,
  importLocations,
  editLocation,
} from '../api/formApi';
import { colors } from '../utils/colors';

const Location = () => {
  const [showModal, setShowModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [editData, setEditData] = useState(null);
  const fileInputRef = useRef(null); // Ref for the file input element

  // Fetch all locations from the backend
  const fetchAllLocations = async () => {
    try {
      const data = await fetchLocations();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    fetchAllLocations();
  }, []);

  // Handle show modal for add/edit
  const handleShow = (location = null) => {
    setEditData(location);
    setShowModal(true);
  };

  // Handle close modal
  const handleClose = () => {
    setShowModal(false);
    setEditData(null); // Reset the edit data after closing
  };

  // Location.js
const handleAddOrEditLocation = async (formData) => {
  try {
    if (editData) {
      // If editData exists, update the location
      await editLocation(editData.id, formData);
    } else {
      // Otherwise, add a new location
      await submitAddLocationForm(formData);
    }
    // If successful:
    fetchAllLocations();
    alert('Location saved successfully!');
    handleClose();
  } catch (error) {
    console.error('Error saving location:', error);

    if (error.response) {
      if (error.response.status === 409) {
        // <-- Duplicate entry alert
        alert(error.response.data.error); 
      } else {
        alert('Failed to save location. Server responded with status ' + error.response.status);
      }
    } else {
      alert('Unable to reach server. Please try again later.');
    }
  }
};


  // Handle delete location
  const handleDelete = async (id) => {
    try {
      await deleteLocation(id);
      fetchAllLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  // Handle export locations
  const handleExport = async () => {
    try {
      const data = await exportLocations();
      if (!Array.isArray(data)) {
        throw new Error('Expected data to be an array');
      }
      const headers = Object.keys(data[0]).join(','); // Create the header row
      const rows = data.map(row => 
        Object.values(row).map(value => 
          `"${String(value).replace(/"/g, '""')}"` // Escape double quotes
        ).join(',')
      );
      const csvContent = [headers, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'locations.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting locations:', error);
    }
  };
  


  // Handle import button click
  const handleImportClick = () => {
    fileInputRef.current.click(); // Trigger hidden file input
  };

  // Handle import locations
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const importedData = JSON.parse(event.target.result);
        await importLocations(importedData);
        fetchAllLocations();
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Error importing locations:', error);
    }
  };

  return (
    <div>
      <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
        <h3>Location</h3>
        <div>
          <Button
            variant="primary"
            className="btn btn-primary"
            style={{ backgroundColor: colors.secondary }}
            onClick={() => handleShow()}
          >
            Add Location
          </Button>
          <AddLocationForm
            show={showModal}
            handleClose={handleClose}
            handleSubmit={handleAddOrEditLocation}
            editData={editData}
          />
          <Button
            className="btn btn-primary mx-2"
            style={{ backgroundColor: colors.secondary }}
            onClick={handleImportClick}
          >
            Import
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".json"
            onChange={handleImport}
          />
          <Button
            className="btn btn-primary"
            style={{ backgroundColor: colors.secondary }}
            onClick={handleExport}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="m-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id}>
                <td>{location.code}</td>
                <td>{location.name}</td>
                <td>
                  <Button
                    className="btn btn-warning mx-2"
                    onClick={() => handleShow(location)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn btn-danger"
                    onClick={() => handleDelete(location.id)}
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

export default Location;
