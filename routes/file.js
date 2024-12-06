const ex = require('express');
const { getAllFilesByOwner, createFile } = require('../services/file');
const File = require('../models/file');
const { UserModel } = require('../models/User');
const cloudinary = require('cloudinary').v2;

const fileRouter = ex.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



fileRouter.get('/files/:user', async (req, res) => {
    try {
        const { user } = req.params;
        const files = await getAllFilesByOwner(user);
        if (!files || files.length === 0) {
            return res.json([]);
        }

        res.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json([]);
    }
});

//get file metadata from all users
fileRouter.get('/', async (req, res) => {
    try {
        // Get the authenticated user's 'sub' value
        const userSub = req.auth.payload.sub;

        // Call the updated function to get all files for the authenticated user
        const files = await getAllFilesByOwner(userSub);

        if (!files || files.length === 0) {
            return res.json([]);
        }

        // Return the files if found
        res.status(200).json({ success: true, files });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json([]);
    }
});

// //creates metadata upon successful cloudinary upload

fileRouter.post('/', async (req, res) => {
    try {
        const { publicId, url, uploadDate, filename, sectionName, uniqueid } = req.body;

        if (!publicId || !url || !uploadDate || !filename) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await createFile(req, res); // No need to send another response here
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

fileRouter.delete('/:publicId', async (req, res) => {
    const publicId = req.params.publicId;

    try {
        // Optionally, retrieve file metadata or use a rule to infer file type
        const fileMetadata = await File.findOne({ publicId: publicId });
        console.log(fileMetadata)

        // Determine the resource type based on the file extension or metadata
        let resourceType = 'auto'; // Default to 'auto', which detects the file type automatically
        if (fileMetadata) {
            const fileExtension = fileMetadata.url.split('.').pop().toLowerCase();
            console.log(fileExtension, 'file extension')

            if (fileExtension === 'mp4' || fileExtension === 'mov' || fileExtension === 'avi') {
                resourceType = 'video';
            } else if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
                resourceType = 'image';
            } else if (fileExtension === 'pdf') {
                resourceType = 'raw'; // For PDFs, we can treat them as raw files if needed
            }
        }

        console.log(resourceType, 'resource type')

       
        const result = await cloudinary.uploader.destroy(publicId, {  resource_type: resourceType } );

        console.log(result, 'cloudinary delete');

        if (result.result === 'ok') {
            await File.findOneAndDelete({ publicId: publicId });
            res.status(200).json({ message: 'File deleted successfully' });
        } else {
            res.status(404).json({ message: 'File not found' });
        }
    } catch (error) {
        console.error('Error deleting file from Cloudinary:', error);
        res.status(500).json({ message: 'Error deleting file', error });
    }
});


fileRouter.get('/test-delete/:publicId', async (req, res) => {
    const publicId = req.params.publicId;

    try {
        const result = await File.deleteOne({ publicId: publicId });
        if (result.deletedCount === 0) {
            return res
                .status(404)
                .json({ success: false, message: 'File metadata not found' });
        }
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error('Error during delete test:', error.message);
        console.error(error.stack); // Log the stack for more details
        res.status(500).json({
            message: 'Error during delete test',
            error: error.message,
        });
    }
});

module.exports = {
    fileRouter,
};
