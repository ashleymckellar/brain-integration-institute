import { useEffect, useState, useContext } from 'react';
import { AdminContext } from '../contexts';
// import { CloudinaryContext } from '../contexts';
// import { UserContext } from '../contexts';
import { useAuth0 } from '@auth0/auth0-react';
import ProgressBar0 from '../assets/icons/ProgressBar0.png';
import ProgressBar1 from '../assets/icons/ProgressBar1.png';
import ProgressBar2 from '../assets/icons/ProgressBar2.png';
import ProgressBar3 from '../assets/icons/ProgressBar3.png';
import ProgressBar4 from '../assets/icons/ProgressBar4.png';
import ProgressBar5 from '../assets/icons/ProgressBar5.png';
import ProgressBar6 from '../assets/icons/ProgressBar6.png';
import ProgressBar7 from '../assets/icons/ProgressBar7.png';
import ProgressBar8 from '../assets/icons/ProgressBar8.png';
import GreenRedDot from '../assets/icons/GreenRedDots.png';
import Trashcan from '../assets/icons/Trashcan.png';
import Pracsearch from '../assets/icons/Pracsearch.svg';
import { CircleUserRound } from 'lucide-react';

function UserList() {
    const {  getAllUsers, users } =
        useContext(AdminContext);

    // const { fetchProfileData, profileData } = useContext(UserContext);

    const { user } = useAuth0();

    // const { progress } = useContext(CloudinaryContext);

    const isAdmin = user?.['https://brainintegration.com/isAdmin'];

    console.log('Is Admin:', isAdmin);

    const [searchInput, setSearchInput] = useState('');

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

    // const { user } = useAuth0()

    useEffect(() => {
        const fetchUsers = async () => {
            getAllUsers();
        };
        fetchUsers();
    }, []);

    console.log(users);

    const handleChange = (e) => {
        console.log('change handled');
        const { name, value } = e.target;

        setSearchInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    // const handlePromote = async (userId) => {
    //     await updateUserToAdmin(userId); // Call your promotion function here
    //     alert('User promoted to admin!');
    // };

    return (
        <div>
            <div className="flex items-center border border-none rounded-xl w-[660px] bg-gray mb-10">
                <input
                    type="text"
                    id="search"
                    name="search"
                    value={searchInput}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="border-none flex-1 px-2 py-2 bg-transparent"
                />
                <img src={Pracsearch} alt={'magnifying glass'} />
            </div>
            <img src={Trashcan} alt="Trash can" className="pb-10 pl-10" />
            <ul>
                {users.map((user) => (
                    <div
                        className="flex border border-black rounded p-10 mb-10 items-center"
                        key={user.user_id}
                    >
                        <div>
                            <input
                                type="checkbox"
                                className="custom-checkbox"
                            />
                        </div>
                        <li className="flex items-center justify-between w-full gap-[150px]">
                            <div className="flex items-center">
                                <span className="font-bold text-l px-2">
                                    {user.userName}
                                </span>
                                <img
                                    src={GreenRedDot}
                                    alt={'accept/decline radios'}
                                    className="ml-2"
                                />
                            </div>
                            <div className="flex items-center">
                                <img
                                    src={
                                        certProgressImages[
                                            Math.min(
                                                user.userUploadProgress || 0,
                                                certProgressImages.length - 1,
                                            )
                                        ]
                                    }
                                    className="w-auto md:w-auto"
                                    alt={`Progress level ${user.userUploadProgress}`}
                                />
                            </div>
                            <div className="flex justify-center items-center">
                                <button className="border border-black rounded px-4 py-1 ml-4 font-bold">
                                    <CircleUserRound className=' ml-4 '/>
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
