const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const { getAllFilesByOwner, createFile } = require('../services/file');
const File  = require('../models/file');
const cloudinary = require('cloudinary').v2; 

const fileRouter = ex.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// fileRouter.get('/health', (req, res) => {
//     res.status(200).json({ message: 'API is working!' });
// });

//gets user specific file metadata
fileRouter.get('/files/:user', async (req, res) => {
    try {
        const { user } = req.params; 
        const files = await getAllFilesByOwner(user); 
        res.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Failed to fetch files' });
    }
});

//get file metadata from all users
fileRouter.get('/', async (req, res, next) => {
    try {
        const files = await File.find()
        console.log(files)
        res.status(200).send({ success: true, files });
    } catch (err) {
        console.error(err);
        res.status(500);
        next(err);
    }
 });
 


// //creates metadata upon successful cloudinary upload

//create put route to update isApproved on the file object

fileRouter.post('/', async (req, res) => {
    try {
        const { publicId, url, uploadDate, filename, sectionName } = req.body;

        if (!publicId || !url || !uploadDate || !filename) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const fileMetadata = await createFile({
            filename,
            user: req.auth.payload.sub,
            publicId,
            url,
            uploadDate,
            isApproved: false,
            sectionName
        });

        res.status(201).json({ success: true, fileMetadata  });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

console.log('File model:', File);

fileRouter.delete('/:publicId', async (req, res) => {
    const publicId = req.params.publicId;
    
    try {
        console.log('Attempting to delete file with publicId:', publicId);
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(result, "cloudinary delete")
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
            return res.status(404).json({ success: false, message: 'File metadata not found' });
        }
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error('Error during delete test:', error.message);
        console.error(error.stack); // Log the stack for more details
        res.status(500).json({ message: 'Error during delete test', error: error.message });
    }
});

module.exports = {
    fileRouter,
};
