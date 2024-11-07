/* eslint-disable react/no-unescaped-entities */
import { useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { CloudinaryContext } from '../contexts';
const AdminUploadManagement = () => {
    const { uploadCompletionCertificate, getCertificate, deleteCertificate, certificateData, setCertificateData} = useContext(CloudinaryContext);
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const token = localStorage.getItem('token');
                try {
                    const certificate = await getCertificate(token); 
                    setCertificateData(certificate)
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

   {certificateData && (console.log(certificateData))}
 

    //handleChange

    //handleSubmit
    return (
        <div>
            <button className='border border-black p-5 rounded-xl'  alt="Upload Completion Certificate" onClick={uploadCompletionCertificate}>
                Upload completion certificate
                    
                   
              
            </button>
            {/* <p>{certificateData.filename}</p> */}
        </div>
    );
};

export default AdminUploadManagement;
