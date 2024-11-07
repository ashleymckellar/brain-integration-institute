import { useState, useContext, useEffect } from 'react';
import ProfileEditIcon from '../assets/icons/profileEditIcon.png';

import { CloudinaryContext } from '../contexts';
import { UserContext } from '../contexts';
import { useAuth0 } from '@auth0/auth0-react';

export const ProfilePhotoUpload = () => {
    const {
        uploadProfilePicture,
        getUserMetaData,
        userMetaData,
        setUserMetaData,
    } = useContext(CloudinaryContext);

    const { profileData } =useContext(UserContext)
    const { isAuthenticated, user } = useAuth0();

    // const { userMetaData, setUserMetaData } = props;

    // Local state for profile picture URL
    const [profilePictureUrl, setProfilePictureUrl] = useState(user?.picture);

    // Fetch user metadata on component mount to get the saved profile picture URL
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                console.log(user)
                const token = localStorage.getItem('token');
                try {
                    const fetchedUserMetaData = await getUserMetaData(token);
                    setUserMetaData(fetchedUserMetaData);

                    // Update profile picture URL if it exists in user metadata
                    if (fetchedUserMetaData?.userProfilePicture) {
                        setProfilePictureUrl(
                            fetchedUserMetaData.userProfilePicture,
                        );
                    }
                } catch (error) {
                    console.error(
                        'Error fetching user metadata:',
                        error.response?.data || error.message,
                    );
                }
            }
        };

        fetchData();
    }, []);

    // Handler for uploading a new profile picture
    const handleProfilePictureUpload = async () => {
        try {
            const newProfilePictureUrl = await uploadProfilePicture();
            if (newProfilePictureUrl) {
                setProfilePictureUrl(newProfilePictureUrl);

                // Update user metadata to persist the new profile picture URL
                const updatedUserMetaData = {
                    ...userMetaData,
                    userProfilePicture: newProfilePictureUrl,
                };
                setUserMetaData(updatedUserMetaData);
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    return (
        <div className="flex flex-col items-start">
            {isAuthenticated ? (
                <div className="relative">
                    <img
                        className="h-[200px] w-[200px] rounded-full"
                        src={profilePictureUrl}
                        alt="avatar"
                    />
                    <button onClick={handleProfilePictureUpload}>
                        <img
                            className="h-[32px] w-[32px] absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md"
                            src={ProfileEditIcon}
                            alt="Edit Icon"
                        />
                    </button>
                    {profileData && (
                     <h3 className="mt-4 text-xl pl-5 pr-10 font-semibold text-gray-800 text-center">
                {profileData.firstName} {profileData.lastName}
            </h3> 
                    )}
                </div>
            ) : null}

           
        </div>
    );
};

export default ProfilePhotoUpload;
