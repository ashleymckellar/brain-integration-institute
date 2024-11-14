const  File  = require("../models/file");
const { UserModel } = require('../models/User.js');
// const { upload } = require("./cdn");

// Update the getAllFilesByOwner function
const getAllFilesByOwner = async (userSub) => {
    try {
        const files = await File.find({ user: userSub });
        return files;
    } catch (error) {
        throw new Error('Error fetching files');
    }
};


/**
 * Create a new file entry in the database
 * @param {Object} metadata - The file metadata to save
 */
const createFile = async (req, res) => {
    try {
        // Assuming `sub` is passed as part of the authenticated user
        const userSub = req.auth.payload.sub // Get the authenticated user's 'sub'
        
        // Find the user by the 'sub' value (Auth0 identifier)
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
        });

        // Save the file document
        await newFile.save();
        res.status(201).json(newFile);
    } catch (error) {
        console.error('Error creating file:', error);
        res.status(500).json({ error: 'Failed to create file' });
    }
};

module.exports = {
    createFile,
    getAllFilesByOwner
};