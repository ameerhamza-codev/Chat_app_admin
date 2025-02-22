import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getMainGroups = async (query, filter) => {
    const response = await axios.get(`${API_URL}/groups/main-groups`, {
        params: { q: query, filter: filter }
    });
    return response.data;
};

export const searchSubGroup1 = async (query, filter) => {
    const response = await axios.get(`${API_URL}/groups/subgroup1/search`, {
        params: { q: query, filter: filter }
    });
    return response.data;
};

export const searchSubGroup2 = async (query, filter) => {
    const response = await axios.get(`${API_URL}/groups/subgroup2/search`, {
        params: { q: query, filter: filter }
    });
    return response.data;
};

export const searchSubGroup3 = async (query, filter) => {
    const response = await axios.get(`${API_URL}/groups/subgroup3/search`, {
        params: { q: query, filter: filter }
    });
    return response.data;
};

export const searchSubGroup4 = async (query, filter) => {
    const response = await axios.get(`${API_URL}/groups/subgroup4/search`, {
        params: { q: query, filter: filter }
    });
    return response.data;
};

export const searchSubGroup5 = async (query, filter) => {
    const response = await axios.get(`${API_URL}/groups/subgroup5/search`, {
        params: { q: query, filter: filter }
    });
    return response.data;
};