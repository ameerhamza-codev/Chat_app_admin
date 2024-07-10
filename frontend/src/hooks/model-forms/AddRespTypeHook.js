import { useState } from 'react';
import { submitAddRespTypeForm } from '../../api/formApi';
const useAddRespTypeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await submitAddRespTypeForm(formData);
            // Handle successful form submission (e.g., show success message, reset form)
        } catch (error) {
            console.error('Form submission failed', error);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit
    };
};

export default useAddRespTypeForm;
