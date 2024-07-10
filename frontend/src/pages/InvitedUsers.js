import React from 'react';
import { colors } from '../utils/colors';
const InvitedUsers = () => {
    return (
        <div>
            <div className='my-2 mx-2 d-flex align-items-center justify-content-between '>
                <h3>Invited Users</h3>
                <button className='btn btn-primary' style={{backgroundColor:colors.secondary}}>Invite User</button>
            </div>
            <div className='m-2'>
                <br/>
                <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Add. Resp. Code</th>
                        <th scope="col">Add. Resp. Type</th>
                        <th scope="col">Group</th>
                        <th scope="col">Sub Group</th>
                        <th scope="col">Refferer</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
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

export default InvitedUsers;
