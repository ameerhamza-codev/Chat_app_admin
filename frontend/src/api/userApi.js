import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const searchUsers = async (query, filter) => {
    try{
        console.log('Sending search request with query:', query);
    const response = await axios.get(`${API_URL}/user/search`, {
        params: { keyword: query },
        
    });
    console.log('API Response:', response.data);
    return response.data;
}catch (error){
    console.error('Error in searchUsers API:', error.message);
        throw error;
}
};


export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/user/add`, userData, {
            headers: {
                'x-access-token': localStorage.getItem('token'), // Ensure token is valid
                'Content-Type': 'application/json', // Ensure content type is set
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error in createUser API:', error);
        throw error;
    }
};
export const fetchAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/user`); // Correct endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error;
    }
};

export const getDropdownOptions = async () => {
    try {
        const mainGroupResponse = await axios.get(`${API_URL}/user/dropdown/main_Groups`);
        const subGroup1Response = await axios.get(`${API_URL}/user/dropdown/sub_Group1`);
        const subGroup2Response = await axios.get(`${API_URL}/user/dropdown/sub_Group2`);
        const subGroup3Response = await axios.get(`${API_URL}/user/dropdown/sub_Group3`);
        const subGroup4Response = await axios.get(`${API_URL}/user/dropdown/sub_Group4`);
        const countriesResponse = await axios.get(`${API_URL}/user/dropdown/countries`);
        const occupationsResponse = await axios.get(`${API_URL}/user/dropdown/occupations`);
        const citiesResponse = await axios.get(`${API_URL}/user/dropdown/locations`);

        console.log('Countries Response:', countriesResponse.data);
        console.log('Cities Response:', citiesResponse.data);

        return {
            mainGroupCodes: mainGroupResponse.data,
            subGroup1Codes: subGroup1Response.data,
            subGroup2Codes: subGroup2Response.data,
            subGroup3Codes: subGroup3Response.data,
            subGroup4Codes: subGroup4Response.data,
            workingCountries: countriesResponse.data,
            workingCities: citiesResponse.data,
            occupations: occupationsResponse.data,
        };
    } catch (error) {
        console.error('Error in getDropdownOptions:', error);
        throw error;
    }
};



export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/user/${id}`, {
        headers: { 'x-access-token': localStorage.getItem('token') }
    });
    return response.data;
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_URL}/user/${id}`, userData, {
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error in updateUser API:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/user/delete/${id}`);
        console.log("User deleted successfully:", response.data);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
export const exportUsers = async () => {
    const response = await axios.get(`${API_URL}/user/export`, {
        headers: { 'x-access-token': localStorage.getItem('token') },
        responseType: 'blob'  // This is important for file downloads
    });
    return response.data;
};
export const inviteUser = async (userData) => {
    const response = await axios.post(`${API_URL}/user/invite`, userData, {
        headers: { 'x-access-token': localStorage.getItem('token') }
    });
    return response.data;
};
export const fetchInvitedUsers = async () => {
    const response = await axios.get(`${API_URL}/user/invited`, {
        headers: { 'x-access-token': localStorage.getItem('token') }
    });
    return response.data;
};
export const deleteInvitedUser = async (id) => {
    const response = await axios.delete(`${API_URL}/user/invited/${id}`, {
        headers: { 'x-access-token': localStorage.getItem('token') }
    });
    return response.data;
};

