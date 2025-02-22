import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AbuseReports = () => {
    const [reports, setReports] = useState([]); // State to store abuse reports
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for errors
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [selectedReportId, setSelectedReportId] = useState(null); // State for selected report ID

    // Fetch reports from backend
    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reports'); // Backend endpoint
            setReports(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching reports:', err.message);
            setError('Failed to load reports.');
            setLoading(false);
        }
    };

    // Open delete confirmation modal
    const openDeleteModal = (id) => {
        setSelectedReportId(id);
        setShowModal(true);
    };

    // Close the modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedReportId(null);
    };

    // Delete a report by ID
    const deleteReport = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/reports/${selectedReportId}`); // Backend endpoint
            setReports((prev) => prev.filter((report) => report.id !== selectedReportId));
            closeModal();
        } catch (err) {
            console.error('Error deleting report:', err.message);
            alert('Failed to delete report.');
        }
    };

    useEffect(() => {
        fetchReports(); // Fetch reports on component mount
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='m-2'>
            <h3>Abuse Reports</h3>
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Reporter</th>
                        <th scope="col">Abuser</th>
                        <th scope="col">Topic</th>
                        <th scope="col">Report</th>
                        <th scope="col">Time/Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.reporter}</td>
                                <td>{report.abuser}</td>
                                <td>{report.topic}</td>
                                <td>{report.report}</td>
                                <td>{new Date(report.time_date).toLocaleString()}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => openDeleteModal(report.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No abuse reports found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this report?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={deleteReport}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AbuseReports;
