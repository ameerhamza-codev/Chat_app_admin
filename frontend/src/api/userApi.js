import axios from 'axios';

const API_URL = 'http://localhost:3306/api';

export const searchUsers = async (query, filter) => {
    const response = await axios.get(`${API_URL}/users/search`, {
        params: { q: query, filter: filter }
    });
    return response.data;
};