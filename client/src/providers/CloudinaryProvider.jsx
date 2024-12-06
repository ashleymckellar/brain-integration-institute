/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CloudinaryContext } from '../contexts';
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

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
    const [certificates, setCertificates] = useState([]);
    const [imagesByDocType, setImagesByDocType] = useState([]);
    const [expandedSection, setExpandedSection] = useState(null);
    const [uploadedSections, setUploadedSections] = useState([]);
    // const [sectionFiles, setSectionFiles] = useState({});
    const [processedUploads, setProcessedUploads] = useState([]);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const uwConfig = {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,

        resource_type: 'auto',
    };
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`;
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
    const apiKey = import.meta.VITE_CLOUDINARY_API_KEY;

    //gets file metadata
    const getFiles = async () => {
        try {
            // Check if the user email is available
            if (!user || !user.email) {
                console.error('User email is missing');
                return [];
            }

            // Fetch the access token
            const accessToken = await getAccessTokenSilently();
            if (!accessToken) {
                console.error('Access token is missing');
                return [];
            }

            // Fetch files from the API
            const email = user.email;
            const response = await axios.get(
                `http://${baseUrl}/api/files/${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            // Handle case where response might be null or not OK
            if (!response || !response.data || !response.data.files) {
                // console.error('No files found or invalid response');
                return [];
            }

            return response.data.files;
        } catch (error) {
            console.error('Error fetching files:', error);
            return [];
        }
    };

    //gets files from Cloudinary via callback/cors proxy
    const getFilesInFolder = async () => {
        try {
            if (!user || !user.email) {
                throw new Error('User email is missing');
            }

            const nickname = user.email.split('@')[0];
            const accessToken = await getAccessTokenSilently();

            const response = await axios.get(
                `http://${baseUrl}/api/images/${nickname}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            if (!response || !response.data || !response.data.files) {
                console.error('No files found or invalid response');
                return [];
            }
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching files:', error);
            return [];
        }
    };

    // if (!user || !user.email) {
    //     console.error('User email is missing');
    //     return [];
    // }

    const getUserMetaData = async (email) => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.get(
                `http://${baseUrl}/api/user/${user.email}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            const metaData = response.data;
            setUserMetaData(metaData);
            setImageUrl(metaData.userProfilePicture);

            return metaData;
        } catch (error) {
            console.error('Error fetching user metadata:', error);
        }
    };

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

    //this function is being called inside getStudyGuide in accordioncard

    const updateUserProgress = async (newProgress) => {
        console.log('updateUserProgress called with:', newProgress);
        //this works
        if (user) {
            try {
                const accessToken = await getAccessTokenSilently();
                console.log('Updating user progress:', {
                    userUploadProgress: newProgress,
                });

                const response = await fetch(
                    `http://${baseUrl}/api/user/${user.email}/progress`,
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
        if (!email) {
            console.error('Email is required to update the study guide.');
            return;
        }

        try {
            const accessToken = await getAccessTokenSilently();

            const response = await fetch(
                `http://${baseUrl}/api/user/${email}/study-guide`,
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
            // const newProgress = Math.min(progress + 1, 8);
            try {
                if (progress < 8) {
                    const newProgress = progress + 1;

                    setProgress(newProgress);
                } // Update state only after success
            } catch (error) {
                console.error('Error updating user progress:', error);
            }

            //call setProgress here, not in accordion
        } catch (error) {
            console.error('Error updating user study guide:', error);
        }
    };

    const updateUserDocumentStatus = async (
        documentType,
        newStatus,
        notificationType,
    ) => {
        if (user) {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await fetch(
                    `http://${baseUrl}/api/user/${user.email}/document-status`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            documentType,
                            newStatus,
                            notificationType,
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

    const sendAdminNotification = async (user, selectedDocumentType) => {
        const accessToken = await getAccessTokenSilently();

        // const stripe = await stripePromise();
        const response = await fetch('/api/admin-notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                notificationType: 'docStatusUpdate',
                userEmail: user,
                category: selectedDocumentType,
            }),
        });
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
                    // Handle only the success event
                    if (!error && result && result.event === 'success') {
                        console.log('Upload successful:', result.info);
                        onUploadSuccess(section);

                        // Prevent duplicate POST requests for the same file
                        if (processedUploads.includes(result.info.public_id)) {
                            console.log(
                                'Duplicate event ignored:',
                                result.info.public_id,
                            );
                            return;
                        }

                        setProcessedUploads((prev) => [
                            ...prev,
                            result.info.public_id,
                        ]);

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

                        // Update progress if applicable
                        if (
                            !uploadedSections.includes(section) &&
                            progress < 8
                        ) {
                            const newProgress = progress + 1;

                            setProgress(newProgress);
                            setUploadedSections((prevSections) => [
                                ...prevSections,
                                section,
                            ]);
                            await updateUserProgress(newProgress);
                        }

                        // Send metadata to the server
                        try {
                            const accessToken = await getAccessTokenSilently();
                            const response = await fetch(
                                `http://${baseUrl}/api/files`,
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

    const handleUploadClick = async (section) => {
        setSectionName(section);
        // Initialize Cloudinary widget with a callback for successful upload
        initializeCloudinaryWidget(section, onUploadSuccess);
    };

    const onUploadSuccess = async (documentType) => {
        const newStatus = 'pending approval';
        const updatedStatus = {
            ...certListUploadStatus,
            [documentType]: newStatus,
        };

        setCertListUploadStatus(updatedStatus);
        try {
            // Update the user's document status
            await updateUserDocumentStatus(
                documentType,
                newStatus,
                'docStatusUpdate',
            );

            // Send admin notification
            await sendAdminNotification(user.email, documentType);

            console.log('Updated certListUploadStatus:', updatedStatus);
            console.log('Calling updateUserProgress with value:', 1);
        } catch (error) {
            console.error('Error in onUploadSuccess:', error);
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
                                `http://${baseUrl}/api/user/${user.email}/profile-picture`,
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

    const deleteFile = async (publicId, sectionName) => {
        console.log(publicId, 'publicId');
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(
                `http://${baseUrl}/api/files/${publicId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            // const newStatus = 'pending approval';
            // const updatedStatus = {
            //     ...certListUploadStatus,
            //     [documentType]: newStatus,
            // };

            // setCertListUploadStatus(updatedStatus);
            // try {
            //     // Update the user's document status
            //     await updateUserDocumentStatus(
            //         documentType,
            //         newStatus,
            //         'docStatusUpdate',
            //     );

            if (response.ok) {
                const newStatus = 'waiting for upload';
                const updatedStatus = {
                    ...certListUploadStatus,
                    [sectionName]: newStatus,
                };

                await updateUserDocumentStatus(
                    sectionName,
                    newStatus,
                    'docStatusUpdate',
                );

                // Remove file from metadata and files state
                const updatedFileMetaData = fileMetaData.filter(
                    (file) => file.publicId !== publicId,
                );
                setFileMetaData(updatedFileMetaData); // update state with the new metadata
                setFiles((prevFiles) =>
                    prevFiles.filter((file) => file.publicId !== publicId),
                );
                setCertListUploadStatus(updatedStatus);

                // Update the user's document status

                // Check if there are still any files in the section
                const remainingFilesInSection = updatedFileMetaData.filter(
                    (metadata) =>
                        metadata.sectionName === sectionName &&
                        metadata.filename !== undefined,
                );

                console.log(
                    remainingFilesInSection,
                    'remaining files in section',
                );
                if (remainingFilesInSection.length === 0 && progress > 0) {
                    // No files left, decrement progress and unmark section as uploaded
                    const newProgress = progress - 1; // Prevent progress from going below 0
                    setProgress(newProgress);
                    setUploadedSections((prevSections) =>
                        prevSections.filter(
                            (uploadedSection) =>
                                uploadedSection !== sectionName,
                        ),
                    );
                    await updateUserProgress(newProgress);
                }

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
                                `http://${baseUrl}/api/images/certificate`,
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
                                setCertificates(certificateData);
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

            console.log(
                'Sending GET request to:',
                `http://${baseUrl}/api/images/certificate`,
            );
            const response = await axios.get(
                `http://${baseUrl}/api/images/certificate`,
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

    const deleteCertificate = async (publicId) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(
                `http://${baseUrl}/api/images/certificate/${publicId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            if (response.ok) {
                console.log('File and metadata deleted successfully.');

                setCertificates((prevCertificateData) =>
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

    const isApprovedForAssessment = () => {};

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
                certificates,
                setCertificates,
                onUploadSuccess,
                publicId,
                setPublicId,
                imagesByDocType,
                setImagesByDocType,
            }}
        >
            {loaded && children}
        </CloudinaryContext.Provider>
    );
};
