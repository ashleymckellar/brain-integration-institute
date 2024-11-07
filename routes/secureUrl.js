const cloudinary = require('cloudinary').v2;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateSignedUrl = (publicId) => {
    return cloudinary.url(publicId, {
        sign_url: true,
        type: 'authenticated',

        
        sign_options: {
            expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
        },
    });
};

const handlePaymentSuccess = async (req, res) => {
    const { paymentIntentId, publicId } = req.body;

    try {
        // Confirm the payment
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status === 'succeeded') {
            // Payment is successful, generate the signed Cloudinary URL
            const signedUrl = generateSignedUrl(publicId);
            console.log('Signed URL:', signedUrl);

            // Redirect the user to the signed Cloudinary URL
            return res.redirect(signedUrl);
        } else {
            return res.status(400).json({ message: 'Payment not successful' });
        }
    } catch (error) {
        console.error('Error handling payment success:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    generateSignedUrl,
    handlePaymentSuccess
};