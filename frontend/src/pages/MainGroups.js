import React from 'react';
import { colors } from '../utils/colors';

const MainGroups = () => {
    return (
        <div>
            <div className='my-2 mx-2 d-flex align-items-center justify-content-between '>
                <h3>Main Groups</h3>
                <button className='btn btn-primary' style={{backgroundColor:colors.secondary}}>Add Group</button>
            </div>
            <div className='m-2'>
                <br/>
                <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Code</th>
                        <th scope="col">Sub Groups</th>
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

export default MainGroups;
