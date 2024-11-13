/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from 'react';
import { AdminContext } from '../contexts';
import UserList from '../components/UserList';
import { Outlet, useParams } from 'react-router-dom';

const PractitionerManagement = () => {
    const { getAllUsers } = useContext(AdminContext);
    const { userId } = useParams();

    useEffect(() => {
        getAllUsers();
    }, []);
    return (
        <div className="flex flex-col justify-center items-center gap-10 w-full  min-h-screen">
            <div className="flex-grow pb-8">
                {userId ? <Outlet /> : <UserList />}
            </div>
        </div>
    );
};

export default PractitionerManagement;
