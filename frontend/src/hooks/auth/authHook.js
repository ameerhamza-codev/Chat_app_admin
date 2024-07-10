import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';

const useAuth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            localStorage.setItem('token', response.data.token); 
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed', err);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleLogin
    };
};

export default useAuth;
