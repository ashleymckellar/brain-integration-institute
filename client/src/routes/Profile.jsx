import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useState, useContext, useEffect } from 'react';
import banner from '../assets/icons/PractitionerBackground.png';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';
import unlock from '../assets/icons/unlock.png';
import { UserContext } from '../contexts';
import ProfileEditForm from '../components/ProfileEditForm';
import ProfileCard from '../components/ProfileCard';

export const Profile = withAuthenticationRequired(() => {
    const { user } = useAuth0();
    const { fetchProfileData, profileData } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);

    const [sectionName, setSectionName] = useState('profile');

    useEffect(() => {
        fetchProfileData(user);
    }, [user]);

    const handleTabClick = (section) => {
        setSectionName(section);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div className="flex flex-col">
            {/* Banner Section */}
            <div
                className="w-full h-64 sm:h-80 md:h-96 relative bg-white"
                style={{
                    backgroundImage: `url(${banner}), url(${paleBanner})`,
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-fenix font-normal">
                        Practitioner Profile
                    </h1>
                </div>
            </div>
            {/* Tabs Section */}
            <div className="flex justify-center mt-10">
                <div className="flex flex-wrap justify-between gap-4 w-full max-w-4xl border-2 p-2 border-gray-300 rounded-lg bg-white shadow-md">
                    {['profile', 'password', 'professional'].map((section) => (
                        <button
                            key={section}
                            onClick={() => handleTabClick(section)}
                            className={`flex-1 p-2 rounded-lg ${
                                sectionName === section
                                    ? 'bg-pale-green'
                                    : 'bg-white'
                            }`}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            {/* Content Section */}
            <div className="flex flex-col px-4 sm:px-8 mt-10">
                <ProfilePhotoUpload />
                {/* <h3 className="text-center font-poppins text-xl sm:text-2xl mb-4">
                    {profileData
                        ? `${profileData.firstName} ${profileData.lastName}`
                        : user.email}
                </h3> */}

                {/* Profile Section */}
                {(!sectionName || sectionName === 'profile') && (
                    <div className="flex flex-col items-center gap-6 p-6   mx-auto bg-white shadow-md rounded-lg">
                        {profileData ? (
                            <>
                                <p className="text-lg font-semibold text-gray-700">
                                    Welcome back
                                </p>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {profileData.firstName}{' '}
                                    {profileData.lastName} {profileData.suffix}
                                </h3>

                                <div className="flex flex-col text-gray-700 text-center mt-4">
                                    <p>{profileData.addressLine1}</p>
                                    {profileData.addressLine2 && (
                                        <p>{profileData.addressLine2}</p>
                                    )}
                                    <p>
                                        {profileData.city}, {profileData.state}{' '}
                                        {profileData.zip} {profileData.country}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center mt-4 text-gray-700">
                                    <p className="font-medium">
                                        Phone: {profileData.phoneNumber}
                                    </p>
                                    <p className="font-medium">
                                        Email: {profileData.email}
                                    </p>
                                </div>

                                {profileData.bio && (
                                    <p className="mt-4 px-4 text-sm text-gray-600 italic text-center">
                                        {profileData.bio}
                                    </p>
                                )}

                                <div className="flex items-center justify-center gap-4 pt-6">
                                    <img
                                        src={unlock}
                                        alt="Unlock Icon"
                                        className="w-6 h-6"
                                    />
                                    <button
                                        onClick={handleEditClick}
                                        className="bg-medium-pale-green hover:bg-green-600 rounded-full w-[204px] h-[43px] text-white font-medium px-6 py-2"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div>
                                <div className=" flex flex-col pl-4 text-center  justify-start gap-10 pb-20 ">
                                    <h2 className="font-fira text-3xl ">
                                        My Profile
                                    </h2>
                                    <h3 className="font-fira text-black text-xl text-opacity-60">
                                        Set your account settings below.
                                        <br></br>
                                        <br></br>This information will be shown
                                        on your public practitioner page.
                                    </h3>
                                </div>
                                <div className="flex justify-end pb-20 gap-10">
                                    <img src={unlock} />
                                    <button
                                        onClick={handleEditClick}
                                        className="bg-medium-pale-green rounded-2xl w-[204px] h-[43px] text-white"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        )}
                        {isEditing && (
                            <ProfileEditForm
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                            />
                        )}
                    </div>
                )}
                {isEditing && <ProfileEditForm setIsEditing={setIsEditing} />}
            </div>
            {sectionName === 'password' && (
                // Password Section
                <div className="flex flex-col items-center text-center gap-6 p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
                    <h2 className="font-fira text-2xl">Reset your password</h2>
                    <p className="text-gray-600">
                        Enter your email to receive a 4-digit code for password
                        reset.
                    </p>
                    <div className=" flex justify-center gap-10 mt-10">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="border rounded px-3 py-2 w-full max-w-md"
                        />
                        <button className="bg-medium-pale-green hover:bg-green-600 rounded-full w-[204px] h-[43px] text-white font-medium px-6 py-2">
                            Get code
                        </button>
                    </div>
                </div>
            )}

            {sectionName === 'professional' && (
                <div className="flex flex-col items-center text-center gap-4 p-6">
                    <h2 className="font-fira text-3xl font-semibold text-gray-800">
                        Professional Page
                    </h2>
                    <p className="text-gray-500 mb-4">
                        View your professional bio below.
                    </p>

                    {profileData ? (
                        <ProfileCard />
                    ) : (
                        <p className="text-gray-600">
                            No professional information available
                        </p>
                    )}
                </div>
            )}
        </div>
    );
});
