/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AdminContext } from '../contexts';
import ViewFileModal from './ViewFileModal';
import { DeleteFileModal } from './DeleteFileModal';
import Trashcan from '../assets/icons/Trashcan.png';
import ProgressRing0 from '../assets/icons/ProgressRing0.png';
import ProgressRing1 from '../assets/icons/ProgressRing1.png';
import ProgressRing2 from '../assets/icons/ProgressRing2.png';
import ProgressRing3 from '../assets/icons/ProgressRing3.png';
import ProgressRing4 from '../assets/icons/ProgressRing4.png';
import ProgressRing5 from '../assets/icons/ProgressRing5.png';
import ProgressRing6 from '../assets/icons/ProgressRing6.png';
import ProgressRing7 from '../assets/icons/ProgressRing7.png';
import ProgressRing8 from '../assets/icons/ProgressRing8.png';
import heartPulse from '../assets/icons/heart-pulse.png';
import presentation from '../assets/icons/presentation.png';
import shield from '../assets/icons/shield-half.png';
import briefcase from '../assets/icons/briefcase-medical.png';
import clipboard from '../assets/icons/clipboard-list.png';
import video from '../assets/icons/video.png';
import brainSeal from '../assets/icons/BrainIntegrationSealCropped.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserSpecificAdminView = () => {
    const {
        individualUser,
        setIndividualUser,
        users,
        fetchProfileData,
        profileData,
        fileModalOpen,
        setFileModalOpen,
        setSelectedDocumentName,
        updateDocumentStatusbyAdmin,
        getUserById,
        updateUserToAdmin,
        getAllUsers,
        issueCertification,
        scrollToSection,
        sendAdminNotification 
    } = useContext(AdminContext);

    const { userEmail } = useParams();
    const [imagesByDocType, setImagesByDocType] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const [newDocStatus, setNewDocStatus] = useState('');
    // const [selectedDocUrl, setSelectDocUrl] = useState('')
    const [selectedDocumentType, setSelectedDocumentType] = useState('');
    const navigate = useNavigate();
    const [filesToDelete, setFilesToDelete] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [publicId, setPublicId] = useState('');

    const docTypeMapping = {
        'Brain Integration Training': 'brainIntegrationTraining',
        'Video Presentation': 'videoPresentation',
        'CPR Certification': 'cprCert',
        'Clinical Hours': 'clinicalHours',
        'First Aid Training': 'firstAidTraining',
        Insurance: 'insurance',
    };

    const certProgressImages = [
        ProgressRing0,
        ProgressRing1,
        ProgressRing2,
        ProgressRing3,
        ProgressRing4,
        ProgressRing5,
        ProgressRing6,
        ProgressRing7,
        ProgressRing8,
    ];

    useEffect(() => {
        if (userEmail && users.length > 0) {
            // Ensure users array is populated
            const foundUser = users.find(
                (user) => user.userEmail === userEmail,
            );
            setIndividualUser(foundUser);
        }
    }, [userEmail, users]); // Remove setIndividualUser from dependency array

    // Log `individualUser` when it changes
    useEffect(() => {
        if (individualUser) {
            console.log(individualUser, 'Updated individual user');
        }
    }, [individualUser]);

    useEffect(() => {
        console.log('Updated imagesByDocType:', imagesByDocType);
    }, [imagesByDocType]);

    useEffect(() => {
        // Extract the hash from the URL (if available)
        const hash = location.hash;

        // Scroll to the element with the corresponding id (if the hash exists)
        if (hash) {
            const element = document.getElementById(hash.replace('#', '')); // Remove the '#' symbol
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const fetchSignedUrl = async (publicId, fileType) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(
                `/api/signed/get-signed-url?publicId=${publicId}&fileType=${fileType}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            const data = await response.json();

            if (data.signedUrl) {
                return data.signedUrl;
            } else {
                console.error('Error: No signed URL returned');
            }
        } catch (error) {
            console.error('Error fetching signed URL:', error);
        }
    };

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
            const image = await response.json();
            setImagesByDocType(image);
            setPublicId(image[0].public_id);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    // const promoteUsertoAdmin = async () => {
    //     const email = individualUser.userEmail;
    //     await updateUserToAdmin(email);
    //
    // };

    const certifyUser = async (email)  => {
        await issueCertification(email)
        //if successful - sendAdminNotification(userEmail, notificationType, message)

    }

    useEffect(() => {
        fetchProfileData(individualUser);
    }, [individualUser]);

    if (!individualUser)
        return (
            <>
                <Skeleton />
            </>
        );

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

    const handleClick = async (documentName) => {
        const documentType = docTypeMapping[documentName];
        setSelectedDocumentName(documentName);
        setSelectedDocumentType(documentType);

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
            console.error('Individual user is not defined');
            return;
        }

        try {
            await updateDocumentStatusbyAdmin(
                individualUser,
                newDocStatus,
                selectedDocumentType,
            );

            getUserById(individualUser.userEmail);
            setFileModalOpen(false);
        } catch (error) {
            console.log('Error updating document status:', error);
        }
    };

    const handleBackButton = () => {
        navigate('/admin/practitioner-management');
    };

    const handleCheckboxClick = (documentName) => {
        const documentType = docTypeMapping[documentName];
        if (filesToDelete.includes(documentType)) {
            setFilesToDelete(
                filesToDelete.filter((file) => file !== documentType),
            );
        } else {
            setFilesToDelete([...filesToDelete, documentType]);
        }
    };

    const handleDeleteFiles = () => {
        if (!deleteModalOpen) {
            setDeleteModalOpen(true);
        }
    };

    const handleConfirmDelete = () => {
        // TODO: Handle file deletion
        console.log(`Files to delete: ${filesToDelete}`);
    };

    return (
        <div className="flex flex-col items-center w-full gap-6 pt-20 pb-20">
            <div className="flex items-center gap-6 flex-grow-1 w-full px-4">
                <button
                    className="font-fira text-xl sm:text-lg"
                    onClick={handleBackButton}
                >
                    &lt; Back
                </button>
                <div className="flex bg-yet-another-light-grey w-full sm:w-[90%] md:w-[700px] h-[400px] sm:h-auto shadow-md pt-6 pl-10 pr-6 pb-6 flex-col justify-start sm:flex-row">
                    {profileData && Object.keys(profileData).length > 0 ? (
                        <>
                            {profileData.userId && (
                                <img
                                    src={profileData.userId.userProfilePicture}
                                    alt="Profile"
                                    className="w-[130px] h-[100px] object-cover justify-center sm:w-[200px] sm:h-[200px] mb-5"
                                />
                            )}
                            <div className="flex flex-col gap-4 sm:gap-6 pl-0 sm:pl-6">
                                <p className="font-bold text-xl sm:text-2xl">
                                    {profileData.firstName || <Skeleton />}{' '}
                                    {profileData.lastName || <Skeleton />}
                                    {/* {profileData.suffix || <Skeleton />}
                                    {profileData.title || <Skeleton />} */}
                                </p>
                                <p className="text-sm sm:text-lg">
                                    {profileData.city} {profileData.state}{' '}
                                    {profileData.country} {profileData.zip}
                                </p>
                                <p className="text-sm sm:text-lg font-bold text-blue">
                                    {profileData.phoneNumber}
                                </p>
                                <a
                                    href={profileData.website}
                                    className="text-sm sm:text-lg font-bold text-blue"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {profileData.website}

                                </a>
                                {/* <p>{profileData.bio}</p> */}

                                {individualUser.isCertified && (
                                    <div className="flex justify-left w-[150px] items-left border border-white rounded-xl bg-white pt-1 shadow-md gap-4">
                                        <img
                                            src={brainSeal}
                                            className="h-10 w-10 sm:h-10 sm:w-10"
                                        />
                                        <h1 className="pt-2 text-xs sm:text-xs pb-1">
                                            Certified Practitioner
                                        </h1>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-bold text-xl sm:text-2xl">
                                No profile data found
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex pl-20 mt-6 sm:mt-0 w-full sm:w-auto">
                    <img
                        src={
                            certProgressImages[
                                Math.min(
                                    individualUser.userUploadProgress || 0,
                                    certProgressImages.length - 1,
                                )
                            ]
                        }
                        className="w-full sm:w-auto"
                        alt={`Progress level ${individualUser.userUploadProgress}`}
                    />
                    <div>
                        {profileData && !individualUser.isCertified ? (
                            <div className="flex flex-col items-center gap-4 sm:gap-5 pl-20 text-center">
                                <h1 className="text-sm sm:text-lg pt-6 sm:pt-10">
                                    Has {profileData.firstName}{' '}
                                    {profileData.lastName} met all of the
                                    requirements to become certified?
                                </h1>
                                <button
                                    className="bg-green-is-good text-white rounded-md px-4 py-2 ml-4 font-bold shadow-lg sm:w-[180px]"
                                    onClick={() =>
                                        issueCertification(
                                            individualUser.userEmail,
                                        )
                                    }
                                >
                                    Issue Certification
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start sm:w-[1100px] mt-6 sm:mt-4 pr-4">
                <button>
                    <img
                        src={Trashcan}
                        alt="Trash can"
                        className="pb-6 pl-[60px] sm:pb-10"
                        onClick={handleDeleteFiles}
                    />
                </button>
                <ul className="pl-0 sm:pl-5 w-full">
                    {[
                        {
                            name: 'Video Presentation',
                            status: individualUser.certListUploadStatus
                                .videoPresentation,
                            icon: video,
                            id: 'videoPresentation',
                        },
                        {
                            name: 'Brain Integration Training',
                            status: individualUser.certListUploadStatus
                                .brainIntegrationTraining,
                            icon: presentation,
                            id: 'brainIntegrationTraining',
                        },
                        {
                            name: 'CPR Certification',
                            status: individualUser.certListUploadStatus.cprCert,
                            icon: heartPulse,
                            id: 'cprCert',
                        },
                        {
                            name: 'Clinical Hours',
                            status: individualUser.certListUploadStatus
                                .clinicalHours,
                            icon: clipboard,
                            id: 'clinicalHours',
                        },
                        {
                            name: 'First Aid Training',
                            status: individualUser.certListUploadStatus
                                .firstAidTraining,
                            icon: briefcase,
                            id: 'firstAidTraining',
                        },
                        {
                            name: 'Insurance',
                            status: individualUser.certListUploadStatus
                                .insurance,
                            icon: shield,
                            id: 'insurance',
                        },
                    ].map((doc, idx) => (
                        <div
                            key={idx}
                            id={doc.id}
                            className="flex flex-col sm:flex-row border border-charcoal rounded-xl p-6 sm:p-10 m-4 sm:m-6 items-start justify-start w-full gap-4 sm:gap-6"
                        >
                            <input
                                type="checkbox"
                                className="custom-checkbox"
                                disabled={
                                    doc.status.toLowerCase() ===
                                    'waiting for upload'
                                }
                                checked={filesToDelete.includes(
                                    docTypeMapping[doc.name],
                                )}
                                onChange={() => handleCheckboxClick(doc.name)}
                            />
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-start w-full">
                                <span className="text-sm sm:text-base font-semibold">
                                    {doc.name}:
                                </span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold text-center w-50 ${getStatusBadgeClass(
                                        doc.status,
                                    )}`}
                                >
                                    {doc.status}
                                </span>
                            </div>
                            <img
                                src={doc.icon}
                                className="w-10 sm:w-[40px]"
                                alt={`${doc.name} icon`}
                            />
                            {doc.status.toLowerCase() ===
                            'waiting for upload' ? (
                                <button
                                    className="opacity-50 cursor-not-allowed bg-green-is-good text-white rounded-md px-4 mr-10 py-2 ml-4 font-bold shadow-lg w-[120px] sm:w-[140px]"
                                    disabled={true}
                                >
                                    View File
                                </button>
                            ) : (
                                <button
                                    className="bg-green-is-good hover:bg-green-500 text-white px-4 py-2 mr-10 rounded-md w-[120px] sm:w-[140px]"
                                    onClick={() => handleClick(doc.name)}
                                >
                                    View File
                                </button>
                            )}
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
                    selectedDocumentType={selectedDocumentType}
                    imagesByDocType={imagesByDocType}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    newDocStatus={newDocStatus}
                    individualUser={individualUser}
                    getAllUsers={getAllUsers}
                ></ViewFileModal>
            )}

            {deleteModalOpen && (
                <DeleteFileModal
                    open={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default UserSpecificAdminView;
