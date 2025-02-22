import { useState } from 'react';
import axios from 'axios';

const useMainGroupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        code: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log('Updated Field:', name, '=', value); // Log field updates
    };

    const handleSubmit = async () => {
        console.log('Submitting Form Data:', formData); // Log the data being submitted
        try {
            const response = await axios.post('http://localhost:5000/api/main-group/add', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            console.log('Response:', response.data);
            alert(response.data.message);
    
            // Fetch the updated list of Main Groups (if applicable)
           
        } catch (error) {
            console.error('Form submission failed:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Failed to add Main Group. Please try again.');
        }
    };
    
    return {
        formData,
        handleChange,
        handleSubmit
    };
};

export default useMainGroupForm;
