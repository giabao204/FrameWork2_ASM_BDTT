import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={() => {
                    onConfirm();
                    onClose();
                }}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
