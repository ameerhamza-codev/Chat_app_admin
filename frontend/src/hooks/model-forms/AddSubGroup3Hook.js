import { useState } from 'react';
import { addSubGroup3 } from '../../api/groupsApi';  // Only need to import the API function

const useSubGroup3Form = () => {
    const [formData, setFormData] = useState({
        mainGroupCode: '',
        subGroup1Code: '',
        subGroup2Code: '',
        name: '',
        code: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return {
        formData,
        loading,
        handleChange
    };
};

export default useSubGroup3Form;
