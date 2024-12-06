const { ProfileModel } = require('../models/profile');

const createProfileData = async (data) => {
    const profile = new ProfileModel(data);
    await profile.save();
    return profile;
};

const getAllProfileMetaData = async () => {
    const allProfiles = await ProfileModel.find()
    return allProfiles
}

const deleteProfileData = async (userId) => {
    const profile = await ProfileModel.findOneAndDelete({userId})
}


module.exports = {
    createProfileData,
    getAllProfileMetaData,
    deleteProfileData
};
