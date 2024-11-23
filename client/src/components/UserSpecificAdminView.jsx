/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AdminContext } from '../contexts';
import ViewFileModal from './ViewFileModal';
import { DeleteFileModal } from './DeleteFileModal';
import Trashcan from '../assets/icons/Trashcan.png';
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
import brainSeal from '../assets/icons/BrainIntegrationSeal.png';

const UserSpecificAdminView = () => {
    console.log('usav component mounted');
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

    console.log(profileData);

    useEffect(() => {
        if (userEmail && users.length > 0) {
            // Ensure users array is populated
            const foundUser = users.find(
                (user) => user.userEmail === userEmail,
            );
            setIndividualUser(foundUser);
            console.log(foundUser);
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
            console.log('API Response:', image);
            setImagesByDocType(image);
            console.log(image);
            setPublicId(image[0].public_id);
            console.log('Set publicId:', image[0].public_id);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const promoteUsertoAdmin = async () => {
        const email = individualUser.userEmail;
        await updateUserToAdmin(email);
        console.log('updated user to admin');
    };

    useEffect(() => {
        fetchProfileData(individualUser);
    }, [individualUser]);

    console.log(imagesByDocType.public_id);

    if (!individualUser) return <p>Loading...</p>;

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
        console.log(documentName);
        console.log(documentType);

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

        console.log('Admin doc review form submitted');
        try {
            await updateDocumentStatusbyAdmin(
                individualUser,
                newDocStatus,
                selectedDocumentType,
            );
            console.log('Document status updated successfully');
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
            <div className="flex items-center gap-20 flex-grow: 1">
                <button className="font-fira text-xl" onClick={handleBackButton}>
                    &lt; Back
                </button>
                <div className="flex bg-yet-another-light-grey w-[1000px] h-[455px] shadow-md pt-10 pl-10 pb-10">
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
                                {individualUser.isCertified && (
                        <div className='flex flex-col justify-center items-center border border-white rounded-xl bg-white pt-2 shadow-md'>
                            <img src={brainSeal} className='h-20 w-20'/>
                            <h1 className='pt-2'>Certified Practitioner</h1>
                        </div>
                    )}
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
                    <div>
                        {profileData && !individualUser.isCertified ? (
                            <div className='flex flex-col items-center gap-5'>
                                <h1 className="pt-10 pl-[100px]">
                                    Has {profileData.firstName}{' '}
                                    {profileData.lastName} met all of the
                                    requirements to become certified?
                                </h1>
                                <button
                                    className="bg-green-is-good text-white rounded-md px-4 py-1 ml-4 font-bold shadow-lg"
                                    onClick={() =>
                                        issueCertification(
                                            individualUser.userEmail,
                                        )
                                    }
                                >
                                    Issue Certification
                                </button>{' '}
                            </div>
                        ) : (
                          null
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start w-[739px] mt-4">
                <button>
                    <img
                        src={Trashcan}
                        alt="Trash can"
                        className="pb-10 pl-10"
                        onClick={handleDeleteFiles}
                    />
                </button>
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
                            className="flex border border-charcoal rounded-xl p-10 m-10 items-center  justify-around gap-10"
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
                            <div className="flex flex-col">
                                {doc.name}:
                                <span
                                    className={`px-2 py-1 rounded-full text-sm font-semibold text-center w-20 ${getStatusBadgeClass(
                                        doc.status,
                                    )}`}
                                >
                                    {doc.status}
                                </span>
                            </div>
                            <img
                                src={doc.icon}
                                className="w-[40px]"
                                alt={`${doc.name} icon`}
                            />
                            {doc.status.toLowerCase() ===
                            'waiting for upload' ? (
                                <button
                                    className={
                                        'opacity-50 cursor-not-allowed bg-green-is-good text-white rounded-md px-4 py-1 ml-4 font-bold shadow-lg w-[116px]'
                                    }
                                    disabled={true}
                                >
                                    View File
                                </button>
                            ) : (
                                <>
                                    <button
                                        className={
                                            ' bg-green-is-good hover:bg-green-500  text-white px-4 py-2 rounded-md w-[116px]'
                                        }
                                        onClick={() => handleClick(doc.name)}
                                    >
                                        View File
                                    </button>
                                    {/* <button  className={"border border-black rounded px-4 py-1 ml-4 font-bold shadow-lg w-[116px]"}
                                 onClick={() => handleClick(doc.name)}>Delete File</button> */}
                                </>
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
