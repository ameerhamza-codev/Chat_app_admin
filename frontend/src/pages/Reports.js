import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/Searchbar';

const Reports = () => {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('name');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const filters = [
        { value: 'name', label: 'Name' },
        { value: 'email', label: 'Email' },
        { value: 'mobile', label: 'Mobile' },
        { value: 'city', label: 'City' },
        { value: 'country', label: 'Country' },
        { value: 'maingroup', label: 'Main Group' },
        { value: 'subgroup1', label: 'Sub Group 1' },
        { value: 'subgroup2', label: 'Sub Group 2' },
        { value: 'subgroup3', label: 'Sub Group 3' },
        { value: 'subgroup4', label: 'Sub Group 4' },
    ];

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        setResults([]);

        try {
            const response = await axios.get('http://localhost:5000/api/reports/search', {
                params: { [filter]: query },
            });
            setResults(response.data);
        } catch (err) {
            setError('Failed to fetch results. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = async (id) => {
        console.log(`Fetching details for ID: ${id}`);
        try {
            const response = await axios.get(`http://localhost:5000/api/reports/details/${id}`);
            console.log('Response:', response.data);
            setSelectedUser(response.data);
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedUser(null);
    };

    return (
        <div>
            <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
                <h3>Reports</h3>
            </div>
            <SearchBar
                placeholder="Search..."
                query={query}
                filter={filter}
                onQueryChange={(e) => setQuery(e.target.value)}
                onFilterChange={(e) => setFilter(e.target.value)}
                onSearch={handleSearch}
                filters={filters}
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="results">
                {results.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewDetails(user.id)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !loading && <p>No results found.</p>
                )}
            </div>

            {modalVisible && selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h4 className="text-center mb-4">USER DETAILS</h4>
                        <div className="modal-body">
                            <p><strong>User ID:</strong> {selectedUser.id || 'N/A'}</p>
                            <p><strong>Email:</strong> {selectedUser.email || 'N/A'}</p>
                            <p><strong>Name:</strong> {selectedUser.name || 'N/A'}</p>
                            <p><strong>Display Name:</strong> {selectedUser.display_name || 'N/A'}</p>
                            <p><strong>Father Name:</strong> {selectedUser.father_name || 'N/A'}</p>
                            <p><strong>Mobile Number:</strong> {selectedUser.mobile || 'N/A'}</p>
                            <p><strong>Landline Number:</strong> {selectedUser.landline_number || 'N/A'}</p>
                            <p><strong>Gender:</strong> {selectedUser.gender || 'N/A'}</p>
                            <p><strong>Date of Birth:</strong> {selectedUser.dob || 'N/A'}</p>
                            <p><strong>City:</strong> {selectedUser.city || 'N/A'}</p>
                            <p><strong>Country:</strong> {selectedUser.country || 'N/A'}</p>
                            <p><strong>Main Group:</strong> {selectedUser.main_group || 'N/A'}</p>
                            <p><strong>Sub Group 1:</strong> {selectedUser.sub_group1 || 'N/A'}</p>
                            <p><strong>Sub Group 2:</strong> {selectedUser.sub_group2 || 'N/A'}</p>
                            <p><strong>Sub Group 3:</strong> {selectedUser.sub_group3 || 'N/A'}</p>
                            <p><strong>Sub Group 4:</strong> {selectedUser.sub_group4 || 'N/A'}</p>
                        </div>
                        <div className="modal-footer text-center">
                            <button className="btn btn-secondary" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reports;
