


import { useContext } from 'react';
import { UserContext } from '../contexts';
import { CloudinaryContext } from '../contexts';

export const ProfileCard = () => {
    const { profileData } = useContext(UserContext);
    const { imageUrl } = useContext(CloudinaryContext);

    return (
        <div className="flex justify-center py-10 px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-xl bg-white rounded-lg shadow-md p-6 gap-6">
                {/* Image Section */}
                <img
                    className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full object-cover"
                    alt="Profile"
                    src={imageUrl}
                />

                {/* Info Section */}
                <div className="flex flex-col w-full text-left">
                    {/* Name */}
                    <div className="text-2xl font-semibold text-gray-800">
                        {profileData.firstName} {profileData.lastName}
                    </div>

                    {/* Location */}
                    <div className="text-base text-gray-600 mt-1">
                        {profileData.city}, {profileData.state}
                    </div>

                    {/* Contact Details */}
                    <div className="flex flex-col gap-2 mt-4 text-gray-600">
                        <div className="flex items-center">
                            <span className="font-medium text-gray-800 mr-2">Phone:</span>
                            <span>{profileData.phoneNumber}</span>
                        </div>
                        <div className="font-medium text-gray-800">{profileData.email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;