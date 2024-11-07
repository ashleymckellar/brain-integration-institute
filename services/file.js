const  File  = require("../models/file");
// const { upload } = require("./cdn");

const getAllFilesByOwner = async (user) => await File.find({
    user
});

/**
 * Create a new file entry in the database
 * @param {Object} metadata - The file metadata to save
 */
const createFile = async (metadata) => {
    const file = new File(metadata);                           
    await file.save();
    return file;
};

module.exports = {
    createFile,
    getAllFilesByOwner
};