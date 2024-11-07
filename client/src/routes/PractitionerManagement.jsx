/* eslint-disable react/no-unescaped-entities */
// PractitionerManagement.js

//

import { useContext, useEffect } from 'react';
import { AdminContext } from '../contexts';
import UserList from '../components/UserList';
import { Outlet, useParams } from 'react-router-dom';

const PractitionerManagement = () => {
    const { getAllUsers, users } = useContext(AdminContext);
    const { userId } = useParams();

    // console.log(users.userEmail.firstName);

    useEffect(() => {
        getAllUsers();
    }, []);
    return (
        <div className="flex flex-col justify-center items-center gap-10 w-full">
          
            {userId ? <Outlet /> : <UserList />}
        </div>
    );
};

export default PractitionerManagement;
