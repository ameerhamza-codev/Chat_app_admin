import React from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../hooks/auth/authHook';
import { colors } from '../utils/colors';
import '../styles/Login.css'

const Login = () => {
    const { username, setUsername, password, setPassword, error, handleLogin } = useAuth();

    return (
        <div style={{ backgroundColor: colors.primary }}>
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Admin Login</h2>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
            </Card>
        </Container>
        </div>
        
    );
};

export default Login;
