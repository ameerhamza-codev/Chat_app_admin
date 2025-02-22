import { useState } from 'react';
import { submitAddRespTypeForm } from '../../api/formApi';

const useAdditionalRespForm = () => {
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        type: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (formData, refreshList) => {
        try {
            await submitAddRespTypeForm(formData);
            alert('Responsibility added successfully!');
            refreshList();
            setFormData({ code: '', name: '', type: '' });
        } catch (error) {
            // If the server responded with a status code, check if it's the 409 we set on the backend
            if (error.response && error.response.status === 409) {
                alert(error.response.data.error); 
            } else {
                alert('An error occurred while adding responsibility');
            }
            console.error('Error submitting form:', error);
        }
    };
    

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};

export default useAdditionalRespForm;
