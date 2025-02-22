import React, { useState, useEffect } from 'react';
import useUserSearch from '../hooks/users/searchUserHook';
import useUserForm from '../hooks/model-forms/AddUserHook';
import SearchBar from '../components/Searchbar';
import { colors } from '../utils/colors';
import { Button } from 'react-bootstrap';
import ModalForm from '../components/Form Models/AddUserForm';
import AlertModal from '../components/AlertModel';
import { exportUsers, deleteUser, fetchAllUsers} from '../api/userApi';
import SubGroupModal from '../components/SubGroupModel';
import GroupAccessModal from '../components/GroupAccessModal';

const AllUsers = () => {
    const {
        query,
        filter,
        results,
        loading,
        error,
        handleQueryChange,
        handleFilterChange,
        handleSearch,
    } = useUserSearch();

    const [tableVisible, setTableVisible] = useState(true);
    const [users, setUsers] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [editUserId, setEditUserId] = useState(null);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertConfig, setAlertConfig] = useState({});
    const filters = [
        { value: 'name', label: 'Name' },
        { value: 'email', label: 'Email' },
        { value: 'mobile', label: 'Mobile' },
        { value: 'workingCity', label: 'City' },
        { value: 'workingCountry', label: 'Country' },
    ];
    const [subGroupModalShow, setSubGroupModalShow] = useState(false);
    const [subGroupDetails, setSubGroupDetails] = useState([]);
    const [show, setShow] = useState(false);
    

    const handleClose = () => {
        setShow(false);
        setEditUserId(null); // Reset edit user
    };

    const handleShow = () => {
        
        setShow(true);
    };

    const openModal = (userId) => {
        setSelectedUserId(userId);
        setIsModalOpen(true); // Open the Group Access modal
        console.log('Selected User ID:', userId);
        console.log('Modal Open State:', isModalOpen);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUserId(null);
        console.log('Modal closed'); // Debugging
      };

    useEffect(() => {
        console.log('isModalOpen:', isModalOpen);
        console.log('selectedUserId:', selectedUserId);
      }, [isModalOpen, selectedUserId]);

      useEffect(() => {
        fetchAllUsers()
          .then((data) => {
            console.log('Fetched users:', data); // Debugging: Log fetched data
            setUsers(data); // Update state with fetched users
          })
          .catch((error) => {
            console.error('Error loading users:', error);
          });
      }, []);
      

    const handleViewSubGroups = (user) => {
        const subGroups = [
            `Sub Group 1: ${user.subGroup1Code || 'Unknown'}`,
            `Sub Group 2: ${user.subGroup2Code || 'Unknown'}`,
            `Sub Group 3: ${user.subGroup3Code || 'Unknown'}`,
            `Sub Group 4: ${user.subGroup4Code || 'Unknown'}`,
        ];
        setSubGroupDetails(subGroups);
        setSubGroupModalShow(true);
    };

    const handleExportUsers = async () => {
        try {
            const data = await exportUsers();
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'users.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting users:', error);
            alert('Error exporting users');
        }
    };

    const handleDeleteUser = async (id) => {
        setAlertConfig({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this user?',
            onConfirm: async () => {
                try {
                    await deleteUser(id);
                    setShowAlertModal(false);
                    handleSearch();
                } catch (error) {
                    console.error('Error deleting user:', error);
                    alert('Error deleting user');
                }
            },
        });
        setShowAlertModal(true);
    };

    const {
        formData,
        handleChange,
        handleSubmit,
        dropdownOptions,
        setFormData,
        setEditUserId: setEditUserInHook,
    } = useUserForm(async () => {
        setAlertConfig({
            title: 'Success',
            message: editUserId ? 'User updated successfully!' : 'User added successfully!',
            onConfirm: () => setShowAlertModal(false),
        });
        
        setShowAlertModal(true);
        handleClose();
        await handleSearch(); // Refresh list after add/edit
    });
    
   
    
    const handleEdit = (user) => {
        setFormData({
            id: user.id,
            mainGroupCode: user.mainGroupCode,
            subGroup1Code: user.subGroup1Code,
            subGroup2Code: user.subGroup2Code,
            subGroup3Code: user.subGroup3Code,
            subGroup4Code: user.subGroup4Code,
            name: user.name,
            fatherName: user.fatherName,
            email: user.email,
            displayName: user.displayName,
            password: user.password,
            mobile: user.mobile,
            landline: user.landline,
            companyName: user.companyName,
            DOB: user.DOB ? user.DOB.split('T')[0] : '',
            occupation: user.occupation,
            workingCity: user.workingCity,
            workingCountry: user.workingCountry,
            gender: user.gender,
            referToFriend: !!user.refer_to_friend,
            groupCode: !!user.group_code,
            action: !!user.action,
            subGroup1Representative: !!user.sub_group1_representative,
            subGroup2Representative: !!user.sub_group2_representative,
            subGroup3Representative: !!user.sub_group3_representative,
            subGroup4Representative: !!user.sub_group4_representative,

        });
        setEditUserId(user.id);
        setEditUserInHook(user.id);
        handleShow();
       
       
    
    };
    

    const handleFilterChangeWrapper = (e) => {
        handleFilterChange(e);
        setTableVisible(false); // Hide table on filter change
    };

    const handleSearchWrapper = () => {
        handleSearch();
        setTableVisible(true); // Show table on search
    };

    return (
        <div>
            <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
                <h3>All Users</h3>
                <div>
                    <button
                        className="btn btn-primary mx-2"
                        style={{ backgroundColor: colors.secondary }}
                        onClick={handleExportUsers}
                    >
                        Export
                    </button>
                    <Button
                        variant="primary"
                        type="button"
                        className="btn btn-primary"
                        style={{ backgroundColor: colors.secondary }}
                        onClick={handleShow}
                    >
                        Add User
                    </Button>

                    <ModalForm
                        isEditMode={!!editUserId}
                        show={show}
                        handleClose={handleClose}
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        dropdownOptions={dropdownOptions}
                        
                    />
                </div>
            </div>
            <SearchBar
                placeholder="Search users..."
                query={query}
                filter={filter}
                onQueryChange={handleQueryChange}
                onFilterChange={handleFilterChangeWrapper}
                onSearch={handleSearchWrapper}
                filters={filters}
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {tableVisible && (
                <div className="results" style={{ overflowX: 'auto', maxHeight: '500px' }}>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Group Access</th>
                                <th>Display Name</th>
                                <th>Name</th>
                                <th>Father Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Mobile</th>
                                <th>Landline</th>
                                <th>Company</th>
                                <th>DOB</th>
                                <th>Occupation</th>
                                <th>Location</th>
                                <th>Country</th>
                                <th>Gender</th>
                                <th>Group</th>
                                <th>Sub Group</th>
                                <th>Refer to Friend</th>
                                <th>Group Code</th>
                                <th>Action</th>
                                <th>Sub Group 1 Representative</th>
                                <th>Sub Group 2 Representative</th>
                                <th>Sub Group 3 Representative</th>
                                <th>Sub Group 4 Representative</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.length > 0 ? (
                                results.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>
                                            <Button
                                                className='btn btn-link'
                                                onClick={() => openModal(user.id)}
                                            >
                                                Manage
                                            </Button>
                                        </td>
                                        <td>{user.displayName}</td>
                                        <td>{user.name}</td>
                                        <td>{user.fatherName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.landline}</td>
                                        <td>{user.companyName}</td>
                                        <td>{user.DOB}</td>
                                        <td>{user.occupation}</td>
                                        <td>{user.workingCity}</td>
                                        <td>{user.workingCountry}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.mainGroupCode}</td>
                                        <td>
                                            <Button
                                                variant="link"
                                                onClick={() => handleViewSubGroups(user)}
                                            >
                                                View
                                            </Button>
                                        </td>
                                        <td>{user.refer_to_friend ? 'true' : 'false'}</td>
                                        <td>{user.group_code ? 'true' : 'false'}</td>
                                        <td>{user.action ? 'true' : 'false'}</td>
                                        <td>{user.sub_group1_representative ? 'true' : 'false'}</td>
                                        <td>{user.sub_group2_representative ? 'true' : 'false'}</td>
                                        <td>{user.sub_group3_representative ? 'true' : 'false'}</td>
                                        <td>{user.sub_group4_representative ? 'true' : 'false'}</td>
                                        
                                        <td>
                                            <button
                                                className="btn btn-warning mx-1"
                                                onClick={() => handleEdit(user)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger mx-1"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="17" className="text-center">
                                        No results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <SubGroupModal
                show={subGroupModalShow}
                onHide={() => setSubGroupModalShow(false)}
                subGroups={subGroupDetails}
            />
            {isModalOpen && (
                
    
                <GroupAccessModal
                    userId={selectedUserId}
                    onClose={closeModal}
                    
                />
                
            )}
             <AlertModal
                show={showAlertModal}
                onHide={() => setShowAlertModal(false)}
                title={alertConfig.title}
                message={alertConfig.message}
                onConfirm={alertConfig.onConfirm}
            />
        </div>
    );
};

export default AllUsers;
