/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import UploadBtn from '../assets/icons/UploadBtn.png';
import GetStudyGuideBtn from '../assets/icons/GetStudyGuideBtn.png';
import ProgressBar0 from '../assets/icons/ProgressBar0.png';
import ProgressBar1 from '../assets/icons/ProgressBar1.png';
import ProgressBar2 from '../assets/icons/ProgressBar2.png';
import ProgressBar3 from '../assets/icons/ProgressBar3.png';
import ProgressBar4 from '../assets/icons/ProgressBar4.png';
import ProgressBar5 from '../assets/icons/ProgressBar5.png';
import ProgressBar6 from '../assets/icons/ProgressBar6.png';
import ProgressBar7 from '../assets/icons/ProgressBar7.png';
import ProgressBar8 from '../assets/icons/ProgressBar8.png';
import StudyGuidePages from '../assets/icons/StudyGuidePages.png';
import PayforandStart from '../assets/icons/PayforandStart.png';

import Assessment from './Assessment';
import Insurance from './Insurance';
import Brain from './Brain';
import Clinical from './Clinical';
import CPR from './CPR';
import FirstAid from './FirstAid';
import Video from './Video';
import StudyGuide from './StudyGuide';
import DeleteModal from './DeleteModal';
import DeleteTooltip from './DeleteTooltip';
import AssessmentPayment from './AssessmentPayment.jsx';
import DeleteFileIcon from '../assets/icons/DeleteFileIcon.png';
import ProfilePhotoUpload from './ProfilePhotoUpload.jsx';

import { useAuth0 } from '@auth0/auth0-react';

import { Accordion } from 'react-accessible-accordion';
import e from 'cors';
import { CloudinaryContext } from '../contexts';
import Payment from './Payment.jsx';

const AccordionCard = ({ certStatus }) => {
    // eslint-disable-next-line no-unused-vars
    const {
        uwConfig,
        initializeCloudinaryWidget,
        filename,
        getFilesInFolder,
        getCloudinaryFiles,
        getFiles,
        files,
        progress,
        setProgress,
        updateUserProgress,
        isSubmitted,
        setIsSubmitted,
        fileMetaData,
        setFileMetaData,
        isLoading,
        setIsLoading,
        getUserMetaData,
        deleteFile,
        deleteModalOpen,
        setDeleteModalOpen,
        updateUserStudyGuide,
        studyGuideAccess,
        setStudyGuideAccess,
        email,
        showPayment,
        setShowPayment,
        showModal,
        setShowModal,
        certListUploadStatus,
        setCertListUploadStatus,
        updateUserDocumentStatus,
    } = useContext(CloudinaryContext);

    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    const [sectionName, setSectionName] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    const [userMetaData, setUserMetaData] = useState({}); // move this to context
    const [currentFileToDelete, setCurrentFileToDelete] = useState(null);
    const [stripePromise, setStripePromise] = useState(null);
    const [cloudinaryFiles, setCloudinaryFiles] = useState([]);
    // const [certListUploadStatus, setCertListUploadStatus] = useState({});

    //checks to see if every section has an uploaded file, if so returns true
    const [isUploaded, setIsUploaded] = useState(false);

    const handleDeleteClick = (publicId) => {
        const sectionName = 'Brain'; // or dynamically get section name based on the accordion section
        deleteFile(publicId, sectionName); // Pass section name here
    };

    // const [showPayment, setShowPayment] = useState(false);
    // const [showModal, setShowModal] = useState(false);

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

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending approval':
                return 'bg-school-bus-yellow text-black';
            case 'declined':
                return 'bg-red text-white';
            case 'approved':
                return 'bg-green-is-good text-white';
            default:
                return 'bg-gray text-black';
        }
    };

    console.log(cloudinaryFiles, 'user specific cloudinary files');
    console.log(fileMetaData)
    // console.log(stripePromise);

    //will need to add put request to user metadata route to change studyGuideAccess to true, just saving in state for now

    // const closeModal = () => {
    //     setShowModal(false);
    // };

    // const redirectToAssessment = () => {
    //     window.open('https://forms.gle/uL6ySYPDuwuXQj487', '_blank');
    // };

    const getStudyGuide = async () => {
        console.log('getStudyGuide function invoked');
        try {
            const accessToken = await getAccessTokenSilently();
            console.log('Access token retrieved:', accessToken);
            const stripe = await stripePromise;
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({}),
            });

            const session = await response.json();
            console.log('Session retrieved:', session);
            if (session.clientSecret) {
                console.log(
                    'Payment intent created successfully',
                    session.clientSecret,
                );
                //this part still works
                setShowPayment(true);

                try {
                    await updateUserProgress(progress + 1);
                    console.log('User progress update');
                    setProgress((prevProgress) => {
                        const newProgress = Math.min(prevProgress + 1, 8);
                        console.log(
                            'Progress successfully updated:',
                            newProgress,
                        );

                        return newProgress;
                    });
                } catch (error) {
                    console.error('Error updating progress:', error);
                }
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    console.log(progress);

    const getPublishableKey = async () => {
        const accessToken = await getAccessTokenSilently();
        fetch('/api/publishable-key', {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const { publishableKey } = await response.json();
                setStripePromise(loadStripe(publishableKey));
                console.log('Stripe promise set successfully');
            })
            .catch((error) => {
                console.error('Error fetching publishable key:', error);
            });
    };

    //move this to the cloudinarycontext and update progress there as well since it updates the progress
    const getAssessment = async () => {
        console.log('assessment button clicked');
        try {
            const accessToken = await getAccessTokenSilently();
            const stripe = await stripePromise;
            const response = await fetch(
                '/api/create-assessment-payment-intent',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({}),
                },
            );

            const session = await response.json();
            if (session.clientSecret) {
                console.log(
                    'Payment intent created successfully',
                    session.clientSecret,
                );
                setShowPayment(true);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    // console.log(progress);

    const showFile = () => {
        console.log('file shown');
    };

    const handleUploadClick = async (section) => {
        setSectionName(section);
        initializeCloudinaryWidget(section);
        const updatedStatus = {
            ...certListUploadStatus,
            [sectionName]: 'pending',
        };
        await updateUserDocumentStatus(updatedStatus);
        setCertListUploadStatus(updatedStatus);
        console.log('Calling updateUserProgress with value:', 1);
    };

    // if (isAuthenticated) {
    //     console.log('User Data:', user);
    // }

    // const checkAllSectionsUploaded = () => {
    //     const sections = [
    //         brainIntegrationTraining,
    //         clinicalHours,
    //         firstAidTraining,
    //         cprCert,
    //         videoPresentation,
    //         insurance,
    //     ];
    //     const allUploaded = sections.every((section) => section.length > 0);
    //     setIsUploaded(allUploaded);
    // };

    useEffect(() => {
        console.log('Fetching publishable key...');
        // Fetch the publishable key and set the stripePromise

        getPublishableKey();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const token = localStorage.getItem('token');
                try {
                    const folderFiles = await getFilesInFolder(token); //docs themselves - user specific
                    const metadataFiles = await getFiles(token);
                    console.log(metadataFiles); //metadata
                    const userMetaData = await getUserMetaData(token);
                    setFileMetaData(metadataFiles);
                    setUserMetaData(userMetaData);
                    setProgress(userMetaData.userUploadProgress);
                    setCertListUploadStatus(userMetaData.certListUploadStatus);
                    setCloudinaryFiles(folderFiles); //user specific files (objects) from Cloudinary
                    console.log(folderFiles);
                    console.log(userMetaData);
                } catch (error) {
                    console.error(
                        'Error fetching files:',
                        error.response?.data || error.message,
                    );
                }
            }
        };

        fetchData();
    }, [user]);

    // useEffect(() => {
    //     checkAllSectionsUploaded();
    // }, [fileMetaData]);

    const getSectionFileNames = (sectionName) => {
        const filteredFiles = fileMetaData.filter(
            (file) => file.sectionName === sectionName,
        );
        const fileNames = filteredFiles.map((file) => {
            return file.filename;
        });
        return fileNames;
    };

    const getPublicId = (fileName) => {
        const foundFile = fileMetaData.find(
            (file) => file.filename === fileName,
        );

        return foundFile ? foundFile.publicId : null;
    };

    const brainMetaData = fileMetaData.filter((metadata) => {
        return metadata.sectionName === 'brainIntegrationTraining';
    });

    const clinicalMetaData = fileMetaData.filter((metadata) => {
        return metadata.sectionName === 'clinicalHours';
    });

    const firstAidMetaData = fileMetaData.filter((metadata) => {
        return metadata.sectionName === 'firstAidTraining';
    });

    const cPRMetaData = fileMetaData.filter((metadata) => {
        return metadata.sectionName === 'cprCert';
    });

    const videoMetaData = fileMetaData.filter((metadata) => {
        return metadata.sectionName === 'videoPresentation';
    });

    const insuranceMetaData = fileMetaData.filter((metadata) => {
        return metadata.sectionName === 'insurance';
    });

    // const certListUploadStatus = userMetaData.certListUploadStatus

    console.log(fileMetaData, 'file metadata');
    console.log(userMetaData, 'user metadata');
    console.log(certListUploadStatus);

    return (
        <div>
            <ProfilePhotoUpload
                userMetaData={userMetaData}
                setUserMetaData={setUserMetaData}
            />

            <div className="flex flex-col justify-center gap-4 w-full md:w-[832px] pl-4 md:pl-10">
                <p className="font-fira text-lg md:text-xl font-light pt-10 md:pt-20 pb-5 md:pb-10 pl-2 md:pl-5">
                    Follow these steps to submit your documentation for
                    certification review. You may complete them in any order,
                    except for the assessment, which can only be accessed once
                    the preceding items are completed. If you have any questions
                    about the process, please{' '}
                    <span className="font-fira text-lg md:text-xl font-bold text-blue">
                        contact us
                    </span>
                    , and a member of our board will be happy to assist you.
                </p>
                <div className="flex flex-col justify-center items-center pl-2 md:pl-20 gap-4 pb-5">
                    <img
                        src={
                            certProgressImages[
                                Math.min(
                                    progress || 0,
                                    certProgressImages.length - 1,
                                )
                            ]
                        }
                        className="w-full md:w-auto"
                        alt={`Progress level ${user.userUploadProgress}`}
                    />
                </div>

                <Accordion
                    allowMultipleExpanded={true}
                    allowZeroExpanded={true}
                    className="w-full md:w-[826px]"
                >
                    <Brain
                        title="Brain Integration Training"
                        sectionName="brainIntegrationTraining"
                        fileMetadata={fileMetaData}
                        brainMetaData={brainMetaData}
                        certStatus={brainMetaData.brainIntegrationTraining}
                    >
                        <div className="flex flex-col p-4 md:pl-6 md:pr-6 border rounded-lg border-t-0 border-solid border-black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-lg md:text-xl pt-6 md:pt-10">
                                Complete 500 hours of relevant brain integration
                                training.
                            </h1>

                            <br></br>
                            <p className="font-fira text-black text-sm md:text-base font-normal mt-4">
                                The Brain Integration Training program requires
                                a comprehensive 500-hour training to ensure
                                proficiency and expertise in the field. The
                                training is divided into three key areas:
                                Standard Knowledge Base, Professional Training,
                                and Competency Base. Below is a detailed
                                breakdown of each component:
                            </p>

                            <h3 className="font-fira text-black text-sm md:text-base font-bold mt-4">
                                Standard Knowledge Base Standard Knowledge Base
                            </h3>
                            <p className="mt-2">
                                Anatomy and Physiology: Understanding the human
                                body&apos;s structure and function, with a focus
                                on the brain and nervous system. <br></br>Brain
                                Integration Awareness and Systems: Learning the
                                principles of brain integration, including how
                                different parts of the brain communicate and
                                work together. <br></br>Executive Functions:
                                Studying the brain&apos;s higher-order
                                processes, such as planning, decision-making,
                                problem-solving, and impulse control. <br></br>
                                Senses and Reflexes: Exploring how sensory input
                                and reflex actions contribute to brain function
                                and integration. <br></br>Techniques and
                                Applications: Mastering various techniques for
                                brain integration and their practical
                                applications in clinical settings.
                            </p>

                            <h3 className="font-fira text-black text-sm md:text-base font-bold mt-4">
                                Professional Training
                            </h3>
                            <p className="mt-2">
                                Objectives and Assessments: Setting clear
                                objectives for brain integration sessions and
                                learning how to assess client progress
                                effectively.<br></br> Professional Conduct:
                                Maintaining a high standard of professionalism
                                in all interactions with clients and colleagues.
                                <br></br> Ethics and Boundaries: Adhering to
                                ethical guidelines and establishing appropriate
                                boundaries in client relationships. <br></br>
                                Good Business Practices: Implementing sound
                                business practices, including client management,
                                record-keeping, and financial responsibilities.
                            </p>

                            <h3 className="font-fira text-black text-sm md:text-base font-bold mt-4">
                                Competency Base
                            </h3>
                            <p className="mt-2">
                                Effective Communication: Developing strong
                                communication skills to interact effectively
                                with clients and colleagues.<br></br> Client
                                Clinic Services: Providing comprehensive clinic
                                services, from initial consultations to
                                follow-up sessions.<br></br> Competency-Based
                                Testing: Demonstrating proficiency through
                                practical exams and assessments. <br></br>
                                Certification: Successfully completing the
                                certification process to become a recognized
                                Brain Integration practitioner.<br></br> Upon
                                completion of the 500-hour training,
                                participants must upload proof of their training
                                hours to receive certification. This ensures
                                that all practitioners meet the rigorous
                                standards required to provide high-quality brain
                                integration services.
                            </p>

                            <div className="flex flex-col gap-10 pt-10 pb-2">
                                <div className="flex justify-center gap-10 pb-5">
                                    <div className="flex flex-col justify-start items-start pl-0">
                                        <ul>
                                            {getSectionFileNames(
                                                'brainIntegrationTraining',
                                            ).map((file, index) =>
                                                file ? (
                                                    <li
                                                        key={index}
                                                        className="flex gap-5"
                                                    >
                                                        <button
                                                            className="font-fira text-xl text-blue font-bold text-left"
                                                            onClick={showFile}
                                                        >
                                                            {file}{' '}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setCurrentFileToDelete(
                                                                    file,
                                                                );
                                                                setDeleteModalOpen(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            X
                                                        </button>
                                                    </li>
                                                ) : null,
                                            )}
                                        </ul>

                                        {getSectionFileNames(
                                            'brainIntegrationTraining',
                                        ).length > 0 && (
                                            <div>
                                                {
                                                    certListUploadStatus.brainIntegrationTraining
                                                }
                                            </div>
                                        )}

                                        {deleteModalOpen && (
                                            <DeleteModal
                                                open={deleteModalOpen}
                                                onClose={() =>
                                                    setDeleteModalOpen(false)
                                                }
                                            >
                                                <div className="text-center w-56 flex flex-col items-center gap-2 mb-10">
                                                    <img
                                                        src={DeleteFileIcon}
                                                        className="w-70px h-[70px]"
                                                        alt="Delete File"
                                                    />

                                                    <h3 className="text-lg text-gray-500 font-bold">
                                                        Are you sure you want to
                                                        delete?
                                                    </h3>
                                                    <p className="text-sm">
                                                        This process cannot be
                                                        undone.
                                                    </p>
                                                </div>
                                                <div className="flex gap-10">
                                                    <button
                                                        className="bg-light-gray w-[100px]  py-2 rounded text-white"
                                                        onClick={() =>
                                                            setDeleteModalOpen(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="bg-red w-[100px] py-2 rounded text-white"
                                                        onClick={() => {
                                                            const publicId =
                                                                getPublicId(
                                                                    currentFileToDelete,
                                                                );
                                                            const sectionName =
                                                                'brainIntegrationTraining';
                                                            if (publicId) {
                                                                deleteFile(
                                                                    publicId,
                                                                    sectionName,
                                                                );
                                                            } else {
                                                                console.error(
                                                                    'Public ID not found for file:',
                                                                    currentFileToDelete,
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </DeleteModal>
                                        )}
                                    </div>
                                    {/* <p className="mt-2">
                                        Status:{' '}
                                        {certListUploadStatus.brainIntegrationTraining ||
                                            'Not submitted'}
                                    </p> */}

                                    <div className="flex justify-center items-center">
                                        <button>
                                            <img
                                                src={UploadBtn}
                                                onClick={() =>
                                                    handleUploadClick(
                                                        'brainIntegrationTraining',
                                                    )
                                                }
                                                alt="Upload Brain"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Brain>
                    <Clinical
                        title="Clinical Hours"
                        sectionName="clinicalHours"
                        clinicalMetaData={clinicalMetaData}
                    >
                        <div className="flex flex-col p-4 md:pl-6 md:pr-6 border rounded-lg border-t-0 border-solid border-black rounded-tr-none rounded-tl-none mb-5">
                            <p className="font-fira text-dark-green font-bold text-lg md:text-xl pt-6 md:pt-10">
                                Completion of 200 hours of clinical practice in
                                brain integration or kinesiology including
                                various populations and settings.
                            </p>

                            <ul className="font-fira text-black text-base font-normal list-disc list-inside pl-0">
                                We encourage the following:
                                <li className="pt-3">
                                    Practicum with the public
                                </li>
                                <li>
                                    Practicums in a lab setting with oversight
                                </li>
                                <li className="pl-4 -ml-4">
                                    SOAP notes, or subjective, objective,
                                    assessment, and plan notes, are a
                                    standardized method used by
                                    <span className="pl-5">
                                        professionals to document client
                                        interactions
                                    </span>
                                </li>
                                <li className="list-disc list-inside">
                                    Experience brain integration with children,
                                    teenagers, adults, and individuals with
                                    special needs
                                </li>
                            </ul>

                            <div className="flex flex-col gap-10 pt-10 pb-2">
                                <div className="flex justify-center gap-10 pb-5">
                                    <div className="flex flex-col justify-start items-start pl-0">
                                        <ul>
                                            {getSectionFileNames(
                                                'clinicalHours',
                                            ).map((file, index) =>
                                                file ? (
                                                    <li
                                                        key={index}
                                                        className="flex gap-5"
                                                    >
                                                        <button
                                                            className="font-fira text-xl text-blue font-bold text-left"
                                                            onClick={showFile}
                                                        >
                                                            {file}{' '}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setCurrentFileToDelete(
                                                                    file,
                                                                );
                                                                setDeleteModalOpen(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            X
                                                        </button>
                                                    </li>
                                                ) : null,
                                            )}
                                        </ul>

                                        {getSectionFileNames('clinicalHours')
                                            .length > 0 && (
                                            <div>
                                                {
                                                    certListUploadStatus.clinicalHours
                                                }
                                            </div>
                                        )}
                                        {deleteModalOpen && (
                                            <DeleteModal
                                                open={deleteModalOpen}
                                                onClose={() =>
                                                    setDeleteModalOpen(false)
                                                }
                                            >
                                                <div className="text-center w-56 flex flex-col items-center gap-2 mb-10">
                                                    <img
                                                        src={DeleteFileIcon}
                                                        className="w-70px h-[70px]"
                                                        alt="Delete File"
                                                    />

                                                    <h3 className="text-lg text-gray-500 font-bold">
                                                        Are you sure you want to
                                                        delete?
                                                    </h3>
                                                    <p className="text-sm">
                                                        This process cannot be
                                                        undone.
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-10">
                                                    <button
                                                        className="bg-light-gray w-full py-2 rounded text-white"
                                                        onClick={() =>
                                                            setDeleteModalOpen(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="bg-red w-[100px] py-2 rounded text-white"
                                                        onClick={() => {
                                                            const publicId =
                                                                getPublicId(
                                                                    currentFileToDelete,
                                                                );
                                                            const sectionName =
                                                                'clinicalHours';

                                                            if (publicId) {
                                                                deleteFile(
                                                                    publicId,
                                                                    sectionName,
                                                                ); // Pass both publicId and sectionName
                                                            } else {
                                                                console.error(
                                                                    'Public ID not found for file:',
                                                                    currentFileToDelete,
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </DeleteModal>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-center w-1/3 pt-20">
                                        <DeleteTooltip
                                            text="Delete current file to upload new one"
                                            disabled={
                                                clinicalMetaData.length > 0
                                            }
                                        >
                                            <button
                                                disabled={
                                                    clinicalMetaData.length > 0
                                                }
                                                className={`${
                                                    clinicalMetaData.length > 0
                                                        ? 'opacity-50 cursor-not-allowed'
                                                        : ''
                                                }`}
                                            >
                                                <img
                                                    src={UploadBtn}
                                                    onClick={() =>
                                                        handleUploadClick(
                                                            'clinicalHours',
                                                        )
                                                    }
                                                    alt="Upload Clinical"
                                                />
                                            </button>
                                        </DeleteTooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Clinical>
                    <FirstAid
                        title="First Aid Certification"
                        sectionName="firstAidTraining"
                        firstAidMetaData={firstAidMetaData}
                    >
                        <div className="flex flex-col p-4 md:pl-6 md:pr-6 border rounded-lg border-t-0 border-solid border-black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-lg md:text-xl pt-6 md:pt-10">
                                Show proof of First Aid certification.
                            </h1>
                            <p className="font-fira text-black text-base font-normal">
                                Upload your current First Aid certifications.
                                Scan or photograph both sides of your
                                certification card. Save the files as PDF or
                                JPEG. Click the “Upload” button and select your
                                files.
                            </p>

                            <div className="flex justify-center items-start pt-20">
                                <div className="w-1/3">
                                    <ul className="pl-0">
                                        {getSectionFileNames(
                                            'firstAidTraining',
                                        ).map((file, index) =>
                                            file ? (
                                                <li
                                                    key={index}
                                                    className="flex gap-5 mb-2"
                                                >
                                                    <button
                                                        className="font-fira text-xl text-blue font-bold"
                                                        onClick={showFile}
                                                    >
                                                        {file}{' '}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setCurrentFileToDelete(
                                                                file,
                                                            );
                                                            setDeleteModalOpen(
                                                                true,
                                                            );
                                                        }}
                                                    >
                                                        X
                                                    </button>
                                                </li>
                                            ) : null,
                                        )}
                                    </ul>
                                    {getSectionFileNames('firstAidTraining')
                                        .length > 0 && (
                                        <div>
                                            {
                                                certListUploadStatus.firstAidTraining
                                            }
                                        </div>
                                    )}

                                    {deleteModalOpen && (
                                        <DeleteModal
                                            open={deleteModalOpen}
                                            onClose={() =>
                                                setDeleteModalOpen(false)
                                            }
                                        >
                                            <div className="text-center w-56 flex flex-col items-center gap-2 mb-10">
                                                <img
                                                    src={DeleteFileIcon}
                                                    className="w-70px h-[70px]"
                                                    alt="Delete File"
                                                />

                                                <h3 className="text-lg text-gray-500 font-bold">
                                                    Are you sure you want to
                                                    delete?
                                                </h3>
                                                <p className="text-sm">
                                                    This process cannot be
                                                    undone.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-10">
                                                <button
                                                    className="bg-light-gray w-full py-2 rounded text-white"
                                                    onClick={() =>
                                                        setDeleteModalOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="bg-red w-[100px] py-2 rounded text-white"
                                                    onClick={() => {
                                                        const publicId =
                                                            getPublicId(
                                                                currentFileToDelete,
                                                            );
                                                        const sectionName =
                                                            'firstAidTraining';
                                                        if (publicId) {
                                                            deleteFile(
                                                                publicId,
                                                                sectionName,
                                                            );
                                                        } else {
                                                            console.error(
                                                                'Public ID not found for file:',
                                                                currentFileToDelete,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </DeleteModal>
                                    )}
                                </div>

                                <div className="flex flex-col items-center w-1/3 pt-20">
                                    <DeleteTooltip
                                        text="Delete current file to upload new one"
                                        disabled={firstAidMetaData.length > 0}
                                    >
                                        <button
                                            disabled={
                                                firstAidMetaData.length > 0
                                            }
                                            className={`${
                                                firstAidMetaData.length > 0
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                            }`}
                                        >
                                            <img
                                                src={UploadBtn}
                                                onClick={() =>
                                                    handleUploadClick(
                                                        'firstAidTraining',
                                                    )
                                                }
                                                alt="Upload FirstAid"
                                            />
                                        </button>
                                    </DeleteTooltip>
                                </div>
                            </div>
                        </div>
                    </FirstAid>
                    <CPR
                        title="CPR Certification"
                        sectionName="cprCert"
                        cPRMetaData={cPRMetaData}
                    >
                        <div className="flex flex-col p-4 md:pl-6 md:pr-6 border rounded-lg border-t-0 border-solid border-black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-lg md:text-xl pt-6 md:pt-10">
                                Show proof of CPR certification
                            </h1>
                            <p className="pb-5">
                                Upload your current CPR certification. Scan or
                                photograph both sides of your certification
                                card. Save the files as PDF or JPEG. Click the
                                &quot;Upload&quot; button and select your files.
                            </p>
                            <p className="pb-5">
                                Here is a suggested location to complete this
                                requirement by using your smartphone:
                                <span>
                                    <a href="https://resuscitech.io/smart-certification">
                                        https://resuscitech.io/smart-certification
                                    </a>
                                </span>
                            </p>
                            <p>
                                Once completed, copy the certificate and upload
                                the documents.
                            </p>

                            <div className="flex justify-center items-start pt-20">
                                <div className="w-1/3">
                                    <ul className="pl-0">
                                        {getSectionFileNames('cprCert').map(
                                            (file, index) =>
                                                file ? (
                                                    <li
                                                        key={index}
                                                        className="flex gap-5 mb-2"
                                                    >
                                                        <button
                                                            className="font-fira text-xl text-blue font-bold"
                                                            onClick={showFile}
                                                        >
                                                            {file}
                                                            {''}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setCurrentFileToDelete(
                                                                    file,
                                                                );
                                                                setDeleteModalOpen(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            X
                                                        </button>
                                                    </li>
                                                ) : null,
                                        )}
                                    </ul>
                                    {getSectionFileNames('cprCert').length >
                                        0 && (
                                        <div>
                                            {certListUploadStatus.cprCert}
                                        </div>
                                    )}
                                    {deleteModalOpen && (
                                        <DeleteModal
                                            open={deleteModalOpen}
                                            onClose={() =>
                                                setDeleteModalOpen(false)
                                            }
                                        >
                                            <div className="text-center w-56 flex flex-col items-center gap-2 mb-10">
                                                <img
                                                    src={DeleteFileIcon}
                                                    className="w-70px h-[70px]"
                                                    alt="Delete File"
                                                />

                                                <h3 className="text-lg text-gray-500 font-bold">
                                                    Are you sure you want to
                                                    delete?
                                                </h3>
                                                <p className="text-sm">
                                                    This process cannot be
                                                    undone.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-10">
                                                <button
                                                    className="bg-light-gray h-[30px] py-2 rounded text-white"
                                                    onClick={() =>
                                                        setDeleteModalOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="bg-red w-[100px] py-2 rounded text-white"
                                                    onClick={() => {
                                                        const publicId =
                                                            getPublicId(
                                                                currentFileToDelete,
                                                            );
                                                        const sectionName =
                                                            'cprCert'; // Replace 'Brain' with the dynamic section name as needed

                                                        if (publicId) {
                                                            deleteFile(
                                                                publicId,
                                                                sectionName,
                                                            ); // Pass both publicId and sectionName
                                                        } else {
                                                            console.error(
                                                                'Public ID not found for file:',
                                                                currentFileToDelete,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </DeleteModal>
                                    )}
                                </div>

                                <div className="flex flex-col items-center w-1/3 pt-20">
                                    <DeleteTooltip
                                        text="Delete current file to upload new one"
                                        disabled={cPRMetaData.length > 0}
                                    >
                                        <button
                                            disabled={cPRMetaData.length > 0}
                                            className={`${
                                                cPRMetaData.length > 0
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                            }`}
                                        >
                                            <img
                                                src={UploadBtn}
                                                onClick={() =>
                                                    handleUploadClick('cprCert')
                                                }
                                                alt="Upload CPR"
                                            />
                                        </button>
                                    </DeleteTooltip>
                                </div>
                            </div>
                        </div>
                    </CPR>
                    <Video
                        title="Video Presentation"
                        sectionName="videoPresentation"
                        videoMetaData={videoMetaData}
                    >
                        <div className="flex flex-col p-4 md:pl-6 md:pr-6 border rounded-lg border-t-0 border-solid border-black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-lg md:text-xl pt-6 md:pt-10">
                                Submit video recording of a documented Brain
                                Integration session.
                            </h1>
                            <ul className="font-fira text-black text-base font-normal list-disc list-inside">
                                Video must not exceed 30 minutes in length and
                                must include the following knowledge and skills:
                                <li className="list-disc list-inside">
                                    Physical demonstration of knowledge
                                </li>
                                <li className="list-disc list-inside">
                                    Explaining the process of Brain Integration
                                </li>
                                <li className="list-disc list-inside">
                                    Express knowledge of appropriate reasoning
                                    of the procedure
                                </li>
                                <li className="list-disc list-inside">
                                    Demonstrate balance process
                                </li>
                                <li className="list-disc list-inside">
                                    Powers of stress alleviation
                                </li>
                                <li className="list-disc list-inside">
                                    Knowledge of meridian points/alarm points
                                </li>
                                <li className="list-disc list-inside">
                                    Pause-lock procedure
                                </li>
                            </ul>

                            <div className="flex justify-center items-start pt-20">
                                <div className="w-1/3">
                                    <ul>
                                        {getSectionFileNames(
                                            'videoPresentation',
                                        ).map((file, index) =>
                                            file ? ( // Only render if file is truthy
                                                <li
                                                    key={index}
                                                    className="flex gap-5 mb-2"
                                                >
                                                    <button
                                                        className="font-fira text-xl text-blue font-bold"
                                                        onClick={showFile}
                                                    >
                                                        {file}
                                                        {''}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setCurrentFileToDelete(
                                                                file,
                                                            );
                                                            setDeleteModalOpen(
                                                                true,
                                                            );
                                                        }}
                                                    >
                                                        X
                                                    </button>
                                                </li>
                                            ) : null,
                                        )}
                                    </ul>
                                    {getSectionFileNames('videoPresentation')
                                        .length > 0 && (
                                        <div>
                                            {
                                                certListUploadStatus.videoPresentation
                                            }
                                        </div>
                                    )}
                                    {deleteModalOpen && (
                                        <DeleteModal
                                            open={deleteModalOpen}
                                            onClose={() =>
                                                setDeleteModalOpen(false)
                                            }
                                        >
                                            <div className="text-center w-56 flex flex-col items-center gap-2 mb-10">
                                                <img
                                                    src={DeleteFileIcon}
                                                    className="w-70px h-[70px]"
                                                    alt="Delete File"
                                                />

                                                <h3 className="text-lg text-gray-500 font-bold">
                                                    Are you sure you want to
                                                    delete?
                                                </h3>
                                                <p className="text-sm">
                                                    This process cannot be
                                                    undone.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-10">
                                                <button
                                                    className="bg-light-gray w-full py-2 rounded text-white"
                                                    onClick={() =>
                                                        setDeleteModalOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="bg-red w-[100px] py-2 rounded text-white"
                                                    onClick={() => {
                                                        const publicId =
                                                            getPublicId(
                                                                currentFileToDelete,
                                                            );
                                                        const sectionName =
                                                            'videoPresentation'; // Replace 'Brain' with the dynamic section name as needed

                                                        if (publicId) {
                                                            deleteFile(
                                                                publicId,
                                                                sectionName,
                                                            ); // Pass both publicId and sectionName
                                                        } else {
                                                            console.error(
                                                                'Public ID not found for file:',
                                                                currentFileToDelete,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </DeleteModal>
                                    )}
                                </div>

                                <div className="flex flex-col items-center w-1/3 pt-20">
                                    <DeleteTooltip
                                        text="Delete current file to upload new one"
                                        disabled={videoMetaData.length > 0}
                                    >
                                        <button
                                            disabled={videoMetaData.length > 0}
                                            className={`${
                                                videoMetaData.length > 0
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                            }`}
                                        >
                                            <img
                                                src={UploadBtn}
                                                onClick={() =>
                                                    handleUploadClick(
                                                        'videoPresentation',
                                                    )
                                                }
                                                alt="Upload Video"
                                            />
                                        </button>
                                    </DeleteTooltip>
                                </div>
                            </div>
                        </div>
                    </Video>

                    <Insurance
                        title="Insurance"
                        sectionName="insurance"
                        insuranceMetaData={insuranceMetaData}
                    >
                        <div className="flex flex-col p-4 md:pl-6 md:pr-6 border rounded-lg border-t-0 border-solid border-black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-lg md:text-xl pt-6 md:pt-10">
                                Show proof of professional and liability
                                insurance
                            </h1>
                            <p className="pb-8 text-base">
                                Show proof of professional and liability
                                insurance Upload proof of professional and
                                liability insurance (e.g., ABMP).
                            </p>
                            <ul className="font-fira text-black text-base font-bold pb-8">
                                Instructions:
                                <li className="font-fira text-black text-base font-normal">
                                    Scan or photograph your insurance
                                    certificate.
                                </li>
                                <li className="font-fira text-black text-base font-normal">
                                    Save the file as PDF or JPEG.
                                </li>
                                <li className="font-fira text-black text-base font-normal">
                                    Click the &quot;Upload Insurance&quot;
                                    button below and select your file.
                                </li>
                            </ul>

                            <div className="flex justify-center items-start pt-10">
                                <div className="w-1/3">
                                    <ul className="pl-0">
                                        {getSectionFileNames('insurance').map(
                                            (file, index) =>
                                                file ? (
                                                    <li
                                                        key={index}
                                                        className="flex gap-5 mb-2"
                                                    >
                                                        <button
                                                            className="font-fira text-xl text-blue font-bold"
                                                            onClick={showFile}
                                                        >
                                                            {file}
                                                            {''}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setCurrentFileToDelete(
                                                                    file,
                                                                );
                                                                setDeleteModalOpen(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            X
                                                        </button>
                                                    </li>
                                                ) : null,
                                        )}
                                    </ul>
                                    {getSectionFileNames('insurance').length >
                                        0 && (
                                        <div>
                                            {certListUploadStatus.insurance}
                                        </div>
                                    )}
                                    {deleteModalOpen && (
                                        <DeleteModal
                                            open={deleteModalOpen}
                                            onClose={() =>
                                                setDeleteModalOpen(false)
                                            }
                                        >
                                            <div className="text-center w-56 flex flex-col items-center gap-2 mb-10">
                                                <img
                                                    src={DeleteFileIcon}
                                                    className="w-70px h-[70px]"
                                                    alt="Delete File"
                                                />

                                                <h3 className="text-lg text-gray-500 font-bold">
                                                    Are you sure you want to
                                                    delete?
                                                </h3>
                                                <p className="text-sm">
                                                    This process cannot be
                                                    undone.
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-10">
                                                <button
                                                    className="bg-light-gray w-full py-2 rounded text-white"
                                                    onClick={() =>
                                                        setDeleteModalOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="bg-red w-[100px] py-2 rounded text-white"
                                                    onClick={() => {
                                                        const publicId =
                                                            getPublicId(
                                                                currentFileToDelete,
                                                            );
                                                        const sectionName =
                                                            'insurance'; // Replace 'Brain' with the dynamic section name as needed

                                                        if (publicId) {
                                                            deleteFile(
                                                                publicId,
                                                                sectionName,
                                                                console.log('deleted file')
                                                            ); // Pass both publicId and sectionName
                                                        } else {
                                                            console.error(
                                                                'Public ID not found for file:',
                                                                currentFileToDelete,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </DeleteModal>
                                    )}
                                </div>

                                <div className="flex flex-col items-center w-1/3 pt10 pb-10">
                                    <DeleteTooltip
                                        text="Delete current file to upload new one"
                                        disabled={insuranceMetaData.length > 0}
                                    >
                                        <button
                                            disabled={
                                                insuranceMetaData.length > 0
                                            }
                                            className={`${
                                                insuranceMetaData.length > 0
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                            }`}
                                        >
                                            <img
                                                src={UploadBtn}
                                                onClick={() =>
                                                    handleUploadClick(
                                                        'insurance',
                                                    )
                                                }
                                                alt="Upload Insurance"
                                            />
                                        </button>
                                    </DeleteTooltip>
                                </div>
                            </div>
                        </div>
                    </Insurance>

                    <StudyGuide title={'Study Guide'}>
                        <div className="flex flex-col p-4 md:pl-6 md:pr-6 border rounded-lg border-t-0 border-solid border-black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-lg md:text-xl pt-6 md:pt-10">
                                Areas of knowledge for the Study Guide
                            </h1>
                            <h1 className="font-fira text-black font-normal text-xl pb-5 mt-4">
                                Having knowledge of Structure, Function, and
                                Processes.
                            </h1>

                            <div className="flex gap-16">
                                <div className="flex-1">
                                    <ul className="min-h-full">
                                        <li>Brain</li>
                                        <li>Triune Brain</li>
                                        <li>Higher brain</li>
                                        <li>Intermediate Brain</li>
                                        <li>Lower Brain</li>
                                        <li>Cerebral Cortex</li>
                                        <li>Lobes</li>
                                        <li>Cerebrum</li>
                                        <li>Hemispheres</li>
                                        <li>Limbic system</li>
                                        <li>Basal Ganglia</li>
                                        <li>Hypothalamus</li>
                                        <li>Epithalamus</li>
                                        <li>Subthalamus</li>
                                        <li>Brainstem</li>
                                        <li>Midbrain</li>
                                        <li>Pons</li>
                                        <li>Medulla</li>
                                    </ul>
                                </div>

                                <div className="flex-1">
                                    <ul className="min-h-full">
                                        <li>The Cerebellum</li>
                                        <li>Cerebrocerebellum</li>
                                        <li>Spinocerebellum</li>
                                        <li>Vestibulocerebellum</li>
                                        <li>Grey Matter</li>
                                        <li>White Matter</li>
                                        <li>Commissural fibers</li>
                                        <li>Association fibers</li>
                                        <li>Projection fibers</li>
                                        <li>Nervous system</li>
                                        <li>Neuron Anatomy</li>
                                        <li>Cell body</li>
                                        <li>Dendrites</li>
                                        <li>Axon</li>
                                        <li>Transport Vesicles</li>
                                        <li>Neuron Function</li>
                                        <li>Neuron communication</li>
                                        <li>Type of signals</li>
                                        <li>Neuron types</li>
                                        <li>Sensory neurons</li>
                                    </ul>
                                </div>

                                <div className="flex-1">
                                    <div className="min-h-full">
                                        <ul
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <li>Interneurons</li>
                                            <li>Motor neurons</li>
                                            <li>Spinal Cord</li>
                                            <li>Cervical</li>
                                            <li>Thoracic</li>
                                            <li>Lumbar</li>
                                            <li>Sacral</li>
                                            <li>Cranial nerves</li>
                                            <li>I The Olfactory</li>
                                            <li>II Optic Nerve</li>
                                            <li>III Oculomotor</li>
                                            <li>IV Trochlear</li>
                                            <li>V Trigeminal</li>
                                            <li>VI Abducens</li>
                                            <li>VII Facial</li>
                                            <li>IX Glossopharyngeal</li>
                                            <li>X Vagus</li>
                                            <li>XI Accessory</li>
                                            <li>XII Hypoglossal</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="min-h-full">
                                        <ul
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <li>Bones</li>
                                            <li>Skull</li>
                                            <li>Bones of the Head</li>
                                            <li>Spinal Cord</li>
                                            <li>Cervical</li>
                                            <li>Thoracic</li>
                                            <li>Lumbar</li>
                                            <li>Sacral</li>
                                            <li>5 Element Theory</li>
                                            <li>Executive functions</li>
                                            <li>Chakras</li>
                                            <li>Meridian lines</li>
                                            <li>Muscles</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-10 pt-5 pb-5">
                                <div className="flex flex-col gap-10">
                                    <p className="pt-[50px] pr-[300px]">
                                        Purchase the Comprehensive Study guide:
                                        $65.00 + tax.{' '}
                                    </p>
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={StudyGuidePages}
                                            className="h-[50px] w-[50px]"
                                        />
                                        <p className="font-fira font-bold text-blue">
                                            Study Guide
                                        </p>
                                        <button>
                                            <img
                                                className="pl-[100px]"
                                                src={GetStudyGuideBtn}
                                                onClick={() => {
                                                    console.log(
                                                        'Button clicked',
                                                    );
                                                    getStudyGuide();
                                                }}
                                            />
                                        </button>
                                        {showPayment && (
                                            <div className="flex flex-col">
                                                <Payment
                                                    stripePromise={
                                                        stripePromise
                                                    }
                                                    showPayment={showPayment}
                                                    studyGuideAccess={
                                                        studyGuideAccess
                                                    }
                                                    setStudyGuideAccess={
                                                        setStudyGuideAccess
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </StudyGuide>
                    <Assessment title={'Assessment'} id="assessment">
                        <div className="flex flex-col p-4 md:pl-6 md:pr-6 border rounded-lg border-t-0 border-solid border-black rounded-tr-none rounded-tl-none mb-5">
                            <h1 className="font-fira text-dark-green font-bold text-lg md:text-xl pt-6 md:pt-10">
                                Complete 500 hours of relevant brain integration
                                training.
                            </h1>

                            <p className="font-fira text-black text-base font-normal mt-2">
                                The Brain Integration Training program requires
                                a comprehensive 500-hour training to ensure
                                proficiency and expertise in the field. The
                                training is divided into three key areas:
                                Standard Knowledge Base, Professional Training,
                                and Competency Base. Below is a detailed
                                breakdown of each component:
                            </p>

                            <h3 className="font-fira text-black text-base font-bold mt-2">
                                Standard Knowledge Base
                            </h3>
                            <p className="font-fira text-black text-base font-normal">
                                Anatomy and Physiology: Understanding the human
                                body&apos;s structure and function, with a focus
                                on the brain and nervous system. Brain
                                Integration Awareness and Systems: Learning the
                                principles of brain integration, including how
                                different parts of the brain communicate and
                                work together. Executive Functions: Studying the
                                brain&apos;s higher-order processes, such as
                                planning, decision-making, problem-solving, and
                                impulse control. Senses and Reflexes: Exploring
                                how sensory input and reflex actions contribute
                                to brain function and integration. Techniques
                                and Applications: Mastering various techniques
                                for brain integration and their practical
                                applications in clinical settings.
                            </p>

                            <h3 className="font-fira text-black text-base font-bold mt-4">
                                Professional Training
                            </h3>
                            <p className="font-fira text-black text-base font-normal">
                                Objectives and Assessments: Setting clear
                                objectives for brain integration sessions and
                                learning how to assess client progress
                                effectively. Professional Conduct: Maintaining a
                                high standard of professionalism in all
                                interactions with clients and colleagues. Ethics
                                and Boundaries: Adhering to ethical guidelines
                                and establishing appropriate boundaries in
                                client relationships. Good Business Practices:
                                Implementing sound business practices, including
                                client management, record-keeping, and financial
                                responsibilities.
                            </p>

                            <h3 className="font-fira text-black text-base font-bold mt-4">
                                Competency Base
                            </h3>
                            <p className="font-fira text-black text-base font-normal">
                                Effective Communication: Developing strong
                                communication skills to interact effectively
                                with clients and colleagues. Client Clinic
                                Services: Providing comprehensive clinic
                                services, from initial consultations to
                                follow-up sessions. Competency-Based Testing:
                                Demonstrating proficiency through practical
                                exams and assessments. Certification:
                                Successfully completing the certification
                                process to become a recognized Brain Integration
                                practitioner. Upon completion of the 500-hour
                                training, participants must upload proof of
                                their training hours to receive certification.
                                This ensures that all practitioners meet the
                                rigorous standards required to provide
                                high-quality brain integration services.
                            </p>

                            <div className="form-flex gap-10 pt-20 pb-5 mt-4">
                                <button
                                    disabled={isUploaded}
                                    className={`${
                                        !isUploaded
                                            ? 'opacity-50 cursor-not-allowed'
                                            : ''
                                    }`}
                                >
                                    <img
                                        src={PayforandStart}
                                        onClick={
                                            isUploaded ? getAssessment : null
                                        }
                                    />
                                </button>
                                {showPayment && (
                                    <div className="flex flex-col">
                                        <AssessmentPayment
                                            stripePromise={stripePromise}
                                            showPayment={showPayment}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Assessment>
                </Accordion>
            </div>
        </div>
    );
};

export default AccordionCard;
