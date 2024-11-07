const mg = require('mongoose');

const AdminSchema = new mg.Schema({
    // User's Email
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true, 
        unique: true
    },
    profilePic: {
        type: String,
        default: ''
    }
});

const AdminModel = mg.model('Admin', AdminSchema);

module.exports = {
    AdminModel
}
