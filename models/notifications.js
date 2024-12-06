const mg = require('mongoose');
const Schema = mg.Schema;
const { v4: uuidv4 } = require('uuid');

const NotificationsSchema = new mg.Schema({
    uniqueid: { type: String, default: uuidv4 }, 
    message: {
        type: String
    },
    admin: {
        type: String,
       
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    userEmail: { type: Schema.Types.String, ref: 'User'},
    hasBeenRead: {
        type: Boolean,
        default: false
    },
    readTimestamp: {
        type: Date,
        default: null 
    },
    notificationType: {
        type: String,
        enum: ['assessmentUpdate', 'docExpirationReminder', 'docStatusUpdate', 'certificationComplete', 'adminUpdate'],
        required: true
    },

    //clinicalHours, brainIntegrationTraining, etc
    category: {
        type: String
    }, 
    notificationStatus: {
        type: String,
        enum: ['approved', 'declined', 'passed', 'failed']
    }
});

const NotificationsModel = mg.model('Notifications', NotificationsSchema);

module.exports = 
     NotificationsModel

