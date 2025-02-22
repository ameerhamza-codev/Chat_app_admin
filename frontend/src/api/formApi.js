import axios from 'axios';

// Base URL for Additional Responsibilities
const BASE_URL_RESP = 'http://localhost:5000/api/additional-responsibilities';
const API_BASE_URL = 'http://localhost:5000/api/responsibility-types';
const BASE_URL_INVITED_USERS = 'http://localhost:5000/api/invite';
// Base URL for Occupations (existing)
const BASE_URL_OCCUPATIONS = 'http://localhost:5000/api/occupations';

const BASE_URL_LOCATION = 'http://localhost:5000/api/locations';

const BASE_URL_JOB_DESC = 'http://localhost:5000/api/job-descriptions';

const BASE_URL_COUNTRIES = 'http://localhost:5000/api/countries';
// Add a new additional responsibility
export const submitAddRespTypeForm = async (formData) => {
    const response = await axios.post(`${BASE_URL_RESP}/add`, formData);
    return response.data;
};

// Fetch all additional responsibilities
export const fetchResponsibilities = async () => {
    const response = await axios.get(BASE_URL_RESP);
    return response.data;
};

// Search additional responsibilities (if required)
export const searchResponsibilities = async (keyword) => {
    const response = await axios.get(`${BASE_URL_RESP}/search`, { params: { keyword } });
    return response.data;
};

// Export additional responsibilities (if needed)
export const exportResponsibilities = async () => {
    const response = await axios.get(`${BASE_URL_RESP}/export`, { responseType: 'blob' });
    return response.data;
};

// Import additional responsibilities (if needed)
export const importResponsibilities = async (responsibilities) => {
    const response = await axios.post(`${BASE_URL_RESP}/import`, { responsibilities });
    return response.data;
};

// Delete an additional responsibility by ID
export const deleteResponsibility = async (id) => {
    const response = await axios.delete(`${BASE_URL_RESP}/${id}`);
    return response.data;
};

// Update an additional responsibility by ID
export const updateResponsibility = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL_RESP}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error in updateResponsibility API:', error.response || error);
        throw error;
    }
};

/* ------------------ Existing APIs for Occupations ------------------ */

// Fetch all occupations
export const fetchOccupations = async () => {
    const response = await axios.get(BASE_URL_OCCUPATIONS);
    return response.data;
};

// Add an occupation
export const addOccupation = async (formData) => {
    const response = await axios.post(`${BASE_URL_OCCUPATIONS}/add`, formData);
    return response.data;
};

// Search occupations
export const searchOccupations = async (keyword) => {
    const response = await axios.get(`${BASE_URL_OCCUPATIONS}/search`, { params: { keyword } });
    return response.data;
};

// Export occupations
export const exportOccupations = async () => {
    const response = await axios.get(`${BASE_URL_OCCUPATIONS}/export`, { responseType: 'blob' });
    return response.data;
};

// Import occupations
export const importOccupations = async (occupations) => {
    const response = await axios.post(`${BASE_URL_OCCUPATIONS}/import`, { occupations });
    return response.data;
};

// Delete an occupation by ID
export const deleteOccupation = async (id) => {
    const response = await axios.delete(`${BASE_URL_OCCUPATIONS}/${id}`);
    return response.data;
};

// Update an occupation by ID
export const updateOccupation = async (id, updatedData) => {
    if (!id || typeof id !== 'number') {
        throw new Error('Invalid ID for update');
    }
    const response = await axios.put(`${BASE_URL_OCCUPATIONS}/${id}`, updatedData);
    return response.data;
};


export const fetchLocations = async () => {
    const response = await axios.get(BASE_URL_LOCATION);
    return response.data;
  };
  
  export const submitAddLocationForm = async (formData) => {
    const response = await axios.post(`${BASE_URL_LOCATION}/add`, formData);
    return response.data;
  };
  
  export const deleteLocation = async (id) => {
    const response = await axios.delete(`${BASE_URL_LOCATION}/${id}`);
    return response.data;
  };
  
  export const exportLocations = async () => {
    const response = await axios.get(`${BASE_URL_LOCATION}/export`);
    return response.data;
  };
  
  export const importLocations = async (locations) => {
    const response = await axios.post(`${BASE_URL_LOCATION}/import`, { locations });
    return response.data;
  };
  export const editLocation = async (id, formData) => {
    const resposne = await axios.put('${BASE_URL_Location}/${id}', formData);
    return resposne.data;
  }

  // Add a new job description
export const submitAddJobDescForm = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL_JOB_DESC}`, formData);
        return response.data;
    } catch (error) {
        
        throw error;
    }
};

// Fetch all job descriptions
export const fetchJobDescriptions = async () => {
    try {
        const response = await axios.get(`${BASE_URL_JOB_DESC}?timestamp=${Date.now()}`);
        return response.data;
    } catch (error) {
        console.error('Error in fetchJobDescriptions:', error);
        throw error;
    }
};


// Update a job description by ID
export const updateJobDescription = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL_JOB_DESC}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error in updateJobDescription:', error);
        throw error;
    }
};

// Delete a job description by ID
export const deleteJobDescription = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL_JOB_DESC}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error in deleteJobDescription:', error);
        throw error;
    }
};
export const submitAddCountryForm = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL_COUNTRIES}/add`, data);
        return response.data;
    } catch (error) {
        
        throw error;
    }
};


export const fetchCountries = async () => {
    const response = await axios.get(BASE_URL_COUNTRIES);
    return response.data;
};

export const deleteCountry = async (id) => {
    const response = await axios.delete(`${BASE_URL_COUNTRIES}/delete/${id}`);
    return response.data;
};
export const addResponsibilityType = async (name) => {
    const response = await axios.post(`${API_BASE_URL}/add`, { name });
    return response.data;
};


export const fetchResponsibilityTypes = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const deleteResponsibilityType = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};
// Add an invited user
export const addInvitedUser = async (formData) => {
    try {
        console.log('Sending data to add invited user:', formData);
        const response = await axios.post(`${BASE_URL_INVITED_USERS}/invite`, formData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding invited user:', error.response || error);
        throw error;
    }
};
// Get all invited users
export const getInvitedUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL_INVITED_USERS}/invited-users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching invited users:', error.response || error);
        throw error;
    }
};
// Edit an invited user by ID
// Update an invited user by ID
export const updateInvite = async (id, data) => {
    console.log(`Updating invited user with ID: ${id}`);
    console.log('Data being sent to backend:', data);

    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
        console.error('Payload validation failed. Payload must be a non-empty object.');
        throw new Error('Invalid data. Payload must be a non-empty object.');
    }

    try {
        const response = await axios.put(`${BASE_URL_INVITED_USERS}/${id}`, data, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('Response from backend:', response.data);
        return response.data; // Return the updated user data
    } catch (error) {
        console.error('Error updating invited user:', error.response || error);
        throw error;
    }
};
// Delete an invited user by ID
// Delete an invited user by ID
export const deleteInvitedUser = async (id) => {
    try {
        console.log(`Deleting invited user with ID: ${id}`);
        const response = await axios.delete(`${BASE_URL_INVITED_USERS}/invite/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting invited user:', error.response || error);
        throw error;
    }
};
