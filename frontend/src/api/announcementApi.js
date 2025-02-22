import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust according to your backend URL

// Fetch all announcements
export const getAnnouncements = async () => {
    try {
        const response = await axios.get(`${API_URL}/announcements`);
        return response.data.announcements;
    } catch (error) {
        console.error('Error fetching announcements:', error);
        return [];
    }
};

// Add a new announcement
export const addAnnouncement = async (content) => {
    try {
        const response = await axios.post(`${API_URL}/announcements`, { content });
        return response.data;
    } catch (error) {
        console.error('Error adding announcement:', error);
        throw error;
    }
};
