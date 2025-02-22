import { useState } from 'react';
import { submitAddRespTypeForm } from '../../api/formApi';

const useOccupationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (formData) => {
        return await submitAddRespTypeForm(formData); // Return response from the API
    };

    return {
        formData,
        handleChange,
        handleSubmit
    };
};

export default useOccupationForm;
