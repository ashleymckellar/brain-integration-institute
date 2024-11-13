/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { CloudinaryContext } from '../contexts';
const AdminUploadManagement = () => {
    const {
        uploadCompletionCertificate,
        getCertificate,
        deleteCertificate,
        certificates,
        setCertificates,
    } = useContext(CloudinaryContext);
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
       // const [certificateData, setCertificateData] = useState({});
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

    useEffect(() => {
        if (certificates) {
            console.log('Certificate Data:', certificates); 
            // console.log('Certificate URL:', certificateData.url);
        }
    }, [certificates]);

    return (
        <div>
            <button
                className="border border-black p-5 rounded-xl"
                alt="Upload Completion Certificate"
                onClick={uploadCompletionCertificate}
            >
                Upload completion certificate
            </button>
            {certificates && certificates.length > 0 && certificates[0].secure_url ? (
                <div>
                    <button className='border border-black mt-10 ml-10 rounded-xl bg-green-is-good text-white p-5'>
                    <a href={certificates[0].secure_url} target="_blank" rel="noopener noreferrer">
            View Certificate
        </a>
        </button>
                </div>
            ) : (
                <div>No certificates found</div>
            )}
        </div>
    );
};

export default AdminUploadManagement;
