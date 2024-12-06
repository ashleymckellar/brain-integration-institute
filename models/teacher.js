const mg = require('mongoose');
const Schema = mg.Schema;

const TeacherSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
isTeacher: {
    type: Boolean,
    default: false
},
subscriptionDate: {
    type: Date,
    default: Date.now
},
expirationDate: {
    type: Date
},
companyName: {
    type: String
},
phoneNumber: {
    type: String,
},
email: {
    type: String,
},
website: {
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
});

const TeacherModel = mg.model('Profile', TeacherSchema);

module.exports = {
    TeacherModel
};
