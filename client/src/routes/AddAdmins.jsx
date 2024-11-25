/* eslint-disable no-unused-vars */

/* eslint-disable react/no-unescaped-entities */

import AddAdminsForm from './AddAdminsForm';
import { useState, useContext, useEffect } from 'react';
import { AdminContext } from '../contexts';
import { useAuth0 } from '@auth0/auth0-react';

const AddAdmins = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const {
        getAllUsers,
        users,
        changeAdminStatus,
    } = useContext(AdminContext);

    const { user } = useAuth0();
    const auth0User = user;

    const [isCurrentAdmin, setIsCurrentAdmin] = useState(false);
    const [isNewAdmin, setIsNewAdmin] = useState(true);

    const checkAdminStatus = async (user) => {
        try {
            const isAdmin = !!user.isAdmin;
            setIsCurrentAdmin(isAdmin);
            return isAdmin;
        } catch (error) {
            console.error('Failed to check user admin status:', error);
            return false;
        }
    };

    const handlePromote = async (user) => {
        try {
            const isCurrentAdmin = await checkAdminStatus(user);
            const isNewAdmin = !isCurrentAdmin;

            await changeAdminStatus(user.userEmail, isNewAdmin);

            setIsAdmin(isNewAdmin);
            getAllUsers();
            alert(
                isNewAdmin
                    ? 'User promoted to admin!'
                    : 'User admin access revoked',
            );
        } catch (error) {
            console.error('Failed to change admin status:', error);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            getAllUsers();
        };
        fetchUsers();
    }, [getAllUsers]);

    return (
        <div className="flex justify-center w-full py-10">
            <div className="flex flex-col gap-10 items-center max-w-4xl w-full  p-6 rounded-xl shadow-lg bg-white">
                <h2 className="text-2xl font-semibold text-center mb-6">Manage Admins</h2>

                {/* Users List */}
                <div className="w-full">
                    <ul>
                        {users.map((user) => (
                            <div
                                className="flex items-center justify-between border border-charcoal p-6 mb-6 rounded-lg shadow-sm hover:shadow-md"
                                key={user.userEmail}
                            >
                                <li className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                        <span className="font-bold text-lg text-black">
                                            {user.firstName && user.lastName
                                                ? `${user.firstName} ${user.lastName}`
                                                : user.userEmail}
                                        </span>
                                    </div>
                                </li>
                                {auth0User.sub !== user.sub ? (
                                    <button
                                        className={`p-3 rounded-xl text-white font-semibold transition-all duration-200 ${
                                            user.isAdmin
                                                ? 'bg-red hover:bg-pink width-[300px]'
                                                : 'bg-green-600 hover:bg-green-500 w-[200px] '
                                        }`}
                                        type="button"
                                        onClick={() => handlePromote(user)}
                                    >
                                        {user.isAdmin
                                            ? 'Remove Admin Access'
                                            : 'Promote to Admin'}
                                    </button>
                                ) : (
                                    <span className="font-bold text-charcoal">Your account</span>
                                )}
                            </div>
                        ))}
                    </ul>
                </div>

             
            </div>
            <AddAdminsForm />
        </div>
    );
};

export default AddAdmins;

