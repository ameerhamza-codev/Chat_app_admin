import React, { useState, useEffect } from 'react';
import { fetchGroupAccess, saveGroupAccess } from '../api/groupAccessApi';

const GroupAccessModal = ({ userId, onClose }) => {
  const [accessOptions, setAccessOptions] = useState([]);
  const [selectedAccess, setSelectedAccess] = useState([]);

  useEffect(() => {
    const loadGroupAccess = async () => {
      try {
        const data = await fetchGroupAccess(userId);
        console.log("Fetched user group access:", data); // Debugging
        setSelectedAccess(data || []);
      } catch (error) {
        console.error('Error loading group access:', error);
      }
    };

    const loadAccessOptions = async () => {
      try {
        const response = await fetch("http://localhost:5000/user_access_levels");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const options = await response.json();
        console.log("Fetched access options:", options); // Debugging
        setAccessOptions(options);
      } catch (error) {
        console.error("Error fetching access options:", error);
      }
    };

    loadGroupAccess();
    loadAccessOptions();
  }, [userId]);

  const handleCheckboxChange = (option) => {
    setSelectedAccess((prev) =>
      prev.some((item) => item.id === option.id)
        ? prev.filter((item) => item.id !== option.id) // Remove if exists
        : [...prev, option] // Add if not exists
    );
  };

  const handleSave = async () => {
    try {
      console.log("Saving access levels:", selectedAccess); // Debugging
      await saveGroupAccess(userId, selectedAccess);
      alert('Group access saved successfully');
      onClose();
    } catch (error) {
      console.error('Error saving group access:', error);
    }
  };
  

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>Group Access</h2>
          <button style={styles.closeButton} onClick={onClose}>&times;</button>
        </div>
        <div style={styles.body}>
          {accessOptions.length > 0 ? (
            accessOptions.map((option) => (
              <div key={option.id} style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={selectedAccess.some((item) => item.id === option.id)}
                  onChange={() => handleCheckboxChange(option)}
                  style={styles.checkbox}
                />
                <label style={styles.label}>{option.access_level}</label>
              </div>
            ))
          ) : (
            <p>Loading access options...</p>
          )}
        </div>
        <div style={styles.footer}>
          <button style={styles.saveButton} onClick={handleSave}>Save</button>
          <button style={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// Styles for the modal
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '400px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  title: {
    fontSize: '18px',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '15px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: '10px',
  },
  label: {
    fontSize: '14px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  saveButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default GroupAccessModal;
