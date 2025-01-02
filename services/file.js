const File = require('../models/file');
const { UserModel } = require('../models/User.js');
// const { upload } = require("./cdn");

// Update the getAllFilesByOwner function
const getAllFilesByOwner = async (userSub) => {
    try {
        const user = await UserModel.findOne({ sub: userSub });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const files = await File.find({ user: user._id });
        console.log(files, 'Files found for user');

        return files;
    } catch (error) {
        console.error('Error fetching files:', error);
        throw new Error('Failed to fetch files');
    }
};

/**
 * Create a new file entry in the database
 * @param {Object} metadata - The file metadata to save
 */
const createFile = async (req, res) => {
    try {
        const userSub = req.auth.payload.sub;

        const user = await UserModel.findOne({ sub: userSub });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newFile = new File({
            publicId: req.body.publicId,
            url: req.body.url,
            uploadDate: req.body.uploadDate,
            filename: req.body.filename,
            isApproved: req.body.isApproved,
            user: user._id,
            sectionName: req.body.sectionName,
            uniqueid: req.body.uniqueid,
        });

        await newFile.save();
        res.status(201).json(newFile);
    } catch (error) {
        console.error('Error creating file:', error);
        res.status(500).json({ error: 'Failed to create file' });
    }
};

module.exports = {
    createFile,
    getAllFilesByOwner,
};
