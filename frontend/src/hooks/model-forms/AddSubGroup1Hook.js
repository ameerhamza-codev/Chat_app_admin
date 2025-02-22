import { useState } from 'react';
import { addSubGroup1 } from '../../api/groupsApi';

const useSubGroup1Form = () => {
    const [formData, setFormData] = useState({
        mainGroupCode: '',
        name: '',
        code: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (!formData.mainGroupCode || !formData.name || !formData.code) {
            alert('All fields are required');
            return;
        }

        try {
            const response = await addSubGroup1(formData);
            alert(response.message || 'Sub Group 1 added successfully');
            setFormData({ mainGroupCode: '', name: '', code: '' });
        } catch (error) {
            console.error('Error adding Sub Group 1:', error);
            alert(error.response?.data?.error || 'Failed to add Sub Group 1');
        }
    };

    return { formData, setFormData, handleChange, handleSubmit }; // Ensure setFormData is returned
};

export default useSubGroup1Form;
