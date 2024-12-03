/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from 'react';
import ProfileEditIcon from '../assets/icons/profileEditIcon.png';
import { CloudinaryContext } from '../contexts';
import { UserContext } from '../contexts';
import { useAuth0 } from '@auth0/auth0-react';
import Skeleton from 'react-loading-skeleton';

export const ProfilePhotoUpload = ({ size = 400 }) => {
    const {
        uploadProfilePicture,
        getUserMetaData,
        userMetaData,
        setUserMetaData,
    } = useContext(CloudinaryContext);

    const { profileData } = useContext(UserContext);
    const { isAuthenticated, user } = useAuth0();
    const [profilePictureUrl, setProfilePictureUrl] = useState(user?.picture);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const token = localStorage.getItem('token');
                try {
                    const fetchedUserMetaData = await getUserMetaData(token);
                    setUserMetaData(fetchedUserMetaData);

                    // Update profile picture URL if it exists in user metadata
                    if (fetchedUserMetaData?.userProfilePicture) {
                        setProfilePictureUrl(fetchedUserMetaData.userProfilePicture);
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

    const handleProfilePictureUpload = async () => {
        try {
            const newProfilePictureUrl = await uploadProfilePicture();
            if (newProfilePictureUrl) {
                setProfilePictureUrl(newProfilePictureUrl);
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
        <div className="flex flex-col items-center">
            {isAuthenticated ? (
                <div className="relative">
                    {profilePictureUrl ? (
                        <img
                            className="rounded-full"
                            src={profilePictureUrl}
                            alt="avatar"
                            style={{  width: size }}
                        />
                    ) : (
                        <Skeleton
                            circle={true}
                            height={size}
                            width={size}
                        />
                    )}
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
