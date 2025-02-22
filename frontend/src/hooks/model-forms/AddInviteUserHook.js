import { useState } from 'react';
import { addInvitedUser, editInvitedUser , updateInvite} from '../../api/formApi';
import { fetchSubGroup2, searchSubGroup3, searchSubGroup4 } from '../../api/groupsApi';

const useInvitedUserForm = (callback) => {
    const [formData, setFormData] = useState({
        mainGroupCode: '',
        subGroup1Code: '',
        subGroup2Code: '',
        subGroup3Code: '',
        subGroup4Code: '',
        name: '',
        email: '',
        mobile: '',
        gender: 'Male',
        additionalResponsibility: '',
        referrer: false,
    });

    const setFormValues = (data) => {
        setFormData(data);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const loadDependentDropdowns = async (level) => {
        try {
            if (level === 'subGroup2') {
                const subGroup2 = await fetchSubGroup2(formData.mainGroupCode, formData.subGroup1Code);
                setFormData((prev) => ({ ...prev, subGroup2: subGroup2 || [] }));
            } else if (level === 'subGroup3') {
                const subGroup3 = await searchSubGroup3(formData.subGroup2Code, 'code');
                setFormData((prev) => ({ ...prev, subGroup3: subGroup3 || [] }));
            } else if (level === 'subGroup4') {
                const subGroup4 = await searchSubGroup4(formData.subGroup3Code, 'code');
                setFormData((prev) => ({ ...prev, subGroup4: subGroup4 || [] }));
            }
        } catch (error) {
            console.error(`Error loading ${level}:`, error);
        }
    };

     // Convert empty/"Select"/undefined to null for the group codes
     const transformEmptyToNull = (value) => {
        if (!value || value === 'Select' || (typeof value === 'string' && !value.trim())) {
            return null;
        }
        return value;
    };

    const handleSubmit = async (isEditMode, userId = null) => {
        console.log('Form Data Before Submit:', formData); // Debug log

        if (!formData || typeof formData !== 'object' || Object.keys(formData).length === 0) {
            console.error('Payload validation failed. Payload must be a non-empty object.');
            return; // Prevent further execution if formData is invalid
        }

        // Transform the group codes to null if empty
        const transformedData = {
            ...formData,
            mainGroupCode: transformEmptyToNull(formData.mainGroupCode),
            subGroup1Code: transformEmptyToNull(formData.subGroup1Code),
            subGroup2Code: transformEmptyToNull(formData.subGroup2Code),
            subGroup3Code: transformEmptyToNull(formData.subGroup3Code),
            subGroup4Code: transformEmptyToNull(formData.subGroup4Code),
        };

        try {
            if (isEditMode) {
                console.log(`Editing user with ID: ${userId}`);
                await updateInvite(userId, transformedData); // Call the API to update
            } else {
                console.log('Adding new user:', transformedData);
                await addInvitedUser(transformedData); // Call the API to create
            }

            callback(); // Refresh list or close modal
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };
    
    
    
    

    return {
        formData,
        setFormValues,
        handleChange,
        handleSubmit,
        loadDependentDropdowns,
    };
};

export default useInvitedUserForm;
