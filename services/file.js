const File = require('../models/file');
const { UserModel } = require('../models/User.js');
// const { upload } = require("./cdn");

// Update the getAllFilesByOwner function
const getAllFilesByOwner = async (userSub) => {
    try {
        // Get the authenticated user's 'sub' from Auth0

        // Find the user by the 'sub' value
        const user = await UserModel.findOne({ sub: userSub }); // Use the 'sub' field for finding the user
        console.log(userSub); // This will be the Auth0 sub

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find files associated with the user’s ID
        const files = await File.find({ user: user._id });
        console.log(files, 'Files found for user');

        return files; 
    } catch (error) {
        console.error('Error fetching files:', error);
        throw new Error('Failed to fetch files');
    }
};

// const getAllFilesByOwner = async (user) => await File.find({
//     user
// });

/**
 * Create a new file entry in the database
 * @param {Object} metadata - The file metadata to save
 */
const createFile = async (req, res) => {
    try {
        // Assuming `sub` is passed as part of the authenticated user
        const userSub = req.auth.payload.sub; // Get the authenticated user's 'sub'

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
            uniqueid: req.body.uniqueid, 
            
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
    getAllFilesByOwner,
};
