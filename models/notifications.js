const mg = require('mongoose');
const Schema = mg.Schema;

const NotificationsSchema = new mg.Schema({
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
        enum: ['assessmentUpdate', 'docExpirationReminder', 'docStatusUpdate'],
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

