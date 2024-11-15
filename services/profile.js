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


module.exports = {
    createProfileData,
    getAllProfileMetaData
};
