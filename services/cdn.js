/**
 * Service functions for interacting with Cloudinary SDK
 * @docs https://cloudinary.com/documentation/node_integration 
 */

const { v2: cloudinary } = require('cloudinary');



/**
 * Initialize Cloudinary SDK
 */
const init = () => {
    return cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

/**
 * Upload single file from buffer
 * @param {String} filename 
 * @param {*} file 
 * 
 */

const upload = async (filename, file) => {
    return await new Promise((res, rej) => {
        const cb = (err, result) => {
            if (err) return rej(err);
            res(result);
        };
        cloudinary.uploader.upload_stream({
            resource_type: 'auto',
            folder: 'documents',
            public_id: 'users/{user.sub}/{category}/{filename}',
            unique_filename: true,
            overwrite: false,
        }, cb)
            .end(file.buffer);
    })
}


module.exports = {
    init,
    upload,
}