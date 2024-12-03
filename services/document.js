const axios = require('axios');
const Certificate = require('../models/certificate');
const { workspaceevents } = require('googleapis/build/src/apis/workspaceevents');
const cloudinary = require('cloudinary').v2;

// Function to get user specific images from Cloudinary
const getImagesFromCloudinary = async (folder) => {
    const allAssets = [];

    try {
        const requestURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`;

        const authHeader = Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
        ).toString('base64');

        const searchParams = {
            expression: `folder=${folder}`,
        };

        const cloudinaryResponse = await axios.post(requestURL, searchParams, {
            headers: {
                Authorization: `Basic ${authHeader}`,
                'Content-Type': 'application/json',
            },
        });

        const resources = cloudinaryResponse.data.resources;

        allAssets.push(...resources);
        return allAssets;
    } catch (error) {
        console.error(
            'Error fetching images from Cloudinary:',
            error.response?.data || error.message,
        );
        throw new Error('Failed to fetch images');
    }
};

const getThumbnailImages = async (folders) => {
    const requestURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`;
    const authHeader = Buffer.from(
        `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
    ).toString('base64');
    try {
        // Fetch resources with transformation for thumbnail size
        const results = await Promise.all(
            folders.map(async (folder) => {
                const searchParams = {
                    expression: `folder=${folder}`,
                    // Add transformations for thumbnails (width, height, crop, and quality)
                    max_results: 20,
                    transformation: {
                        width: 150,
                        height: 150,
                        crop: 'fill',
                        quality: 'auto',
                    },
                };
                const response = await axios.post(requestURL, searchParams, {
                    headers: {
                        Authorization: `Basic ${authHeader}`,
                        'Content-Type': 'application/json',
                    },
                });
                return response.data.resources;
            }),
        );

        return results.flat();
    } catch (error) {
        console.error(
            'Error fetching images from Cloudinary:',
            error.response?.data || error.message,
        );
        throw new Error('Failed to fetch images');
    }
};

//getCertificateFromCloudinary
const getCertificateFromCloudinary = async () => {
    try {
        const requestURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`;
        const authHeader = Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
        ).toString('base64');

        const searchParams = {
            expression: `folder=certificate`,
        };

        const cloudinaryResponse = await axios.post(requestURL, searchParams, {
            headers: {
                Authorization: `Basic ${authHeader}`,
                'Content-Type': 'application/json',
            },
        });

        const resource = cloudinaryResponse.data.resources;

        return resource;
    } catch (error) {
        console.error(
            'Error fetching certificate from Cloudinary:',
            error.response?.data || error.message,
        );
        throw new Error('Failed to fetch images');
    }
};

// const getCompletionCertificate = async (userName) => {
//     try {
//         const today = new Date();
//         const dateFormatted = today.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//         });

    //    this works, saving for later
        // cloudinary.api.create_transformation('named-certificate79', {
        //     transformation: [
               
        //         { overlay: { 
        //             font_family: "Arial", 
        //             font_size: 20, 
        //             text: "December 2 2024" 
              
        //         },     gravity: 'center', 
        //         x: 440, 
        //         y: 410, 
          
        //         flags: 'layer_apply' },
              
        //     ],
        // })
        // .then((result) => {
        //     console.log(result);
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
        
        // Generate the URL with the transformation applied
        console.log(cloudinary.url('BIIcerttemplate_vravdg', {
            transformation: [
                'named-certificate79'
          
            ]
        }));
        

const createCertificate = async (certificateData) => {
    const certificate = new Certificate(certificateData);
    await certificate.save();
    return certificate;
};

module.exports = {
    getImagesFromCloudinary,
    getCertificateFromCloudinary,
    createCertificate,
    getThumbnailImages,
    // getCompletionCertificate,
};
