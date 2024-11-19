/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { UserContext } from '../contexts';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const UserProvider = ({ children }) => {
    const initialValues = {
        firstName: '',
        lastName: '',
        suffix: '',
        phoneNumber: '',
        email: '',
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
    const [profileData, setProfileData] = useState(null);
    const [allProfiles, setAllProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeNotifications, setActiveNotifications] = useState([])
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const handleInputChange = (e) => {
        console.log('change handled');
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const resetInputs = () => {
        console.log('inputs reset!');
        setInputs(initialValues);
    };

    const createProfileData = async () => {
        console.log('Inputs being sent:', inputs);

        try {
            const response = await fetch(
                `http://${baseUrl}/api/profile/create-profile`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await getAccessTokenSilently()}`,
                    },
                    body: JSON.stringify(inputs),
                },
            );

            if (!response.ok) {
                throw new Error(
                    `Server responded with status: ${response.status}`,
                );
            }
            const data = await response.json();

            console.log('Response from backend:', data);
            if (!data.success) throw new Error(data.error);

            // Reset inputs after successful submission
            resetInputs();
            return data;
        } catch (error) {
            console.error('Failed to create profile:', error);
            throw error;
        }
    };

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
            console.log(result);
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
                console.log(profileData);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError(error.message);
            }
        }
    }

    const fetchNotifications = async () => {
        if (user?.email) {
            try {
                setLoading(true);
                const response = await fetch(`/api/notifications/${user.email}`, {
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
                console.log('Fetched data:', data);
    
             
                const unreadNotifications = Object.values(data)
                    .flat() 
                    .filter((notification) => !notification.hasBeenRead);
    
                console.log('Unread Notifications:', unreadNotifications);
    
                setActiveNotifications(unreadNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };
    

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
                setAllProfiles(data)
                console.log('profiles set!')
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
                setActiveNotifications
            }}
        >
            {children}
        </UserContext.Provider>
    );
};




