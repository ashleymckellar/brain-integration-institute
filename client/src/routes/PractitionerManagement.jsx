


/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from 'react';
import { AdminContext } from '../contexts';
import UserList from '../components/UserList';
import { Outlet, useParams } from 'react-router-dom';

const PractitionerManagement = () => {
    const { getAllUsers } = useContext(AdminContext);
    const { userEmail } = useParams();

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-10 w-full min-h-screen px-4 sm:px-6 md:px-8">
            <div className="flex-grow pb-8 w-full max-w-7xl">
                {/* Adjust layout to switch between UserList and Outlet on small screens */}
                {userEmail ? (
                    <Outlet />
                ) : (
                    <UserList />
                )}
            </div>
        </div>
    );
};

export default PractitionerManagement;

