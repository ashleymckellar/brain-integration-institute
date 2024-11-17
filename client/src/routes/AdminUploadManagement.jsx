// 
// 

/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import whitetrashcan from '../assets/icons/whitetrashcan.png';
import trashcan from '../assets/icons/Trashcan.png';
import whiteUploadIcon from '../assets/icons/whiteuploadicon1.png';

import { CloudinaryContext } from '../contexts';

const AdminUploadManagement = () => {
    const {
        uploadCompletionCertificate,
        getCertificate,
        deleteCertificate,
        certificates,
        setCertificates,
    } = useContext(CloudinaryContext);
    const { user } = useAuth0();

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const certificate = await getCertificate();
                    console.log('Certificate Response:', certificate);
                    setCertificates(certificate);
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

    console.log(certificates)

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-center font-fira text-lg md:text-xl lg:text-2xl py-6 px-4">
                Manage document uploads below. To upload a new document, please delete any existing document first.
            </h2>

            {/* Certificate Section */}
            {certificates && certificates.length > 0 && certificates[0].secure_url ? (
                <div className="flex flex-col items-center text-center w-full max-w-md p-6 border border-charcoal rounded-xl my-6">
                    <h3 className="text-2xl font-fira mb-4">Certificate</h3>
                    <div className="flex justify-center flex-wrap gap-4">
                        <button className="bg-green-is-good hover:bg-green-500  text-white text-xl px-4 py-2 rounded-md">
                            <a href={certificates[0].secure_url} target="_blank" rel="noopener noreferrer">
                                View PDF
                            </a>
                        </button>
                        <button
                            disabled={certificates.length > 0}
                            className={`${
                                certificates.length > 0
                                    ? 'opacity-50 cursor-not-allowed bg-green-is-good hover:bg-green-500  text-white px-4 py-2 rounded-md'
                                    : 'bg-green-is-good text-white px-4 py-2 rounded-md'
                            }`}
                            alt="Upload Completion Certificate"
                            onClick={uploadCompletionCertificate}
                        >
                            <img src={whiteUploadIcon} alt="Upload Icon" className="w-6" />
                        </button>
                        <button
                            onClick={deleteCertificate}
                            className="bg-white p-2 rounded-md"
                            alt="Delete Certificate"
                        >
                            <img src={trashcan} alt="Delete Icon" className="w-6" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center text-lg font-fira my-4">No certificates found</div>
            )}

            {/* Study Guide Section */}
            {certificates && certificates.length > 0 && certificates[0].secure_url ? (
                <div className="flex flex-col items-center text-center w-full max-w-md p-6 border border-charcoal rounded-xl my-6">
                    <h3 className="text-2xl font-fira mb-4">Study Guide</h3>
                    <div className="flex justify-center flex-wrap gap-4">
                        <button className="bg-green-is-good hover:bg-green-500  text-white text-xl px-4 py-2 rounded-md">
                            <a href={certificates[0].secure_url} target="_blank" rel="noopener noreferrer">
                                View PDF
                            </a>
                        </button>
                        <button
                            disabled={certificates.length > 0}
                            className={`${
                                certificates.length > 0
                                    ? 'opacity-50 cursor-not-allowed bg-green-is-good hover:bg-green-500  text-white px-4 py-2 rounded-md'
                                    : 'bg-green-is-good text-white px-4 py-2 rounded-md'
                            }`}
                            alt="Upload Study Guide"
                            onClick={uploadCompletionCertificate}
                        >
                            <img src={whiteUploadIcon} alt="Upload Icon" className="w-6" />
                        </button>
                        <button
                            onClick={(() =>deleteCertificate(certificates[0].publicId))}
                            className="bg-white p-2 rounded-md"
                            alt="Delete Study Guide"
                        >
                            <img src={trashcan} alt="Delete Icon" className="w-6" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center text-lg font-fira my-4">No study guide found
                <button
                disabled={certificates.length > 0}
                className={`${
                    certificates.length > 0
                        ? 'opacity-50 cursor-not-allowed bg-green-is-good hover:bg-green-500  text-white px-4 py-2 rounded-md'
                        : 'bg-green-is-good text-white px-4 py-2 rounded-md'
                }`}
                alt="Upload Study Guide"
                onClick={uploadCompletionCertificate}
            >
                <img src={whiteUploadIcon} alt="Upload Icon" className="w-6" />
            </button>
            </div>)}

            {/* Assessment Section */}
            {certificates && certificates.length > 0 && certificates[0].secure_url ? (
                <div className="flex flex-col items-center text-center w-full max-w-md p-6 border border-charcoal rounded-xl my-6">
                    <h3 className="text-2xl font-fira mb-4">Assessment</h3>
                    <div className="flex justify-center flex-wrap gap-4">
                        <button className="bg-green-is-good hover:bg-green-500  text-white text-xl px-4 py-2 rounded-md">
                            <a href={certificates[0].secure_url} target="_blank" rel="noopener noreferrer">
                                View PDF
                            </a>
                        </button>
                        <button
                            disabled={certificates.length > 0}
                            className={`${
                                certificates.length > 0
                                    ? 'opacity-50 cursor-not-allowed bg-green-is-good hover:bg-green-500  text-white px-4 py-2 rounded-md'
                                    : 'bg-green-is-good text-white px-4 py-2 rounded-md'
                            }`}
                            alt="Upload Assessment"
                            onClick={uploadCompletionCertificate}
                        >
                            <img src={whiteUploadIcon} alt="Upload Icon" className="w-6" />
                        </button>
                        <button
                            onClick={deleteCertificate}
                            className="bg-white p-2 rounded-md"
                            alt="Delete Assessment"
                        >
                            <img src={trashcan} alt="Delete Icon" className="w-6" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center text-lg font-fira my-4">No assessment found</div>
            )}
        </div>
    );
};

export default AdminUploadManagement;