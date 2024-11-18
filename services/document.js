const axios = require('axios');
const Certificate = require('../models/certificate');

// Function to get user specific images from Cloudinary
const getImagesFromCloudinary = async (folder) => {
    console.log("now why are you calling this one?  You know that ain't right!")
    const allAssets = [];

    try {
        const requestURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`;
       

        const authHeader = Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
        ).toString('base64');

        const searchParams = {
            expression: `folder=${folder} AND resource_type:image`,
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
        `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
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
                        crop: "fill", 
                        quality: "auto" 
                    }
                };
                const response = await axios.post(requestURL, searchParams, {
                    headers: {
                        Authorization: `Basic ${authHeader}`,
                        'Content-Type': 'application/json',
                    },
                });
                return response.data.resources;
            })
        );

        return results.flat();
    } catch (error) {
        console.error('Error fetching images from Cloudinary:', error.response?.data || error.message);
        throw new Error('Failed to fetch images');
    }
};


//getCertificateFromCloudinary
const getCertificateFromCloudinary = async () => {
    console.log('the right function to be called, you big dummy')
    try {
        const requestURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`;
        const authHeader = Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
        ).toString('base64');
        console.log('Requesting from URL:', requestURL);

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

const createCertificate = async (certificateData) => {
    const certificate = new Certificate(certificateData);
    await certificate.save();
    return certificate;
};

module.exports = {
    getImagesFromCloudinary,
    getCertificateFromCloudinary,
    createCertificate,
    getThumbnailImages
};
