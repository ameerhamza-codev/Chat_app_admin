import axios from 'axios';

const API_URL = 'http://localhost:3306/api';

export const submitAddRespTypeForm = async (data) => {
    const response = await axios.post(`${API_URL}/addresptype/submit`, data);
    return response.data;
};
