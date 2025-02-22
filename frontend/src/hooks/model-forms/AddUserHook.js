import { useState, useEffect } from 'react';
import { createUser, updateUser, getDropdownOptions } from '../../api/userApi';
import axios from 'axios';


const useUserForm = (callback) => {
    const [formData, setFormData] = useState({
        mainGroupCode: '',
        subGroup1Code: '',
        subGroup2Code: '',
        subGroup3Code: '',
        subGroup4Code: '',
        name: '',
        fatherName: '',
        displayName: '',
        DOB: '',
        landline: '',
        companyName: '',
        workingCountry: '',
        workingCity: '',
        occupation: '',
        email: '',
        mobile: '',
        gender: 'Male',
        password: '',
        referToFriend: false, // New Field
        groupCode: false, // New Field
        subGroup1Representative: false, // New Field
        subGroup2Representative: false, // New Field
        subGroup3Representative: false, // New Field
        subGroup4Representative: false, // New Field
    });
    const [editUserId, setEditUserId] = useState(null);
    const [dropdownOptions, setDropdownOptions] = useState({
        mainGroupCodes: [],
        subGroup1Codes: [],
        subGroup2Codes: [],
        subGroup3Codes: [],
        subGroup4Codes: [],
        workingCountries: [],
        workingCities: [],
        occupations: [],
    });

    

    useEffect(() => {
        const fetchDropdownOptions = async () => {
            try {
                const options = await getDropdownOptions();
                setDropdownOptions(options);
            } catch (error) {
                console.error('Error fetching dropdown options:', error);
                setDropdownOptions({
                    mainGroupCodes: [],
                    subGroup1Codes: [],
                    subGroup2Codes: [],
                    subGroup3Codes: [],
                    subGroup4Codes: [],
                    workingCountries: [],
                    workingCities: [],
                    occupations: [],
                });
            }
        };
        fetchDropdownOptions();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            // Prepare the user data from form state
    const userData = {
        mainGroupCode: formData.mainGroupCode || null,  // Allow null if empty
        subGroup1Code: formData.subGroup1Code || null,  // Allow null if empty
        subGroup2Code: formData.subGroup2Code || null,  // Allow null if empty
        subGroup3Code: formData.subGroup3Code || null,  // Allow null if empty
        subGroup4Code: formData.subGroup4Code || null,  // Allow null if empty
        displayName: formData.displayName || null,      // Allow null if empty
        DOB: formData.DOB || null,                      // Allow null if empty
        companyName: formData.companyName || null,      // Allow null if empty
        landline: formData.landline || null,            // Allow null if empty
        name: formData.name || null, 
        email: formData.email || null, 
        mobile: formData.mobile || null, // Ensure this field has value
    };
 
    // Validate if the mandatory fields are provided (if applicable)
    if (!userData.name || !userData.email || !userData.mobile) {
        alert('Please fill in all mandatory fields!');
        return; // Prevent form submission if mandatory fields are empty
    }

    // Proceed with form submission (API call, etc.)
    //try {
      //  await axios.post('/api/add-user', userData);
        //console.log('User added successfully');
    //} catch (error) {
      //  console.error('Error adding user:', error);
    //}
    
            const { confirmPassword, ...formattedFormData } = {
                ...formData,
                DOB: formData.DOB ? formData.DOB.split("T")[0] : null,
                refer_to_friend: formData.referToFriend, // Map frontend to backend field
                group_code: formData.groupCode,
                sub_group1_representative: formData.subGroup1Representative,
                sub_group2_representative: formData.subGroup2Representative,
                sub_group3_representative: formData.subGroup3Representative,
                sub_group4_representative: formData.subGroup4Representative,
            };
    
            if (editUserId) {
                // If edit mode, update the user
                console.log('Updating user with ID:', editUserId);
                await updateUser(editUserId, formattedFormData);
            } else {
                // If add mode, create a new user
                console.log('Adding new user');
                await createUser(formattedFormData);
            }
    
            callback(); // Call the parent callback to close modal and refresh list
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    return {
        formData,
        handleChange,
        handleSubmit,
        setEditUserId,
        dropdownOptions,
        setFormData,
        
    };
};

export default useUserForm;
