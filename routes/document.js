//routes for docs on cloudinary (not metadata)
const ex = require('express');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const { validateAuthToken } = require('../middleware/auth.js');
const {
    getImagesFromCloudinary,
    getCertificateFromCloudinary,
    createCertificate,
    getThumbnailImages,
    getCompletionCertificate
} = require('../services/document.js');
const Certificate = require('../models/certificate.js');
const documentRouter = ex.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//route to fetch admin uploaded certificate template

documentRouter.get('/certificate', validateAuthToken, async (req, res) => {
  
    try { //getCertificateFromCloudinary
        const certificates = await getCertificateFromCloudinary('certificate');
       ;
        console.log('Calling function:', getCertificateFromCloudinary.toString());
        res.json(certificates);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to fetch certificates from Cloudinary',
        });
    }
});

documentRouter.get('/completion-certificate', validateAuthToken, async (req, res) => {
    const userName = 'Jane Doe';
    try { //getCertificateFromCloudinary
        const certificateURL = await getCompletionCertificate(userName);
        console.log('Generated Certificate URL:', certificateURL);
        return certificateURL;
    } catch (error) {
        console.error(error);
        res.status(500).json({
             error: 'Error generating certificate'
        });
    }
});

//this route no longer needed because cloudinary docs are all nested in a document type in the route below
documentRouter.get('/:nickname', validateAuthToken, async (req, res) => {
    const nickname = req.params.nickname;
    const folder = `users/${nickname}/`;
   
    try {
        const images = await getImagesFromCloudinary(folder);
       
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to fetch images from Cloudinary',
        });
    }
});

//get docs by doc type/folder
//this works now with getImagesFromCloudinary function - don't mess with it
documentRouter.get('/:userEmail/:documentType', validateAuthToken, async (req, res) => {
    const { userEmail, documentType } = req.params;

 
    const nickname = userEmail.split('@')[0];
    
    const folder = `users/${nickname}/${documentType}`;
   
    
    try {
        const images = await getImagesFromCloudinary(folder);
       
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to fetch images from Cloudinary',
        });
    }
});




//upload new certificate/metadata
documentRouter.post('/certificate', validateAuthToken, async (req, res) => {
    try {
        const { publicId, url, uploadDate, filename } = req.body;
        if (!publicId || !url || !uploadDate || !filename) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const certificateData = await createCertificate({
            filename,
            user: req.auth.payload.sub,
            publicId,
            url,
            uploadDate,
        });
        res.status(201).json({ success: true, certificateData });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//delete certificate and metadata
documentRouter.delete('/certificate/:publicId', async (req, res) => {
    const publicId = req.params.publicId;
    try {
       
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(result, 'cloudinary delete');
        if (result.result === 'ok') {
            await Certificate.findOneAndDelete({ publicId: publicId });
            res.status(200).json({
                message: 'Certificate deleted successfully',
            });
        } else {
            res.status(404).json({ message: 'Certificate not found' });
        }
    } catch (error) {
        console.error('Error deleting certificate from Cloudinary:', error);
        res.status(500).json({ message: 'Error deleting certificate', error });
    }
});

module.exports = {
    documentRouter,
};
