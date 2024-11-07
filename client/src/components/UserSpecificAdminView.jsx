// export default UserSpecificAdminView;

/* eslint-disable react/prop-types */
import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AdminContext } from '../contexts';
// import { CloudinaryContext } from '../contexts';
import ViewFileModal from './ViewFileModal';

import ProgressBar0 from '../assets/icons/ProgressBar0.png';
import ProgressBar1 from '../assets/icons/ProgressBar1.png';
import ProgressBar2 from '../assets/icons/ProgressBar2.png';
import ProgressBar3 from '../assets/icons/ProgressBar3.png';
import ProgressBar4 from '../assets/icons/ProgressBar4.png';
import ProgressBar5 from '../assets/icons/ProgressBar5.png';
import ProgressBar6 from '../assets/icons/ProgressBar6.png';
import ProgressBar7 from '../assets/icons/ProgressBar7.png';
import ProgressBar8 from '../assets/icons/ProgressBar8.png';
import heartPulse from '../assets/icons/heart-pulse.png';
import presentation from '../assets/icons/presentation.png';
import shield from '../assets/icons/shield-half.png';
import briefcase from '../assets/icons/briefcase-medical.png';
import clipboard from '../assets/icons/clipboard-list.png';
import video from '../assets/icons/video.png';
// import graduationCap from '../asset/icons/graduation-cap.png'

const UserSpecificAdminView = () => {
    const {
        individualUser,
        setIndividualUser,
        users,
        fetchProfileData,
        profileData,
       
        fileModalOpen,
        setFileModalOpen,
        selectedDocumentName,
        setSelectedDocumentName,
        updateDocumentStatusbyAdmin,
    } = useContext(AdminContext);

    // const { getFilesByDocType, } = useContext(CloudinaryContext)
    // const { fetchProfileData, profileData } = useContext(UserContext);
    const { userId } = useParams();
    // const { user } = useAuth0();
    const [imagesByDocType, setImagesByDocType] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const [newDocStatus, setNewDocStatus] = useState('');
    // const [selectedDocUrl, setSelectDocUrl] = useState('')
    const [selectedDocumentType, setSelectedDocumentType] = useState('');

    const docTypeMapping = {
        'Brain Integration Training': 'brainIntegrationTraining',
        'Video Presentation': 'videoPresentation',
        'CPR Certification': 'cprCert',
        'Clinical Hours': 'clinicalHours',
        'First Aid Training': 'firstAidTraining',
        Insurance: 'insurance',
    };

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

    useEffect(() => {
        if (userId) {
            const foundUser = users.find((user) => user._id === userId);
            setIndividualUser(foundUser);
            console.log(individualUser, 'individual user');
        }
    }, [userId, setIndividualUser, users]);

    useEffect(() => {
        console.log('Updated imagesByDocType:', imagesByDocType);
    }, [imagesByDocType]);

    const getFilesByDocType = async (userEmail, documentType) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const nickname = individualUser.userEmail.split('@')[0];
            const response = await fetch(
                `/api/images/${nickname}/${documentType}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            const images = await response.json();
            console.log('API Response:', images);
            setImagesByDocType(images);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchProfileData(individualUser);
    }, [individualUser]);

    console.log(imagesByDocType)

    if (!individualUser) return <p>Loading...</p>;

    // const {
    //     brainIntegrationTraining,
    //     clinicalHours,
    //     firstAidTraining,
    //     cprCert,
    //     videoPresentation,
    //     insurance,
    // } = individualUser.certListUploadStatus;

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending approval':
            case 'pending':
                return 'bg-school-bus-yellow text-black';
            case 'declined':
                return 'bg-red text-white';
            case 'approved':
                return 'bg-green-is-good text-white';
            default:
                return 'bg-gray text-black';
        }
    };

    const nickname = individualUser.userEmail.split('@')[0];
    console.log(nickname);

    const handleClick = async (documentName) => {
        const documentType = docTypeMapping[documentName];
        setSelectedDocumentName(documentName);
        setSelectedDocumentType(documentType); 
        console.log(documentName);

        try {
            setFileModalOpen(false); 
            await getFilesByDocType(individualUser.userEmail, documentType);
            setFileModalOpen(true); 
        } catch (error) {
            console.error('Error fetching document data:', error);
        }
    };

    const handleChange = (e) => {
        setNewDocStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!individualUser) {
            console.error("Individual user is not defined");
            return;
        }

        console.log('Admin doc review form submitted');
        try {
            await updateDocumentStatusbyAdmin(individualUser, newDocStatus, selectedDocumentType);
            console.log("Document status updated successfully");
            setFileModalOpen(false); 
        } catch (error) {
            console.log("Error updating document status:", error);
        }
    };

    console.log(profileData);
    console.log(imagesByDocType);

    return (
        <div className="flex flex-col items-center w-full gap-6">
            <div className="flex items-center gap-8">
                <div className="flex bg-yet-another-light-grey w-[739px] h-[355px] pt-10 pl-10 pb-10">
                    {profileData && Object.keys(profileData).length > 0 ? (
                        <>
                            {profileData.userId && (
                                <img
                                    src={profileData.userId.userProfilePicture}
                                    alt="Profile"
                                />
                            )}
                            <div className="flex pl-20 flex-col gap-8">
                                <p className="font-bold text-3xl">
                                    {profileData.firstName}{' '}
                                    {profileData.lastName}
                                </p>
                                <p className="text-xl">
                                    {profileData.city} {profileData.state}{' '}
                                    {profileData.zip}
                                </p>
                                <p className="text-xl font-bold text-blue">
                                    {profileData.phoneNumber}
                                </p>
                                <p className="text-xl font-bold text-blue">
                                    {profileData.email}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-bold text-3xl">
                                No profile data found
                            </p>
                        </div>
                    )}
                </div>
                <div>
                    <img
                        src={
                            certProgressImages[
                                Math.min(
                                    individualUser.userUploadProgress || 0,
                                    certProgressImages.length - 1,
                                )
                            ]
                        }
                        className="w-auto md:w-auto"
                        alt={`Progress level ${individualUser.userUploadProgress}`}
                    />
                </div>
            </div>

            <div className="flex flex-col items-start w-[739px] mt-4">
                <ul className="pl-5">
                    {[
                        {
                            name: 'Video Presentation',
                            status: individualUser.certListUploadStatus
                                .videoPresentation,
                            icon: video,
                        },
                        {
                            name: 'Brain Integration Training',
                            status: individualUser.certListUploadStatus
                                .brainIntegrationTraining,
                            icon: presentation,
                        },
                        {
                            name: 'CPR Certification',
                            status: individualUser.certListUploadStatus.cprCert,
                            icon: heartPulse,
                        },
                        {
                            name: 'Clinical Hours',
                            status: individualUser.certListUploadStatus
                                .clinicalHours,
                            icon: clipboard,
                        },
                        {
                            name: 'First Aid Training',
                            status: individualUser.certListUploadStatus
                                .firstAidTraining,
                            icon: briefcase,
                        },
                        {
                            name: 'Insurance',
                            status: individualUser.certListUploadStatus
                                .insurance,
                            icon: shield,
                        },
                    ].map((doc, index) => (
                        <div
                            key={index}
                            className="pb-5 flex border border-charcoal rounded-xl p-10 mb-10 items-center gap-20"
                        >
                            <input
                                type="checkbox"
                                className="custom-checkbox"
                            />
                            <li>
                                {doc.name}:
                                <span
                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(
                                        doc.status,
                                    )}`}
                                >
                                    {doc.status}
                                </span>
                            </li>
                            <img
                                src={doc.icon}
                                className="w-[40px]"
                                alt={`${doc.name} icon`}
                            />
                            <button
                                className="border border-black rounded px-4 py-1 ml-4 font-bold shadow-lg w-[116px]"
                                onClick={() => handleClick(doc.name)}
                            >
                                View File
                            </button>
                        </div>
                    ))}
                </ul>
            </div>

            {/* File Modal */}
            {fileModalOpen && (
                <ViewFileModal
                    open={fileModalOpen}
                    onClose={() => setFileModalOpen(false)}
                    nickname={individualUser.userEmail.split('@')[0]}
                    selectedDocumentName={selectedDocumentName}
                    imagesByDocType={imagesByDocType}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    newDocStatus={newDocStatus}
                >
                    <div className="text-center w-100 flex flex-col items-center gap-2 mb-10">
                        <h3 className="text-lg text-gray-500 font-bold">
                            View file for: {selectedDocumentName}
                        </h3>
                        {imagesByDocType.length > 0 ? (
                            <img
                                src={imagesByDocType[0].url}
                                alt="Document file"
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                        <form className="mt-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col items-center gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="approvalStatus"
                                        value="approve"
                                        className="mr-2"
                                    />
                                    Approve
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="approvalStatus"
                                        value="decline"
                                        className="mr-2"
                                    />
                                    Decline
                                </label>
                                <textarea
                                    placeholder="Reason for denial (if applicable)"
                                    className="border border-black rounded-xl  p-5 mt-10 w-[300px]"
                                ></textarea>
                                <button className="border border-black rounded-xl px-5 py-2 bg-green-is-good text-white">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </ViewFileModal>
            )}
        </div>
    );
};

export default UserSpecificAdminView;
