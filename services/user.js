const { UserModel } = require('../models/User'); // Destructure to get UserModel

const createUserMetaData = async (metadata) => {
    const user = new UserModel(metadata);
    await user.save();
    return user;
};

const getUserMetaData = async (email) => {
    const user = await UserModel.findOne({
        userEmail: email,
    });
  
    return user;
};



const getAllUserMetaData = async () => {
    const allUsers = await UserModel.find();
    return allUsers;
};

const editUserMetaData = async (email, updates) => {
    const updateFields = {};

    if (updates.certListUploadStatus) {
        console.log('Cert List Upload Status:', updates.certListUploadStatus);
        for (const key in updates.certListUploadStatus) {
            if (updates.certListUploadStatus.hasOwnProperty(key)) {
                updateFields[`certListUploadStatus.${key}`] =
                    updates.certListUploadStatus[key];
            }
        }
    }

    return await UserModel.findOneAndUpdate(
        { userEmail: email },
        { $set: updateFields },
        { new: true },
    );
};

module.exports = {
    getUserMetaData,
    createUserMetaData,
    editUserMetaData,
    getAllUserMetaData,
    
};
