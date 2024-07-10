
import React from 'react';
import '../styles/Dashboard.css'; // Import Dashboard-specific styles
import profilePic from '../assets/profile.png';
import { useNavigate , Outlet, useLocation} from 'react-router-dom';
import { logout } from '../api/authApi';
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import { colors } from '../utils/colors';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const isDashboardPath = location.pathname === '/dashboard';


    return (
        <div className="dashboard">
            <Sidebar />

            <div className="main-content" style={{ backgroundColor: colors.bg }}>
                <nav className="navbar" style={{ backgroundColor: colors.primary }}>
                    <div className="navbar-profile">
                        <img
                            src={profilePic}
                            alt="Admin"
                            className="profile-pic"
                            onClick={() => document.getElementById('profile-menu').classList.toggle('show')}
                        />
                        <div id="profile-menu" className="profile-menu">
                            <div className="profile-info">
                                <p>Admin</p>
                                <p>admin@chatapp.com</p>
                            </div>
                            <hr />
                            <ul>
                                <li>Settings</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="content">
                    {isDashboardPath ? (
                        <div className='m-2'>
                            <h1>Dashboard</h1>
                            <p>Welcome to the Chat App dashboard.</p>
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
