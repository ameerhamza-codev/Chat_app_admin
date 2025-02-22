import { useState } from 'react';
import { submitAddJobDescForm, getAllJobDescriptions } from '../../api/formApi';

const useAddJobDescForm = () => {
    const [formData, setFormData] = useState({ name: '' });
    const [jobDescriptions, setJobDescriptions] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   // useAddJobDescForm.js (example)
const handleSubmit = async (data) => {
    try {
      await submitAddJobDescForm(data);  // API call
      await fetchJobDescriptions();       // refresh list
    } catch (error) {
      console.log('Inside handleSubmit catch block:', error);
  
      // Make sure we’re checking error.response.status
      if (error.response && error.response.status === 409) {
        alert('This job description already exists. Please try a different name.');
      } else {
        alert('Something went wrong while adding job description.');
      }
    }
  };
  
      
      

    const fetchJobDescriptions = async () => {
        try {
            const response = await getAllJobDescriptions(); // Fetch data from backend
            setJobDescriptions(response.data);
        } catch (error) {
            console.error('Error fetching job descriptions:', error);
        }
    };

    return {
        formData,
        jobDescriptions,
        handleChange,
        handleSubmit,
        fetchJobDescriptions,
    };
};

export default useAddJobDescForm;
