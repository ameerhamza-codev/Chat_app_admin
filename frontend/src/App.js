import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AllUsers from './pages/AllUsers';
import AbuseReport from './pages/AbuseReports';
import AdditionalResp from './pages/AdditionalResp';
import Country from './pages/Country';
import InvitedUsers from './pages/InvitedUsers';
import JobDescription from './pages/JobDescription';
import Location from './pages/Location';
import MainGroups from './pages/MainGroups';
import Occupations from './pages/Occupations';
import Reports from './pages/Reports';
import RespType from './pages/RespType';
import SubGroup1 from './pages/SubGroup1';
import SubGroup2 from './pages/SubGroup2';
import SubGroup3 from './pages/SubGroup3';
import SubGroup4 from './pages/SubGroup4';
import SubGroup5 from './pages/SubGroup5';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
            <ErrorBoundary>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route exact path='/dashboard' element={<ProtectedRoute/>}>
                        <Route exact path='/dashboard' element={<Dashboard/>}/>
                        <Route path="" element={<Dashboard />}>
                            <Route path="all-users" element={<AllUsers />} />
                            <Route path="invited-users" element={<InvitedUsers />} />
                            <Route path="main-groups" element={<MainGroups />} />
                            <Route path="sub-group1" element={<SubGroup1 />} />
                            <Route path="sub-group2" element={<SubGroup2 />} />
                            <Route path="sub-group3" element={<SubGroup3 />} />
                            <Route path="sub-group4" element={<SubGroup4 />} />
                            <Route path="sub-group5" element={<SubGroup5 />} />
                            <Route path="reports" element={<Reports />} />
                            <Route path="abuse-reports" element={<AbuseReport />} />
                            <Route path="occupations" element={<Occupations />} />
                            <Route path="additional-responsibility" element={<AdditionalResp />} />
                            <Route path="location" element={<Location />} />
                            <Route path="job-description" element={<JobDescription />} />
                            <Route path="country" element={<Country />} />
                            <Route path="responsibility-type" element={<RespType />} />

                            {/* Add more nested routes here */}
                        </Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </ErrorBoundary>
    );
}

export default App;
