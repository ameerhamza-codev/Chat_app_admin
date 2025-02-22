import { useState } from 'react';
import { createUser, getUserById, updateUser, deleteUser } from '../../api/userApi';

const useUser = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const handleCreateUser = async (userData) => {
        try {
            const response = await createUser(userData);
            setUser(response);
        } catch (err) {
            console.error('User creation failed', err);
            setError('Failed to create user.');
        }
    };

    const handleGetUser = async (id) => {
        try {
            const response = await getUserById(id);
            setUser(response);
        } catch (err) {
            console.error('Failed to fetch user', err);
            setError('Failed to fetch user.');
        }
    };

    const handleUpdateUser = async (id, userData) => {
        try {
            const response = await updateUser(id, userData);
            setUser(response);
        } catch (err) {
            console.error('Failed to update user', err);
            setError('Failed to update user.');
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            setUser({});
        } catch (err) {
            console.error('Failed to delete user', err);
            setError('Failed to delete user.');
        }
    };

    return {
        user,
        error,
        handleCreateUser,
        handleGetUser,
        handleUpdateUser,
        handleDeleteUser,
    };
};

export default useUser;
