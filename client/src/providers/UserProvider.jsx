/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { UserContext } from '../contexts';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export const UserProvider = ({ children }) => {
    const initialValues = {
        firstName: '',
        lastName: '',
        suffix: '',
        title: '',
        phoneNumber: '',
        website: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        bio: '',
    };

    const [inputs, setInputs] = useState(initialValues);
    const { getAccessTokenSilently, user } = useAuth0();
    const [profileData, setProfileData] = useState(null); //state for authenticated user's profile
    const [singleProfile, setSingleProfile] = useState({}) //state for any profile, based on the card that's clicked, not 
    //necessarily the person who's logged in
    const [allProfiles, setAllProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeNotifications, setActiveNotifications] = useState([]);
    const [isNotificationDrawerOpen, setisNotificationDrawerOpen] =
        useState(false);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const resetInputs = () => {
        setInputs(initialValues);
    };

    const createProfileData = async () => {
        console.log('making post req to /api/profile/create-profile');

        try {
            const accessToken = await getAccessTokenSilently();
            console.log(accessToken);

            const updatedInputs = {
                ...inputs,
                email: user.email,
            };

            const response = await fetch(
                `http://${baseUrl}/api/profile/create-profile`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(updatedInputs),
                },
            );

            if (!response.ok) {
                throw new Error(
                    `Server responded with status: ${response.status}`,
                );
            }
            const data = await response.json();

            if (!data.success) throw new Error(data.error);

            // Reset inputs after successful submission
            resetInputs();
            return data;
        } catch (error) {
            console.error('Failed to create profile:', error);
            throw error;
        }
    };

    // console.log(inputs);
    //
    const editProfileData = async (updatedData) => {
        console.log('Updated data being sent:', updatedData);

        const filteredData = Object.fromEntries(
            Object.entries(updatedData).filter(
                ([key, value]) => value !== '' && value !== null,
            ),
        );
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(
                `http://${baseUrl}/api/profile/${user.email}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(filteredData),
                },
            );
            if (!response.ok) {
                throw new Error(
                    `Failed to update profile: ${response.statusText}`,
                );
            }
            const result = await response.json();

            if (result.success) {
                console.log('Profile updated successfully');
            } else {
                console.error('Profile update failed:', result.message);
            }
            return result;
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    //fetch one profile by email
    const fetchProfileData = async () => {
        if (user && user.email) {
            try {
                setLoading(true);
                const response = await fetch(`/api/profile/${user.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await getAccessTokenSilently()}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError(error.message);
            }
        }
    };

    const fetchSingleProfile = async (email) => {
        
            try {
                setLoading(true);
                const response = await fetch(`/api/profile/${email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await getAccessTokenSilently()}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data, 'single profile data')
                setSingleProfile(data);
                console.log(singleProfile, 'state updated')
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError(error.message);
            }
        
    };

    const fetchNotifications = async () => {
        if (user?.email) {
            console.log('fetching notifications!')
            try {
                setLoading(true);
                const response = await fetch(
                    `/api/notifications/${user.email}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${await getAccessTokenSilently()}`,
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                const unreadNotifications = Object.values(data)
                    .flat()
                    .filter((notification) => !notification.hasBeenRead);

                setActiveNotifications(unreadNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleReviewClick = async (navigate, userEmail, id) => {
        navigate(`/admin/practitioner-management/${userEmail}#${id}`);
        setisNotificationDrawerOpen(false);
           await markNotificationAsRead(id);
        fetchNotifications();
    };

    const markNotificationAsRead = async (id) => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.put(
                `/api/notifications/${id}/has-been-read`,
                { hasBeenRead: true },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            // Update state with filtered notifications
            setActiveNotifications((prev) =>
                prev.filter((notification) => notification.uniqueid !== id),
            );

            console.log('Notification marked as read:', id);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // const handleReviewClick = (navigate, userEmail, id) => {
    //     navigate(`/admin/practitioner-management/${userEmail}#${id}`);
    //     setisNotificationDrawerOpen(false);
    // };

    const handleCertificateDownloadClick = (navigate) =>{
    navigate('/profile')
    setisNotificationDrawerOpen(false)  

    
}

const handleAdminPromoteClick = (navigate) => {
     navigate('/admin/practitioner-management')
}

    // }  will nav user to profile to download certification once certification is approved and they get the notification.

    const filteredNotifications = activeNotifications.reduce(
        (acc, notification) => {
            const existing = acc.find(
                (item) => item.category === notification.category,
            );

            if (
                !existing ||
                new Date(notification.timestamp) > new Date(existing.timestamp)
            ) {
                // Replace older notifications with the newer one
                return acc
                    .filter((item) => item.category !== notification.category)
                    .concat(notification);
            }

            return acc;
        },
        [],
    );

    const fetchAllProfiles = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await getAccessTokenSilently()}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setAllProfiles(data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            setError(error.message);
        }
    };

    // Pass the values from the custom hook to the context provider
    return (
        <UserContext.Provider
            value={{
                inputs,
                setInputs,
                handleInputChange,
                createProfileData,
                resetInputs,
                fetchProfileData,
                error,
                setError,
                loading,
                setLoading,
                profileData,
                setProfileData,
                initialValues,
                editProfileData,
                fetchAllProfiles,
                allProfiles,
                setAllProfiles,
                fetchNotifications,
                activeNotifications,
                setActiveNotifications,
                markNotificationAsRead,
                isNotificationDrawerOpen,
                setisNotificationDrawerOpen,
                filteredNotifications,
                handleCertificateDownloadClick, 
                handleReviewClick,
                handleAdminPromoteClick,
                fetchSingleProfile,
                singleProfile,
                setSingleProfile
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
