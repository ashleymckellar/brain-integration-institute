import { useEffect, useState, useContext } from 'react';
import { AdminContext } from '../contexts';
import ProgressBar0 from '../assets/icons/ProgressBar0.png';
import ProgressBar1 from '../assets/icons/ProgressBar1.png';
import ProgressBar2 from '../assets/icons/ProgressBar2.png';
import ProgressBar3 from '../assets/icons/ProgressBar3.png';
import ProgressBar4 from '../assets/icons/ProgressBar4.png';
import ProgressBar5 from '../assets/icons/ProgressBar5.png';
import ProgressBar6 from '../assets/icons/ProgressBar6.png';
import ProgressBar7 from '../assets/icons/ProgressBar7.png';
import ProgressBar8 from '../assets/icons/ProgressBar8.png';
import Trashcan from '../assets/icons/Trashcan.png';
import Pracsearch from '../assets/icons/Pracsearch.svg';
import DeleteUserModal from './DeleteUserModal';
import { useNavigate } from 'react-router-dom';

function UserList() {
    const {
        getAllUsers,
        users,
        setIndividualUser,
        individualUser,
        fetchProfileData,
        deleteUser,
    } = useContext(AdminContext);

    // const { user } = useAuth0();

    // const isAdmin = user?.['https://brainintegration.com/isAdmin'];

    const [searchInput, setSearchInput] = useState('');
    const [usersToDelete, setUsersToDelete] = useState([]);
    const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const navigate = useNavigate();

    const certProgressImages = [
        ProgressBar0,
        ProgressBar1,
        ProgressBar2,
        ProgressBar3,
        ProgressBar4,
        ProgressBar5,
        ProgressBar6,
        ProgressBar7,
        ProgressBar8,
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            getAllUsers();
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchProfileData(individualUser);
    }, [individualUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSearchInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleViewProfileClick = (userEmail) => {
        setIndividualUser(users.find((user) => user.userEmail === userEmail));
        navigate(`/admin/practitioner-management/${userEmail}`);
    };

    const handleUserCheckboxClick = (userEmail) => {
        setUsersToDelete((prevUsersToDelete) => {
            if (prevUsersToDelete.includes(userEmail)) {
                return prevUsersToDelete.filter((email) => email !== userEmail);
            } else {
                return [...prevUsersToDelete, userEmail];
            }
        });
    };

    const handleDeleteUserClick = () => {
        setDeleteUserModalOpen(true);
    };

    const handleDeleteProfileClick = async () => {
        try {
            for (const userEmail of usersToDelete) {
                await deleteUser(userEmail);
            }
            // Close the modal and reset the usersToDelete state
            setDeleteUserModalOpen(false);
            setUsersToDelete([]);
            getAllUsers();
            setConfirmationText('Selected user(s) successfully deleted.');
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-10 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-center border border-none rounded-xl bg-gray mb-6 w-full sm:w-3/4 lg:w-[660px]">
                <input
                    type="text"
                    id="search"
                    name="search"
                    value={searchInput}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="border-none flex-1 px-2 py-2 bg-transparent w-full sm:w-auto"
                />
                <img
                    src={Pracsearch}
                    alt={'magnifying glass'}
                    className="w-5 h-5 mt-2 sm:mt-0 sm:ml-2"
                />
            </div>

            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handleDeleteUserClick}
                    disabled={usersToDelete.length === 0}
                    className={`flex items-center px-4 py-2 rounded-md ${
                        usersToDelete.length === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                    } text-sm sm:text-base`}
                >
                    <img
                        src={Trashcan}
                        alt="Trash can"
                        className="w-4 h-4 mr-2 sm:w-5 sm:h-5"
                    />
                    <span>Delete</span>
                </button>

                {confirmationText && (
                    <div className="text-center">
                        <h3 className="font-bold text-sm sm:text-base text-red-500">
                            {confirmationText}
                        </h3>
                    </div>
                )}
            </div>
            {deleteUserModalOpen && (
                <DeleteUserModal
                    open={deleteUserModalOpen}
                    onClose={() => setDeleteUserModalOpen(false)}
                    handleDeleteProfileClick={handleDeleteProfileClick}
                ></DeleteUserModal>
            )}
           <ul className="space-y-4">
    {users.map((user) => (
        <div
            className="flex flex-col md:flex-row border border-black rounded p-4 md:p-10 mb-6 items-start md:items-center"
            key={user.userEmail}
        >
            <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-4">
                <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={usersToDelete.includes(user.userEmail)}
                    onChange={() => handleUserCheckboxClick(user.userEmail)}
                />
            </div>
            <li className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-[150px]">
                <div className="flex items-center">
                    <span className="font-bold text-sm md:text-lg px-2">
                        {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user.userEmail}
                    </span>
                </div>
                <div className="flex items-center">
                    <img
                        src={
                            certProgressImages[
                                Math.min(
                                    user.userUploadProgress || 0,
                                    certProgressImages.length - 1
                                )
                            ]
                        }
                        className="w-50 h-10 md:w-auto"
                        alt={`Progress level ${user.userUploadProgress}`}
                    />
                </div>
                <div className="flex justify-center items-center">
                    <button
                        className="bg-green-is-good hover:bg-green-500 text-white px-4 py-2 rounded-md text-xs md:text-sm whitespace-nowrap"
                        type="submit"
                        onClick={() =>
                            handleViewProfileClick(user.userEmail)
                        }
                    >
                        View Profile
                    </button>
                </div>
            </li>
        </div>
    ))}
</ul>

        </div>
    );
}

export default UserList;
