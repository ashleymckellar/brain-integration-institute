const mg = require('mongoose');
const Schema = mg.Schema;
const { v4: uuidv4 } = require('uuid');

const AdminNotificationsSchema = new mg.Schema({
    uniqueid: { type: String, default: uuidv4 }, 
    message: {
        type: String,
    },
    admin: {
        type: Schema.Types.String,
        ref: 'User',    // Reference the User model for the admin
        required: true, 
       
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    userEmail: { type: Schema.Types.String, ref: 'User' },
    firstName: { type: Schema.Types.String, ref: 'User'},
    Name: { type: Schema.Types.String, ref: 'User'},
    hasBeenRead: {
        type: Boolean,
        default: false,
    },
    readTimestamp: {
        type: Date,
        default: null,
    },
    notificationType: {
        type: String,
        enum: ['assessmentUpdate', 'docExpirationReminder', 'docStatusUpdate'],
        required: true,
    },

    //clinicalHours, brainIntegrationTraining, etc
    category: {
        type: String,

        enum: [
            'clinicalHours',
            'brainIntegrationTraining',
            'firstAidTraining',
            'cprCert',
            'videoPresentation',
            'insurance',
        ], // Use enums for consistency
    },
    notificationStatus: {
        type: String,
        enum: ['approved', 'declined', 'passed', 'failed', 'pending'],
    },
});

const AdminNotificationsModel = mg.model(
    'AdminNotifications',
    AdminNotificationsSchema,
);

module.exports = AdminNotificationsModel;
