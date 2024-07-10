import React from 'react';
import { colors } from '../utils/colors';

const Occupations = () => {
    return (
        <div>
            <div className='my-2 mx-2 d-flex align-items-center justify-content-between'>
                <h3>Occupations</h3>
                <div>
                    <button className='btn btn-primary' style={{ backgroundColor: colors.secondary }}>Add Occupations</button>
                    <button className='btn btn-primary mx-2' style={{ backgroundColor: colors.secondary }}>Import</button>
                    <button className='btn btn-primary' style={{ backgroundColor: colors.secondary }}>Export</button>
                </div>
            </div>
            <div className='m-2'>
                <br/>
                <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>

    );
};

export default Occupations;
