// /* eslint-disable react/no-unescaped-entities */

// //create get request to get all active practitioner profiles
// //save in context on FE
// //Map over and conditionally render based on if they're adding an existing practitioner or not
// import AddAdminsForm from './AddAdminsForm';
// import { useState, useContext, useEffect } from 'react';
// import { AdminContext } from '../contexts';
// import { useAuth0 } from '@auth0/auth0-react';

// //i need to fetch all users and render here, similar to userlist
// //then check isAdmin and render whether they're admins or not

// const AddAdmins = () => {
//     const [isAdmin, setIsAdmin] = useState(false);

//     const {
//         getAllUsers,
//         users,

//         changeAdminStatus,
//     } = useContext(AdminContext);

//     const { user } = useAuth0();

//     const auth0User = user;

//     console.log(auth0User.sub);

//     const [isCurrentAdmin, setisCurrentAdmin] = useState(false);
//     const [isNewAdmin, setIsNewAdmin] = useState(true);
//     const [currentAdmin, setCurrentAdmin] = useState('');

//     const checkAdminStatus = async (user) => {
//         try {
//             const isAdmin = !!user.isAdmin;
//             setisCurrentAdmin(isAdmin);
//             return isAdmin;
//         } catch (error) {
//             console.error('Failed to check user admin status:', error);
//             return false;
//         }
//     };

//     console.log(isCurrentAdmin, 'is current admin?');
//     console.log(isNewAdmin, 'is new admin?');

//     const handlePromote = async (user) => {
//         try {
//             const isCurrentAdmin = await checkAdminStatus(user);
//             const isNewAdmin = !isCurrentAdmin;

//             await changeAdminStatus(user.userEmail, isNewAdmin);

//             setIsAdmin(isNewAdmin);
//             getAllUsers();
//             alert(
//                 isNewAdmin
//                     ? 'User promoted to admin!'
//                     : 'User admin access revoked',
//             );
//         } catch (error) {
//             console.error('Failed to change admin status:', error);
//         }
//     };

//     useEffect(() => {
//         const fetchUsers = async () => {
//             getAllUsers();
//         };
//         fetchUsers();
//     }, []);

//     console.log(users);

//     return (
//         <div className="flex gap-10 justify-around w-full max-w-[1200px]">
//             <div className="flex flex-col justify-center items-center gap-10 border border-black rounded-xl w-full max-w-[1200px]">
//                 <h2 className="text-2xl">Add New Admins</h2>
//                 <div>
//                     <ul>
//                         {users.map((user) => (
//                             <div
//                                 className="flex border border-black rounded p-10 mb-10 items-center"
//                                 key={user.userEmail}
//                             >
//                                 <li className="flex items-center justify-between w-full">
//                                     <div className="flex items-center">
//                                         <span className="font-bold text-l px-2">
//                                             {user.firstName && user.lastName
//                                                 ? `${user.firstName} ${user.lastName}`
//                                                 : user.userEmail}
//                                         </span>
//                                     </div>
//                                 </li>
//                                 {auth0User.sub !== user.sub ? (
//                                     <button
//                                         className={`border rounded-xl p-5 w-[400px] text-white ${
//                                             user.isAdmin
//                                                 ? 'bg-red'
//                                                 : 'bg-green-is-good'
//                                         }`}
//                                         type="submit"
//                                         onClick={() => handlePromote(user)}
//                                     >
//                                         {user.isAdmin
//                                             ? 'Remove Admin Access'
//                                             : 'Promote to Admin'}
//                                     </button>
//                                 ) : (
//                                     <div className="font-bold">
//                                         Your account{' '}
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </ul>
//                 </div>

//                 <AddAdminsForm />
//             </div>
//         </div>
//     );
// };

// export default AddAdmins;

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

