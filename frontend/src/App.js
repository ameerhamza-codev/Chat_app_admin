import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route exact path='/dashboard' element={<ProtectedRoute/>}>
                        <Route exact path='/dashboard' element={<Dashboard/>}/>
                    </Route>
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
}

export default App;
