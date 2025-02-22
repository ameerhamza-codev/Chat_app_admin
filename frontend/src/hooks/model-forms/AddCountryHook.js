import { useState } from 'react';
import { submitAddCountryForm } from '../../api/formApi';

const useCountryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (formData) => {
        try {
            const response = await submitAddCountryForm(formData);
            console.log('Country added:', response.message);
         
        }catch (error) {
                if (error.response && error.response.status === 409) {
                  alert('This country already exists. Please try a different name.');
                } else {
                  console.error('Form submission failed:', error);
                  alert('Failed to add country.');
                }
              }
              
    };
    

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};

export default useCountryForm;
