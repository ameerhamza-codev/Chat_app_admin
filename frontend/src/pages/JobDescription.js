import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
    fetchJobDescriptions,
    submitAddJobDescForm,
    deleteJobDescription,
    updateJobDescription,
} from '../api/formApi';
import ModalForm from '../components/Form Models/AddJobDescForm';

const JobDescription = () => {
    const [jobDescriptions, setJobDescriptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false); // Track whether we're editing
    const [editData, setEditData] = useState({ id: null, name: '' }); // Data for the edit form

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchJobDescriptions();
                setJobDescriptions(data);
            } catch (error) {
                console.error('Error fetching job descriptions:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddJobDescription = async (formData) => {
        try {
          const newJobDescription = await submitAddJobDescForm(formData);
          setJobDescriptions((prev) => [...prev, newJobDescription]);
          setShowModal(false);
        } catch (error) {
          // This is where you check if it's a duplicate
          if (error.response && error.response.status === 409) {
            alert('This job description already exists!');
          } else {
            console.error('Error adding job description:', error);
            alert('Something went wrong while adding job description.');
          }
        }
      };
      

    const handleEditClick = (id, name) => {
        setIsEdit(true); // Set to edit mode
        setEditData({ id, name }); // Set the data to be edited
        setShowModal(true); // Open the modal
    };

    const handleEditSave = async (formData) => {
        try {
            const updatedJobDescription = await updateJobDescription(editData.id, formData);
            setJobDescriptions((prev) =>
                prev.map((desc) =>
                    desc.id === editData.id ? updatedJobDescription : desc
                )
            );
            setIsEdit(false); // Exit edit mode
            setShowModal(false); // Close the modal
        } catch (error) {
            console.error('Error saving job description:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteJobDescription(id);
            setJobDescriptions((prev) => prev.filter((desc) => desc.id !== id));
        } catch (error) {
            console.error('Error deleting job description:', error);
        }
    };

    return (
        <div>
            <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
                <h3>Job Description</h3>
                <Button
                    variant="primary"
                    onClick={() => {
                        setIsEdit(false); // Set to add mode
                        setShowModal(true); // Open the modal
                    }}
                >
                    Add Job Description
                </Button>
            </div>

            {/* Modal Form */}
            <ModalForm
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSubmit={isEdit ? handleEditSave : handleAddJobDescription}
                initialData={isEdit ? editData : { name: '' }} // Pass initial data for editing
            />

            <table className="table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobDescriptions.map((desc) => (
                        <tr key={desc.id}>
                            <td>{desc.id}</td>
                            <td>{desc.name}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => handleEditClick(desc.id, desc.name)}
                                    className="mx-1"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(desc.id)}
                                >
                                    Delete 
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobDescription;
