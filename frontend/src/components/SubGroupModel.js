import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SubGroupModal = ({ show, onHide, subGroups }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Subgroup Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {Array.isArray(subGroups) && subGroups.length > 0 ? (
                        subGroups.map((group, index) => (
                            <li key={index}>{group}</li>
                        ))
                    ) : (
                        <p>No subgroup data available.</p>
                    )}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SubGroupModal;
