import React, {useState} from 'react';
import { colors } from '../utils/colors';
import { Button } from 'react-bootstrap';
import ModalForm from '../components/Form Models/AddRespTypeForm';
import useAddRespTypeForm from '../hooks/model-forms/AddRespTypeHook';

const RespType = () => {
    const [showModal, setShowModal] = useState(false);
    const { formData, handleChange, handleSubmit } = useAddRespTypeForm();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div>
            <div className='my-2 mx-2 d-flex align-items-center justify-content-between'>
                <h3>Responsibility Type</h3>
                <div>
                <Button variant="primary" type="button" className='btn btn-primary mx-2' style={{ backgroundColor: colors.secondary }} onClick={handleShow}>
                        Add Responsibility Type
                    </Button>

                    <ModalForm
                        show={showModal}
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <div className='m-2'>
                <br />
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default RespType;