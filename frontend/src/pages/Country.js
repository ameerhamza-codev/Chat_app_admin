import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ModalForm from '../components/Form Models/AddCountryForm';
import useCountryForm from '../hooks/model-forms/AddCountryHook';
import { fetchCountries, deleteCountry } from '../api/formApi'; // Ensure deleteCountry API function exists

const Country = () => {
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [countries, setCountries] = useState([]);
    const [countryToDelete, setCountryToDelete] = useState(null);

    const { formData, handleChange, handleSubmit } = useCountryForm();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleShowDeleteModal = (country) => {
        setCountryToDelete(country);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setCountryToDelete(null);
        setShowDeleteModal(false);
    };

    const handleDelete = async () => {
        if (countryToDelete) {
            try {
                await deleteCountry(countryToDelete.id); // Call API to delete the country
                setCountries((prevCountries) =>
                    prevCountries.filter((c) => c.id !== countryToDelete.id)
                );
            } catch (error) {
                console.error('Error deleting country:', error.response || error);
            } finally {
                handleCloseDeleteModal();
            }
        }
    };

    const loadCountries = async () => {
        try {
            const response = await fetchCountries();
            setCountries(response);
        } catch (error) {
            console.error('Error fetching countries:', error.response || error);
        }
    };

    const handleAddCountry = async (formData) => {
        try {
          await handleSubmit(formData); // This calls submitAddCountryForm
          setShowSuccessModal(true); 
          loadCountries();
        } catch (error) {
          if (error.response && error.response.status === 409) {
            alert('Country already exists. Please use a different name.');
          } else {
            console.error('Error adding country:', error);
            alert('Something went wrong while adding country.');
          }
        } finally {
          handleClose(); 
        }
      };
      

    useEffect(() => {
        loadCountries();
    }, []);

    return (
        <div>
            <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
                <h3>Country</h3>
                <Button
                    variant="primary"
                    className="btn btn-primary mx-2"
                    onClick={handleShow}
                >
                    Add Country
                </Button>

                <ModalForm
                    show={showModal}
                    handleClose={handleClose}
                    handleSubmit={handleAddCountry}
                />
            </div>
            <div className="m-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map((country) => (
                            <tr key={country.id}>
                                <td>{country.id}</td>
                                <td>{country.name}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleShowDeleteModal(country)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Country added successfully!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete{' '}
                    <strong>{countryToDelete?.name}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Country;
