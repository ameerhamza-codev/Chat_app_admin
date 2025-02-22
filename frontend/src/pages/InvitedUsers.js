import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ModalForm from '../components/Form Models/AddInvitedUserForm';
import useInvitedUserForm from '../hooks/model-forms/AddInviteUserHook';
import { getInvitedUsers, deleteInvitedUser } from '../api/formApi';
import { getMainGroups, fetchSubGroup2, searchSubGroup3, searchSubGroup4, searchSubGroup1 } from '../api/groupsApi';
import SubGroupModal from '../components/SubGroupModel';

const InvitedUsers = () => {
    const [show, setShow] = useState(false);
    const [subGroupModalShow, setSubGroupModalShow] = useState(false);
    const [alertModalShow, setAlertModalShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [subGroupDetails, setSubGroupDetails] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [dropdownData, setDropdownData] = useState({
        mainGroups: [],
        subGroup1: [],
        subGroup2: [],
        subGroup3: [],
        subGroup4: [],
    });

    const { formData, setFormValues, handleChange, handleSubmit } = useInvitedUserForm(() => {
        handleClose();
        loadInvitedUsers();
    });

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setEditUserId(null);
        setFormValues({
            mainGroupCode: '',
            subGroup1Code: '',
            subGroup2Code: '',
            subGroup3Code: '',
            subGroup4Code: '',
            name: '',
            email: '',
            mobile: '',
            gender: 'Male',
            additionalResponsibility: '',
            referrer: false,
        });
    };

    const handleShow = () => setShow(true);

    const loadInvitedUsers = async () => {
        try {
            const response = await getInvitedUsers();
            const uniqueUsers = response.filter(
                (user, index, self) => self.findIndex((u) => u.id === user.id) === index
            );
            setInvitedUsers(uniqueUsers || []);
        } catch (error) {
            console.error('Error fetching invited users:', error);
        }
    };

    const handleDelete = async (id) => {
         {
            try {
                await deleteInvitedUser(id);
                setInvitedUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                setAlertMessage('User deleted successfully.');
                setAlertModalShow(true);
            } catch (error) {
                console.error('Error deleting user:', error);
                setAlertMessage('Failed to delete user.');
                setAlertModalShow(true);
            }
        }
    };

    const handleEdit = (user) => {
        setEditMode(true);
        setEditUserId(user.id);
        setFormValues({
            mainGroupCode: user.mainGroupCode || '',
            subGroup1Code: user.subGroup1Code || '',
            subGroup2Code: user.subGroup2Code || '',
            subGroup3Code: user.subGroup3Code || '',
            subGroup4Code: user.subGroup4Code || '',
            name: user.name || '',
            email: user.email || '',
            mobile: user.mobile || '',
            gender: user.gender || 'Male',
            additionalResponsibility: user.additionalResponsibility || '',
            referrer: user.referrer || false,
        });
        setShow(true);
    };

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

    const loadDropdownData = async () => {
        try {
            const mainGroups = await getMainGroups();
            const subGroup1 = await searchSubGroup1('', 'code');
            const subGroup2 =
                mainGroups.length > 0 && subGroup1.length > 0
                    ? await fetchSubGroup2(mainGroups[0].code, subGroup1[0].code)
                    : [];
            const subGroup3 = await searchSubGroup3('', 'code');
            const subGroup4 = await searchSubGroup4('', 'code');
            setDropdownData({
                mainGroups: mainGroups || [],
                subGroup1: subGroup1 || [],
                subGroup2: subGroup2 || [],
                subGroup3: subGroup3 || [],
                subGroup4: subGroup4 || [],
            });
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
        }
    };

    useEffect(() => {
        loadInvitedUsers();
        loadDropdownData();
    }, []);

    return (
        <div>
            <div className="my-2 mx-2 d-flex align-items-center justify-content-between">
                <h3>Invited Users</h3>
                <Button variant="primary" onClick={handleShow}>
                    + Invite User
                </Button>

                <ModalForm
                    show={show}
                    handleClose={handleClose}
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={(data) =>
                        editMode
                            ? handleSubmit(true, editUserId) // Pass `true` for edit mode
                            : handleSubmit(false) // Pass `false` for add mode
                    }
                    dropdownData={dropdownData}
                    editMode={editMode}
                />
            </div>
            <div className="m-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Gender</th>
                            <th>Main Group</th>
                            <th>Sub Group</th>
                            <th>Additional Responsibility</th>
                            <th>Referrer</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invitedUsers.length > 0 ? (
                            invitedUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.mainGroupCode || 'Unknown'}</td>
                                    <td>
                                        <Button
                                            variant="link"
                                            onClick={() => handleViewSubGroups(user)}
                                        >
                                            View
                                        </Button>
                                    </td>
                                    <td>{user.additionalResponsibility || 'Unknown'}</td>
                                    <td>{user.referrer ? 'Yes' : 'No'}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">No invited users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <SubGroupModal
                show={subGroupModalShow}
                onHide={() => setSubGroupModalShow(false)}
                subGroups={subGroupDetails}
            />

            <Modal show={alertModalShow} onHide={() => setAlertModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>{alertMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAlertModalShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InvitedUsers;
