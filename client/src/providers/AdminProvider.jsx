/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AdminContext } from '../contexts';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

export const AdminProvider = ({ children }) => {
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        user,
        getAccessTokenSilently,
    } = useAuth0();

    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [individualUser, setIndividualUser] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [fileModalOpen, setFileModalOpen] = useState(false);
    const [selectedDocumentName, setSelectedDocumentName] = useState('');
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const getManagementToken = async () => {
        const response = await axios.post(
            `https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`,
            {
                client_id: import.meta.env.VITE_AUTH0_M2M_CLIENT_ID,
                client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
                audience: `https://${
                    import.meta.env.VITE_AUTH0_DOMAIN
                }/api/v2/`,
                grant_type: 'client_credentials',
            },
        );

        return response.data.access_token;
    };

    async function getAllUsers() {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get(`${baseUrl}/api/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    per_page: 50,
                    page: 0,
                },
            });
            setUsers(response.data);
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    //get user by Id
    const getUserById = async (userId) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get(`/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setIndividualUser(response.data);
            console.log(individualUser)
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const changeAdminStatus = async (email, adminStatus) => {
        const accessToken = await getAccessTokenSilently();
        try {
            const response = await fetch(
                `${baseUrl}/api/user/${email}/is-admin`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        isAdmin: adminStatus,
                    }),
                },
            );
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to update admin status:', errorData);
                throw new Error(
                    errorData.error || 'Failed to update admin status',
                );
            }

            const updatedUser = await response.json();
            console.log('Admin status updated:', updatedUser);
        } catch (error) {
            console.error('Error updating user to admin:', error);
        }
    };

    const deleteUser = async (userEmail) => {
        try {
            const accessTokenforBackend = await getAccessTokenSilently();
            const tokenResponse = await axios.post(
                `/api/admin/get-management-token`,
                {
                    client_id: import.meta.env.VITE_AUTH0_M2M_CLIENT_ID,
                    client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
                    audience: `https://${
                        import.meta.env.VITE_AUTH0_DOMAIN
                    }/api/v2/`,
                    grant_type: 'client_credentials',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessTokenforBackend}`, 
                    },
                },
            );

            const { accessToken } = tokenResponse.data;
            const userResponse = await axios.get(
                `https://${
                    import.meta.env.VITE_AUTH0_DOMAIN
                }/api/v2/users-by-email`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: { email: userEmail },
                },
            );

            const user = userResponse.data[0];
            const userId = user.user_id;

            await axios.delete(
                `${baseUrl}/api/admin/delete-user/${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessTokenforBackend}`,
                    },
                    data: {
                        accessToken: accessToken,
                    },
                },
            );

            console.log(`User with email ${userEmail} deleted successfully`);

            await axios.delete(`${baseUrl}/api/user/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${accessTokenforBackend}`,
                },
            });

            console.log(`User with email ${userEmail} deleted successfully`);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const fetchProfileData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `/api/profile/${individualUser.userEmail}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await getAccessTokenSilently()}`,
                    },
                },
            );

            if (!response.ok) {
                setProfileData({});
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (!data || Object.keys(data).length === 0) {
                setProfileData({});
            } else {
                setProfileData((prev) => ({ ...data }));
                console.log(profileData);
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            setError(error.message);
        } finally {
            setLoading(false); // Stop loading indicator once data is fetched
        }
    };

    const updateDocumentStatusbyAdmin = async (
        individualUser,
        newDocStatus,
        selectedDocumentType,
    ) => {
        if (user) {
            try {
                const accessToken = await getAccessTokenSilently();

                const updateBody = {
                    certListUploadStatus: {
                        [selectedDocumentType]: newDocStatus,
                    },
                };

                const response = await fetch(
                    `${baseUrl}/api/user/${individualUser.userEmail}/document-status`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify(updateBody),
                    },
                );

                console.log('Response Status:', response.status);
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error(
                        'Failed to update user doc status:',
                        errorData,
                    );
                    throw new Error('Failed to update user doc status');
                }

                const data = await response.json();
                console.log('User doc status updated on the server:', data);
                return data;
            } catch (error) {
                console.error('Error updating user doc status:', error);
            }
        } else {
            console.error('User is not defined');
        }
    };
    return (
        <AdminContext.Provider
            value={{
                changeAdminStatus,
                getManagementToken,
                getAllUsers,
                users,
                setUsers,
                getUserById,
                individualUser,
                setIndividualUser,
                profileData,
                setProfileData,
                fetchProfileData,
                showModal,
                setShowModal,
                fileModalOpen,
                setFileModalOpen,
                selectedDocumentName,
                setSelectedDocumentName,
                updateDocumentStatusbyAdmin,
                deleteUser,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
