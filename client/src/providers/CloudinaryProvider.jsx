/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CloudinaryContext } from '../contexts';
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

// Cloudinary Provider Component
export const CloudinaryProvider = ({ children }) => {
    // eslint-disable-next-line no-unused-vars
    const [publicId, setPublicId] = useState('');
    const [filename, setFilename] = useState('');
    const [loaded, setLoaded] = useState(false);
    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [files, setFiles] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [sectionName, setSectionName] = useState('');
    const [fileMetaData, setFileMetaData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [studyGuideAccess, setStudyGuideAccess] = useState(false);
    const [email, setEmail] = useState('');
    const [userMetaData, setUserMetaData] = useState({});

    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [imageUrl, setImageUrl] = useState(user?.userProfilePicture || '');
    const [profilePhotoUploaded, setProfilePhotoUploaded] = useState(false);
    const [certListUploadStatus, setCertListUploadStatus] = useState({});
    const [certificateData, setCertificateData] = useState({});
    // const [imagesByDocType, setImagesByDocType] = useState([]);

    const handleProfileUpload = () => {
        console.log('photo uploaded!');
    };

    const uwConfig = {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,

        resource_type: 'auto',
    };
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`;
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
    const apiKey = import.meta.VITE_CLOUDINARY_API_KEY;

    // console.log(isAuthenticated);

    //gets file metadata
    const getFiles = async () => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.get(
                `http://localhost:8080/api/files`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            return response.data.files;
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    // console.log(user);

    //gets files from Cloudinary via callback/cors proxy
    const getFilesInFolder = async () => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.get(
                `http://localhost:8080/api/images/${user.nickname}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const getUserMetaData = async (email) => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.get(
                `http://localhost:8080/api/user/${user.email}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            const metaData = response.data;

            // Update state with the fetched metadata
            setUserMetaData(metaData);
            setImageUrl(metaData.userProfilePicture);

            return metaData;
        } catch (error) {
            console.error('Error fetching user metadata:', error);
        }
    };

    // const getFilesByDocType = async (nickname, documentType) => {
    //     try {
    //         const accessToken = await getAccessTokenSilently();
    //         const response = await fetch(
    //             `/api/images/${nickname}/${documentType}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             },
    //         );
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch images');
    //         }
    //         const images = await response.json();
    //         setImagesByDocType(images);
    //     } catch (error) {
    //         console.error('Error fetching images:', error);
    //     }
    // };

    // eslint-disable-next-line no-unused-vars
    const cld = new Cloudinary({
        cloud: {
            cloudName: uwConfig.cloudName,
            uploadPreset: uwConfig.uploadPreset,
            asset_folder: uwConfig.asset_folder,
        },
    });

    useEffect(() => {
        if (!loaded) {
            const uwScript = document.getElementById('uw');
            if (!uwScript) {
                const script = document.createElement('script');
                script.setAttribute('async', '');
                script.setAttribute('id', 'uw');
                script.src =
                    'https://upload-widget.cloudinary.com/global/all.js';
                script.addEventListener('load', () => setLoaded(true));
                document.body.appendChild(script);
            } else {
                setLoaded(true);
            }
        }
        return () => {
            const uwScript = document.getElementById('uw');
            if (uwScript) {
                uwScript.removeEventListener('load', () => setLoaded(true));
            }
        };
    }, [loaded]);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
        }
    }, [user]);

    //this whole function is being called inside getStudyGuide in accordioncard

    const updateUserProgress = async (newProgress) => {
        console.log('updateUserProgress called with:', newProgress);
        //this works
        if (user) {
            try {
                const accessToken = await getAccessTokenSilently();
                console.log('Updating user progress:', {
                    userUploadProgress: newProgress,
                });
                console.log('User email:', user.email);
                console.log('User object:', user);

                const response = await fetch(
                    `http://localhost:8080/api/user/${user.email}/progress`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            userUploadProgress: newProgress,
                        }),
                    },
                );

                console.log('Response Status:', response.status);
                console.log('Response Status Text:', response.statusText);

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Failed to update user progress:', errorData);
                    throw new Error('Failed to update user progress');
                }

                const data = await response.json();
                console.log('User progress updated on the server:', data);
            } catch (error) {
                console.error('Error updating user progress:', error);
            }
        } else {
            console.error('User is not defined');
        }
    };

    const updateUserStudyGuide = async (email) => {
        console.log('updateUserStudyGuide called');
        if (!email) {
            console.error('Email is required to update the study guide.');
            return;
        }

        try {
            const accessToken = await getAccessTokenSilently();
            console.log('Access Token:', accessToken);
            console.log('Updating study guide for:', email);

            const response = await fetch(
                `http://localhost:8080/api/user/${email}/study-guide`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ studyGuideAccess: true }),
                },
            );

            console.log('Response Status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to update user study guide:', errorData);
                throw new Error('Failed to update user study guide');
            }

            const data = await response.json();
            console.log('User study guide updated on the server:', data);
            setStudyGuideAccess(true);
            const newProgress = Math.min(progress + 1, 8);
            if (newProgress > progress) {
                try {
                    await updateUserProgress(newProgress);
                    console.log('User progress updated to:', newProgress);
                    setProgress(newProgress); // Update state only after success
                } catch (error) {
                    console.error('Error updating user progress:', error);
                }
            } else {
                console.log('Progress is already at maximum:', newProgress);
            }
            //call setProgress here, not in accordion
        } catch (error) {
            console.error('Error updating user study guide:', error);
        }
    };

    const updateUserDocumentStatus = async (newDocStatus) => {
        if (user) {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await fetch(
                    `http://localhost:8080/api/user/${user.email}/document-status`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            certListUploadStatus: newDocStatus,
                        }),
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

    const initializeCloudinaryWidget = (section) => {
        if (user) {
            const myWidget = window.cloudinary.createUploadWidget(
                {
                    cloudName: uwConfig.cloudName,
                    uploadPreset: uwConfig.uploadPreset,
                    asset_folder: `users/${user.nickname}/${section}`,
                },
                async (error, result) => {
                    if (error) {
                        console.error('Upload error:', error);
                        return;
                    }
                    if (result.event === 'success') {
                        console.log('Upload successful:', result.info);
                        const newProgress = Math.max(progress + 1, 8);

                        setProgress(newProgress);
                        await updateUserProgress(newProgress);

                        const fileMetadata = {
                            publicId: result.info.public_id,
                            url: result.info.secure_url,
                            uploadDate: result.info.created_at,
                            filename: result.info.original_filename,
                            sectionName: section,
                            isApproved: false,
                        };

                        setPublicId(result.info.public_id);
                        setFilename(result.info.original_filename);
                        setFileMetaData((prevMetaData) => [
                            ...prevMetaData,
                            fileMetadata,
                        ]);

                        // Send metadata to the server
                        try {
                            const accessToken = await getAccessTokenSilently();
                            const response = await fetch(
                                'http://localhost:8080/api/files',
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${accessToken}`,
                                    },
                                    body: JSON.stringify(fileMetadata),
                                },
                            );

                            if (response.ok) {
                                console.log(
                                    'File metadata successfully sent to the server.',
                                );
                                setFiles((prevFiles) => [
                                    ...prevFiles,
                                    fileMetadata,
                                ]);
                            } else {
                                console.error(
                                    'Failed to send file metadata to the server.',
                                );
                            }
                        } catch (error) {
                            console.error(
                                'Error sending file metadata:',
                                error,
                            );
                        }
                    }
                },
            );

            myWidget.open();
        }
    };

    const uploadProfilePicture = (file) => {
        if (user) {
            const myWidget = window.cloudinary.createUploadWidget(
                {
                    cloudName: uwConfig.cloudName,
                    uploadPreset: uwConfig.uploadPreset,
                    asset_folder: `users/${user.nickname}/profilePic`,
                },
                async (error, result) => {
                    if (error) {
                        console.error('Upload error:', error);
                        return;
                    }
                    if (result.event === 'success') {
                        console.log('Upload successful:', result.info);

                        const userMetaData = {
                            userProfilePicture: result.info.secure_url,
                        };

                        setImageUrl(result.info.secure_url);
                        setProfilePhotoUploaded(true);

                        try {
                            const accessToken = await getAccessTokenSilently();
                            const response = await fetch(
                                `http://localhost:8080/api/user/${user.email}/profile-picture`,
                                {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${accessToken}`,
                                    },
                                    body: JSON.stringify(userMetaData),
                                },
                            );

                            if (response.ok) {
                                console.log(
                                    'User metadata successfully sent to the server.',
                                );
                            } else {
                                console.error(
                                    'Failed to send user metadata to the server.',
                                );
                            }
                        } catch (error) {
                            console.error(
                                'Error sending user metadata:',
                                error,
                            );
                        } finally {
                            myWidget.close();
                        }
                    }
                },
            );

            myWidget.open();
        }
    };

    const updateUserMetadata = async (newStatus) => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await fetch(
                `http://localhost:8080/api/user/${email}/metadata`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        certListUploadStatus: newStatus,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error('Failed to update user metadata');
            }

            const updatedUser = await response.json();
            console.log('User metadata updated:', updatedUser);
        } catch (error) {
            console.error('Error updating user metadata:', error);
        }
    };

    //delete certification file
    const deleteFile = async (publicId, sectionName) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(
                `http://localhost:8080/api/files/${publicId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            if (response.ok) {
                console.log('File and metadata deleted successfully.');
                const updatedStatus = {
                    ...certListUploadStatus,
                    [sectionName]: 'Waiting for Upload', // Update status based on section
                };
                console.log(
                    'Updated status before PUT request:',
                    updatedStatus,
                );
                await updateUserDocumentStatus(updatedStatus);
                setFileMetaData((prevMetaData) =>
                    prevMetaData.filter((file) => file.publicId !== publicId),
                );
                setFiles((prevFiles) =>
                    prevFiles.filter((file) => file.publicId !== publicId),
                );
                setCertListUploadStatus(updatedStatus);
                setDeleteModalOpen(false);
            } else {
                console.error('Failed to delete file.');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const uploadCompletionCertificate = (file) => {
        if (user) {
            const myWidget = window.cloudinary.createUploadWidget(
                {
                    cloudName: uwConfig.cloudName,
                    uploadPreset: uwConfig.uploadPreset,
                    asset_folder: `certificate`,
                },
                async (error, result) => {
                    if (error) {
                        console.error('Upload error:', error);
                        return;
                    }
                    if (result.event === 'success') {
                        console.log('Upload successful:', result.info);

                        // Certificate data to send to the server
                        const certificateData = {
                            publicId: result.info.public_id,
                            url: result.info.secure_url,
                            uploadDate: result.info.created_at,
                            filename: result.info.original_filename,
                        };

                        console.log(
                            'Uploaded certificate URL:',
                            result.info.secure_url,
                        );

                        try {
                            const accessToken = await getAccessTokenSilently();
                            const response = await fetch(
                                'http://localhost:8080/api/images/certificate',
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${accessToken}`,
                                    },
                                    body: JSON.stringify(certificateData),
                                },
                            );

                            if (response.ok) {
                                console.log(
                                    'Certificate data successfully sent to the server.',
                                );
                                setCertificateData(certificateData);
                            } else {
                                console.error(
                                    'Failed to send certificate data to the server.',
                                );
                            }
                        } catch (error) {
                            console.error(
                                'Error sending certificate data:',
                                error,
                            );
                        }
                    }
                },
            );

            myWidget.open();
        }
    };

    //get certificate file from cloudinary

    const getCertificate = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get(
                `http://localhost:8080/api/images/certificate`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            return response.data.certificate;
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const deleteCertificate = async (publicId) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(
                `http://localhost:8080/api/images/certificate/${publicId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            if (response.ok) {
                console.log('File and metadata deleted successfully.');

                setCertificateData((prevCertificateData) =>
                    prevCertificateData.filter(
                        (cert) => cert.publicId !== publicId,
                    ),
                );
            } else {
                console.error('Failed to delete file.');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <CloudinaryContext.Provider
            value={{
                uwConfig,
                initializeCloudinaryWidget,
                filename,
                getFiles,
                getFilesInFolder,
                files,
                progress,
                setProgress,
                isSubmitted,
                setIsSubmitted,
                sectionName,
                setSectionName,
                fileMetaData,
                setFileMetaData,
                setFiles,
                isLoading,
                getUserMetaData,
                updateUserProgress,
                deleteFile,
                deleteModalOpen,
                setDeleteModalOpen,
                updateUserStudyGuide,
                studyGuideAccess,
                setStudyGuideAccess,
                email,
                uploadProfilePicture,
                profilePhotoUploaded,
                setProfilePhotoUploaded,
                imageUrl,
                userMetaData,
                setUserMetaData,
                showPayment,
                setShowPayment,
                showModal,
                setShowModal,
                certListUploadStatus,
                setCertListUploadStatus,
                updateUserDocumentStatus,
                uploadCompletionCertificate,
                deleteCertificate,
                getCertificate,
                certificateData,
                setCertificateData
              
            }}
        >
            {loaded && children}
        </CloudinaryContext.Provider>
    );
};
