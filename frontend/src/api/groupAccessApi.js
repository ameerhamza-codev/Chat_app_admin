import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/group-access'; // Update this if your backend is running on a different URL or port

export const fetchGroupAccess = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching group access:', error);
    throw error;
  }
};

export const saveGroupAccess = async (userId, accessLevels) => {
  try {
    const accessLevelIds = accessLevels.map(level => level.id); // Extract only IDs

    const response = await axios.post(API_BASE_URL, {
      userId,
      accessLevelIds, // Now correctly formatted
    });

    return response.data;
  } catch (error) {
    console.error('Error saving group access:', error.response?.data || error.message);
    throw error;
  }
};

