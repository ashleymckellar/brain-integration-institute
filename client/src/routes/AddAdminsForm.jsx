/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import AddAdminsForm from './AddAdminsForm';
import { useState, useContext, useEffect } from 'react';
import { AdminContext } from '../contexts';
import { useAuth0 } from '@auth0/auth0-react';
import { AdminManagementModal } from '../components/AdminManagementModal';

const AddAdmins = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const { getAllUsers, users, changeAdminStatus } = useContext(AdminContext);

    const { user } = useAuth0();
    const auth0User = user;

    const [isCurrentAdmin, setIsCurrentAdmin] = useState(false);
    const [isNewAdmin, setIsNewAdmin] = useState(true);
    const [adminManagementModalOpen, setAdminManagementModalOpen] = useState(false);

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
            setAdminManagementModalOpen(true);
        } catch (error) {
            console.error('Failed to change admin status:', error);
        }
    };

    const handleCloseModal = () => {
        setAdminManagementModalOpen(false);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            getAllUsers();
        };
        fetchUsers();
    }, []);

    return (
        <div className="flex justify-center w-full py-10">
            <div className="flex flex-col gap-10 items-center max-w-4xl w-full sm:px-6 lg:px-8 px-4 rounded-xl shadow-lg bg-gray">
                <h2 className="text-2xl font-semibold text-left mb-6 pt-5 sm:text-xl lg:text-2xl">
                    Current Admin List
                </h2>

                {/* Users List */}
                <div className="w-full">
                    <ul>
                        {users
                            .filter((user) => user.isAdmin)
                            .map((user) => (
                                <div
                                    className="flex items-center justify-between border border-white bg-white p-6 mb-6 rounded-lg shadow-sm hover:shadow-md gap-4 sm:gap-6 md:gap-8"
                                    key={user.userEmail}
                                >
                                    <li className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                            <span className="font-medium text-lg text-black font-fira">
                                                {user.userEmail}
                                            </span>
                                        </div>
                                    </li>

                                    {auth0User.sub !== user.sub ? (
                                        <button
                                            className={`py-2 px-4 rounded-md text-white font-light font-fira transition-all duration-200 whitespace-nowrap ${
                                                user.isAdmin
                                                    ? 'bg-red hover:bg-pink width-[00px]'
                                                    : 'bg-green-600 hover:bg-green-500 w-[200px]'
                                            }`}
                                            type="button"
                                            onClick={() => handlePromote(user)}
                                        >
                                            {user.isAdmin
                                                ? 'Remove Admin'
                                                : 'Promote to Admin'}
                                        </button>
                                    ) : (
                                        <span className="font-bold text-charcoal">
                                            Your account
                                        </span>
                                    )}
                                </div>
                            ))}
                    </ul>
                </div>
            </div>
            <AddAdminsForm />
            {adminManagementModalOpen && (
                <AdminManagementModal
                    open={adminManagementModalOpen}
                    handleClose={handleCloseModal}
                >
                    <div className="flex flex-col justify-center items-center gap-10">
                        {isCurrentAdmin ? (
                            <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-500 font-bold ">
                                User admin access revoked
                            </h3>
                        ) : (
                            <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-500 font-bold">
                                User promoted to admin
                            </h3>
                        )}
                        <button
                            className="bg-medium-pale-green hover:bg-green-600 rounded-md mb-10 text-white font-medium px-6 py-2"
                            onClick={handleCloseModal}
                        >
                            OK
                        </button>
                    </div>
                </AdminManagementModal>
            )}
        </div>
    );
};

export default AddAdmins;
