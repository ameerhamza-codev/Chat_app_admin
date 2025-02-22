import axios from 'axios';


// Base URLs
const MAIN_GROUP_API_URL = 'http://localhost:5000/api/main-group';
const SUB_GROUP1_API_URL = 'http://localhost:5000/api/group1';
const SUB_GROUP2_API_URL = 'http://localhost:5000/api/sub-group2';
const SUB_GROUP3_API_URL = 'http://localhost:5000/api/sub-group3';
const SUB_GROUP4_API_URL = 'http://localhost:5000/api/sub-group4';
// Main Group APIs
export const getMainGroups = async () => {
    try {
        const response = await axios.get(`${MAIN_GROUP_API_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching main groups:', error.response?.data || error.message);
        throw error;
    }
};
// Delete Main Group
export const deleteMainGroup = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/main-group/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Main Group:', error.message);
        throw error;
    }
};

// Sub Group 1 APIs
export const addSubGroup1 = async (formData) => {
    try {
        const response = await axios.post(`${SUB_GROUP1_API_URL}/add`, formData);
        return response.data;
    } catch (error) {
        console.error('Error adding Sub Group 1:', error.response?.data || error.message);
        throw error;
    }
};

export const searchSubGroup1 = async (query, filter) => {
    try {
        const response = await axios.get(`${SUB_GROUP1_API_URL}/search`, {
            params: { query: query || '', filter: filter || 'code' },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching Sub Group 1:', error.response?.data || error.message);
        throw error;
    }
};

export const importSubGroup1 = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${SUB_GROUP1_API_URL}/import`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error importing Sub Group 1:', error.response?.data || error.message);
        throw error;
    }
};

export const exportSubGroup1 = async () => {
    try {
        const response = await axios.get(`${SUB_GROUP1_API_URL}/export`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sub_group1.csv');
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Error exporting Sub Group 1:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteSubGroup1 = async (id) => {
    try {
        const response = await axios.delete(`${SUB_GROUP1_API_URL}/${id}`); // Correct the URL
        return response.data;
    } catch (error) {
        console.error('Error deleting Sub Group 1:', error);
        throw error.response?.data || 'Failed to delete Sub Group 1';
    }
};
export const updateSubGroup1 = async (formData) => {
    try {
        // Use `formData.id` for the URL and send the rest of the data in the request body
        //const response = await axios.put(`${SUB_GROUP1_API_URL}/${formData.id}`, formData);
        const response = await axios.put(`${SUB_GROUP1_API_URL}/${formData.id}`, {
            mainGroupCode: formData.mainGroupCode,
            name: formData.name,
            code: formData.code,
        });
        return response.data;
    } catch (error) {
         // Log detailed error for debugging
         console.error('Error updating Sub Group 1:', error.response?.data || error.message);
         throw error.response?.data?.error || 'Failed to update Sub Group 1';
    }
};
// Sub Group 2 APIs
export const addSubGroup2 = async (formData) => {
    console.log("Sending Add Sub Group 2 Data:", formData);
    try {
      const response = await axios.post(`${SUB_GROUP2_API_URL}/add`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error adding Sub Group 2:",
        error.response?.data || error.message
      );
      // Log full error details for debugging
      console.error("Full error response:", error.response);
      throw error.response?.data?.error || "Failed to add Sub Group 2";
    }
  };
export const searchSubGroup2 = async (query, filter) => {
    try {
        const response = await axios.get(`${SUB_GROUP2_API_URL}/search`, {
            params: { query: query || '', filter: filter || 'name' }, // Adjusted default filter
        });
        return response.data;
    } catch (error) {
        console.error('Error searching Sub Group 2:', error.response?.data || error.message);
        throw error;
    }
};
export const fetchSubGroup2 = async (mainGroupCode, subGroup1Code) => {
    try {
        console.log('Fetching Sub Group 2:', { mainGroupCode, subGroup1Code });
        const response = await axios.get(`${SUB_GROUP2_API_URL}/search`, {
            params: { mainGroupCode, subGroup1Code },
        });
        console.log('Sub Group 2 API Response:', response.data); // Debug the API response
        return response.data;
    } catch (error) {
        console.error('Error fetching Sub Group 2:', error.response?.data || error.message);
        throw error;
    }
};
export const importSubGroup2 = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${SUB_GROUP2_API_URL}/import`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error importing Sub Group 2:', error.response?.data || error.message);
        throw error;
    }
};
export const exportSubGroup2 = async () => {
    try {
        const response = await axios.get(`${SUB_GROUP2_API_URL}/export`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sub_group2.csv');
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Error exporting Sub Group 2:', error.response?.data || error.message);
        throw error;
    }
};
export const deleteSubGroup2 = async (id) => {
    try {
        const response = await axios.delete(`${SUB_GROUP2_API_URL}/${id}`); // Correct the URL
        return response.data;
    } catch (error) {
        console.error('Error deleting Sub Group 2:', error);
        throw error.response?.data || 'Failed to delete Sub Group 1';
    }
};
export const updateSubGroup2 = async (formData) => {
    console.log("Sending Update Sub Group 2 Data:", formData);
    try {
      const response = await axios.put(`${SUB_GROUP2_API_URL}/${formData.id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error updating Sub Group 2:",
        error.response?.data || error.message
      );
      throw error.response?.data?.error || "Failed to update Sub Group 2";
    }
  };
// Sub Group 3 APIs
export const addSubGroup3 = async (formData) => {
    try {
      const response = await axios.post(`${SUB_GROUP3_API_URL}/add`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding Sub Group 3:', error.response?.data || error.message);
      throw error;
    }
  };
 // Update the searchSubGroup3 API
 export const searchSubGroup3 = async (query, filter) => {
    try {
      const response = await axios.post(`${SUB_GROUP3_API_URL}/search`, {
        query,
        filter,
      });
      return response.data;
    } catch (error) {
      console.error('Error searching Sub Group 3:', error.response?.data || error.message);
      throw error.response?.data || 'Failed to search Sub Group 3';
    }
  };
  
  
export const importSubGroup3 = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${SUB_GROUP3_API_URL}/import`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error importing Sub Group 3:', error.response?.data || error.message);
        throw error;
    }
};
export const exportSubGroup3 = async () => {
    try {
        const response = await axios.get(`${SUB_GROUP3_API_URL}/export`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sub_group3.csv');
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Error exporting Sub Group 3:', error.response?.data || error.message);
        throw error;
    }
};
// Update Sub Group 3
export const updateSubGroup3 = async (id, formData) => {
    try {
      const response = await axios.put(`${SUB_GROUP3_API_URL}/update/${id}`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating Sub Group 3:', error.response?.data || error.message);
      throw error;
    }
  };
// Delete Sub Group 3
export const deleteSubGroup3 = async (id) => {
    try {
      const response = await axios.delete(`${SUB_GROUP3_API_URL}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting Sub Group 3:', error.response?.data || error.message);
      throw error.response?.data || 'Failed to delete Sub Group 3';
    }
  };
  export const addSubGroup4 = async (formData) => {
    try {
        console.log('Payload to Backend:', formData); // Debug payload
        const response = await axios.post(`${SUB_GROUP4_API_URL}/add`, formData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding Sub Group 4:', error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};


export const searchSubGroup4 = async (query, filter) => {
    try {
        console.log('Query Sent to Backend:', { query, filter }); // Log the query and filter
        const response = await axios.get(`${SUB_GROUP4_API_URL}/search`, {
            params: { query: query || '', filter: filter || 'code' },
        });
        console.log('Response from Backend:', response.data); // Log backend response
        return response.data;
    } catch (error) {
        console.error('Error in searchSubGroup4:', error.response?.data || error.message);
        throw error.response?.data || 'Failed to fetch Sub Group 4 data';
    }
};

export const importSubGroup4 = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${SUB_GROUP4_API_URL}/import`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error importing Sub Group 4:', error.response?.data || error.message);
        throw error;
    }
};

export const exportSubGroup4 = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/sub-group4/export', {
            responseType: 'blob', // Ensure blob type for file download
        });

        // Trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sub_group4.csv'); // File name for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up DOM
    } catch (error) {
        console.error('Error exporting Sub Group 4:', error.response?.data || error.message);
        throw error.response?.data || 'Failed to export Sub Group 4';
    }
};



export const deleteSubGroup4 = async (id) => {
    try {
        const response = await axios.delete(`${SUB_GROUP4_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Sub Group 4:', error.response?.data || error.message);
        throw error.response?.data || 'Failed to delete Sub Group 4';
    }
};

export const updateSubGroup4 = async (id, formData) => {
    try {
        const response = await axios.put(`${SUB_GROUP4_API_URL}/update/${id}`, formData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating Sub Group 4:', error.response?.data || error.message);
        throw error.response?.data || 'Failed to update Sub Group 4';
    }
};
