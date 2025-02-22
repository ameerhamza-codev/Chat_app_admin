import axios from 'axios';



const API_URL = 'http://localhost:5000/api';
export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
};


export const logout = async () => {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response;
};