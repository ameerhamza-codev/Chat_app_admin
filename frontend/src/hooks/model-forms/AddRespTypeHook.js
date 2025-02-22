import { useState } from 'react';
import { addResponsibilityType } from '../../api/formApi';

const useAddRespTypeForm = (refreshList) => {
    const [formData, setFormData] = useState({ name: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            // Validation: Check if name is provided
            if (!formData.name.trim()) {
                setError('Responsibility type name is required.');
                setSuccess('');
                return;
            }

            // API Call to add responsibility type
            const response = await addResponsibilityType(formData.name.trim());
            const successMessage =
                response?.data?.message || 'Responsibility type added successfully!';
            setSuccess(successMessage);

            // Reset form & refresh list
            setFormData({ name: '' });
            setError('');
            refreshList();
        } catch (err) {
            console.error('Form submission failed:', err);

            // Handle error response
            const status = err?.response?.status;
            if (status === 409) {
                setError('Responsibility type already exists. Please use a different name.');
            } else {
                setError('Failed to add responsibility type. Please try again.');
            }
            setSuccess('');
        }
    };

    return { formData, handleChange, handleSubmit, error, success };
};

export default useAddRespTypeForm;
