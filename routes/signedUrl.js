const ex = require('express');
const cloudinary = require('cloudinary').v2;

const signedUrlRouter = ex.Router();
const { getUserMetaData } = require('../services/user');
const { generateSignedUrl, handlePaymentSuccess } = require('./secureUrl');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

signedUrlRouter.post('/get-signed-url', async (req, res) => {
    const { userEmail, publicId } = req.body;

    try {
        const user = await getUserMetaData(userEmail);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const signedUrl = cloudinary.url(publicId, {
            secure: true,
            sign_url: true,
          
            format: 'pdf', 
           
            expires_at: Math.floor(Date.now() / 1000) + 3600, // Expiry time (1 hour)
        });

        res.json({ signedUrl });
    } catch (error) {
        console.error('Error generating signed URL:', error);
        res.status(500).json({ message: 'Failed to generate signed URL' });
    }
});

module.exports = signedUrlRouter
