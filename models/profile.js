const mg = require('mongoose');
const Schema = mg.Schema;

const ProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },
    suffix: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    addressLine1: {
        type: String,
    },
    addressLine2: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    },
    country: {
        type: String,
    },
    bio: {
        type: String,
    },

    userProfilePicture: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const ProfileModel = mg.model('Profile', ProfileSchema);

module.exports = {
    ProfileModel,
};
