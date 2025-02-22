import React, { useEffect, useState, useCallback } from "react";
import useSearchSubGroup2 from "../hooks/groups/searchSubGroup2Hook";
import SearchBar from "../components/Searchbar";
import { colors } from "../utils/colors";
import { Button, Table, Modal, Alert } from "react-bootstrap";
import AddSubGroup2Form from "../components/Form Models/AddSubGroup2Form";
import useSubGroup2Form from "../hooks/model-forms/AddSubGroup2Hook";
import {
  exportSubGroup2,
  importSubGroup2,
  deleteSubGroup2,
  updateSubGroup2,
  addSubGroup2,
} from "../api/groupsApi";

const SubGroup2 = () => {
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
  } = useSearchSubGroup2();

  const filters = [
    { value: "mainGroupCode", label: "Main Group Code" },
    { value: "subGroup1Code", label: "Sub Group 1 Code" },
    { value: "name", label: "Sub Group 2 Name" },
  ];

  const [showModal, setShowModal] = useState(false); // For Add/Edit Modal
  const [alertModal, setAlertModal] = useState(false); // For Delete Confirmation Modal
  const [alertMessage, setAlertMessage] = useState(""); // For Success Alerts
  const [selectedItem, setSelectedItem] = useState(null); // For Selected Item (Edit/Delete)
  const [isSearchPerformed, setIsSearchPerformed] = useState(false); // To Show Table Only After Search
  const [editSuccessModal, setEditSuccessModal]  = useState(false); // Edit success modal
  const [successModal, setSuccessModal] = useState(false);
  const { formData, handleChange, setFormData } = useSubGroup2Form();

  const handleShowAdd = () => {
    setFormData({
      mainGroupCode: "",
      subGroup1Code: "",
      name: "",
      code: "",
    });
    setShowModal(true);
  };

  // Open the edit modal with required data only
const handleShowEdit = (item) => {
  setFormData({
    id: item.id, // Include ID for backend reference
    mainGroupCode: item.main_group_code, // Populate Main Group Code
    subGroup1Code: item.sub_group1_code, // Populate Sub Group 1 Code
    name: item.name, // Populate Sub Group 2 Name
  });
  setSelectedItem(item); // Keep the full item for reference
  setShowModal(true); // Show the modal
};


  const handleCloseModal = () => setShowModal(false);

  const handleAdd = async (e) => {
    e.preventDefault();
  
    // Validation for required fields
    if (!formData.name || !formData.mainGroupCode || !formData.subGroup1Code || !formData.code) {
      alert("All fields are required!");
      return;
    }
  
    try {
      // API call to add the new Sub Group 2
      await addSubGroup2(formData);
  
      // Reset the form data
      setFormData({
        mainGroupCode: "",
        subGroup1Code: "",
        name: "",
        code: "",
      });
  
      // Close the Add modal
      setShowModal(false);
  
      // Show a success alert/modal if needed
      setSuccessModal(true); // Optional: You can add a success modal
    } catch (error) {
      console.error("Error adding Sub Group 2:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to add Sub Group 2.");
    }
  };
  
  
  // Close success modal
  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
  };
  
  
  // Handle Edit Functionality
  const handleEdit = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.mainGroupCode || !formData.subGroup1Code) {
      alert("All fields are required!");
      return;
    }
  
    try {
      const updatedData = {
        id: formData.id,
        mainGroupCode: formData.mainGroupCode,
        subGroup1Code: formData.subGroup1Code,
        name: formData.name, // Only required fields
      };
  
      console.log("Sending Update Sub Group 2 Data:", updatedData); // Debug log
  
      const updatedItem = await updateSubGroup2(updatedData); // Call API
      setResults((prevResults) =>
        prevResults.map((item) =>
          item.id === updatedItem.id ? { ...item, ...updatedItem } : item
        )
      );
  
      setShowModal(false); // Close edit form modal
      setEditSuccessModal(true); // Show edit success modal
    } catch (error) {
      console.error("Error updating Sub Group 2:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to update Sub Group 2.");
    }
  };
  
  
  
  
  

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      await deleteSubGroup2(selectedItem.id);
      setResults((prevResults) =>
        prevResults.filter((item) => item.id !== selectedItem.id)
      );
      
      setAlertModal(false);
      setSelectedItem(null);
      setSuccessModal(true)
    } catch (error) {
      console.error("Error deleting Sub Group 2:", error);
    }
  };

  const handleExport = async () => {
    try {
      await exportSubGroup2();
      alert("Data exported successfully!");
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  const handleImport = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) {
        alert("Please select a file to import!");
        return;
      }
      await importSubGroup2(file);
      handleSearch(); // Refresh results after importing
      alert("Data imported successfully!");
    } catch (error) {
      console.error("Error importing data:", error.response?.data || error.message);
      alert("Error importing data. Please check the file format.");
    }
  };

  const handleSearchWithTracking = () => {
    setIsSearchPerformed(true);
    handleSearch();
  };

  useEffect(() => {
    setIsSearchPerformed(false); // Reset search state on component load
  }, []);

  return (
    <div>
      <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
        <h3>Sub Group 2</h3>
        <div>
          <Button
            variant="primary"
            style={{ backgroundColor: colors.secondary }}
            onClick={handleShowAdd}
          >
            Add Sub Group 2
          </Button>
          <Button
            variant="success"
            style={{ backgroundColor: colors.secondary }}
            className="mx-2"
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            className="btn btn-primary"
            style={{ backgroundColor: colors.secondary }}
            onClick={() => document.getElementById("import-file-input").click()}
          >
            Import
          </Button>
          <input
            type="file"
            id="import-file-input"
            style={{ display: "none" }}
            onChange={handleImport}
            accept=".csv, .xlsx"
          />
        </div>
      </div>

      {alertMessage && (
        <Alert
          variant="success"
          onClose={() => setAlertMessage("")}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}

      <SearchBar
        placeholder="Search..."
        query={query}
        filter={filter}
        onQueryChange={handleQueryChange}
        onFilterChange={handleFilterChange}
        onSearch={handleSearchWithTracking}
        filters={filters}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && results.length === 0 && <p>No Data</p>} {/* Show "No Data" when results are empty */}
      {results.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Main Group Code</th>
              <th>Sub Group 1 Code</th>
              <th>Sub Group 2 Name</th>
              <th>Sub Group 2 Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.id}>
                <td>{item.main_group_code}</td>
                <td>{item.sub_group1_code}</td>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() => handleShowEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setSelectedItem(item);
                      setAlertModal(true);
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

      {!loading && isSearchPerformed && results.length === 0 && (
        <p>No results found for the given search criteria.</p>
      )}

<AddSubGroup2Form
  show={showModal}
  handleClose={handleCloseModal}
  handleSubmit={selectedItem ? handleEdit : handleAdd} // Differentiate add and edit
  formData={formData}
  handleChange={handleChange}
  actionType={selectedItem ? "edit" : "add"}
/>;
 {/* Success Modal */}
 <Modal show={successModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sub Group 2 added successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
 {/* Edit Success Modal */}
 <Modal show={editSuccessModal} onHide={() => setEditSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sub Group 2 updated successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Deleted model */}
      <Modal show={successModal} onHide={() => setSuccessModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Success</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Sub Group 2 deleted successfully!</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setSuccessModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

      <Modal show={alertModal} onHide={() => setAlertModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete "{selectedItem?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAlertModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubGroup2;
