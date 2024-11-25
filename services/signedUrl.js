const cloudinary = require('cloudinary').v2;

// Generate a signed URL for a private file
const generateSignedUrl = (publicId, resourceType = 'raw') => {
  return cloudinary.utils.signed_url(
    `${publicId}`, // Public ID of the file
    {
      resource_type: resourceType,
      type: 'private',
      expires_at: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
    }
  );
};