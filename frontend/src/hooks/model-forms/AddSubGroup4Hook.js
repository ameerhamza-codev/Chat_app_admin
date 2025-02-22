import { useState } from 'react';
import { addSubGroup4 } from '../../api/groupsApi';

const useSubGroup4Form = () => {
    const [formData, setFormData] = useState({
        mainGroupCode: '',
        subGroup1Code: '',
        subGroup2Code: '',
        subGroup3Code: '',
        name: '',
        code: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.trim(), // Ensure no empty strings
        }));
    };

    const handleSubmit = async (formData) => {
        try {
            console.log('Form Data Sent to Backend:', formData); // Debugging
            await addSubGroup4(formData);
           
        } catch (error) {
            console.error('Error adding Sub Group 4:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Failed to add Sub Group 4');
        }
    };
    

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};

export default useSubGroup4Form;
