import { useState } from 'react';
import { submitAddLocationForm } from '../../api/formApi';
const useLocationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
 
    const handleSubmit = async () => {
        try {
          // 1) POST the form data
          await submitAddLocationForm(formData);
    
          // 2) If successful:
          alert('Location added successfully!');
          // Reset form or do whatever you need:
          setFormData({ name: '', code: '' });
        } catch (error) {
          console.error('Error saving location:', error);
    
          // 3) If there's an error response from the server:
          if (error.response) {
            // If the status is 409, it's a duplicate
            if (error.response.status === 409) {
              alert(error.response.data.error);
            } else {
              alert('Failed to save location. Server responded with status ' + error.response.status);
            }
          } else {
            // If there's no response object, it may be a network or CORS error
            alert('Unable to reach server. Please try again later.');
          }
        }
      };
    

    return {
        formData,
        handleChange,
        handleSubmit
    };
};

export default useLocationForm;
