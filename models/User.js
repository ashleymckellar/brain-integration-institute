const mg = require('mongoose');
const Schema = mg.Schema;

const ApprovalModel = require('./notifications');
const AssessmentModel = require('./assessment')

const UploadStatus = {
    WAITINGFORUPLOAD: 'waiting for upload',
    PENDINGAPPROVAL: 'pending approval',
    APPROVED: 'approved',
    DECLINED: 'declined',
};

const UserSchema = new mg.Schema({
    userEmail: {
        type: String,
        required: true,
    },

    sub: { type: String, required: true, unique: true },

    userProfilePicture: {
        type: String,
        default: '',
    },

    userName: {
        type: String,
        required: true,
       
        default: function() {
            return this.userEmail; 
        },
    },

    firstName: {
        type: Schema.Types.ObjectId,
        ref: 'ProfileModel',
    },

    lastName: {
        type: Schema.Types.ObjectId,
        ref: 'ProfileModel',
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
    // User's password

    userUploadProgress: {
        type: Number,
        required: true,
        default: 0,
    },
    //all user statuses set to waiting for upload by default.  As users upload docs, this toggles to pending, and once admin approves/denies, the status is updated from there

    certListUploadStatus: {
        brainIntegrationTraining: {
            type: String,
            enum: [
                UploadStatus.WAITINGFORUPLOAD,
                UploadStatus.PENDINGAPPROVAL,
                UploadStatus.APPROVED,
                UploadStatus.DECLINED,
            ],
            default: UploadStatus.WAITINGFORUPLOAD,
            required: true,
        },
        clinicalHours: {
            type: String,
            enum: [
                UploadStatus.WAITINGFORUPLOAD,
                UploadStatus.PENDINGAPPROVAL,
                UploadStatus.APPROVED,
                UploadStatus.DECLINED,
            ],
            default: UploadStatus.WAITINGFORUPLOAD,
            required: true,
        },
        firstAidTraining: {
            type: String,
            enum: [
                UploadStatus.WAITINGFORUPLOAD,
                UploadStatus.PENDINGAPPROVAL,
                UploadStatus.APPROVED,
                UploadStatus.DECLINED,
            ],
            default: UploadStatus.WAITINGFORUPLOAD,
        },
        cprCert: {
            type: String,
            enum: [
                UploadStatus.WAITINGFORUPLOAD,
                UploadStatus.PENDINGAPPROVAL,
                UploadStatus.APPROVED,
                UploadStatus.DECLINED,
            ],
            default: UploadStatus.WAITINGFORUPLOAD,
        },
        videoPresentation: {
            type: String,
            enum: [
                UploadStatus.WAITINGFORUPLOAD,
                UploadStatus.PENDINGAPPROVAL,
                UploadStatus.APPROVED,
                UploadStatus.DECLINED,
            ],
            default: UploadStatus.WAITINGFORUPLOAD,
        },
        insurance: {
            type: String,
            enum: [
                UploadStatus.WAITINGFORUPLOAD,
                UploadStatus.PENDINGAPPROVAL,
                UploadStatus.APPROVED,
                UploadStatus.DECLINED,
            ],
            default: UploadStatus.WAITINGFORUPLOAD,
        },
    },

    approvalMessages: {
        brainIntegrationTraining: [
            { type: Schema.Types.ObjectId, ref: 'Approval' },
        ],
        clinicalHours: [{ type: Schema.Types.ObjectId, ref: 'Approval' }],
        firstAidTraining: [{ type: Schema.Types.ObjectId, ref: 'Approval' }],
        cprCert: [{ type: Schema.Types.ObjectId, ref: 'Approval' }],
        videoPresentation: [{ type: Schema.Types.ObjectId, ref: 'Approval' }],
        insurance: [{ type: Schema.Types.ObjectId, ref: 'Approval' }],
    },
    // After the Stripe API confirms the successful payment for the Study Guide
    studyGuideAccess: {
        type: Boolean,
        default: false,
    },
    // Once all required documents have been passed by the Administrator, another hook will switch the Assessment Access
    // to "true" and rerender the page with an active 'Take Assessment' button
    assessmentAccess: {
        type: Boolean,
        default: false,
    },

    assessments: [{ type: Schema.Types.ObjectId, ref: 'AssessmentModel' }],

    //have they paid for the details button/profile pic for their practitioner listing on the find prac page?
    isSubscribedPrac: {
        type: Boolean,
        default: false,
    },


    //have they paid to be added to BI educator directory?
    isSubscribedEducator: {
        type: Boolean,
        default: false
    },

    //will toggle to true once all docs approved and assessment receives passing score once admin approves their profile
    isCertified: {
        type: Boolean,
        default: false,
    },
        certifiedDate: {
            type: Date,
            default: Date.now
        },
        retestDate: { type: Date },
        freeRetestUsed: { type: Boolean, default: false }, 
        retestAttempts: { type: Number, default: 0 },
    },
);

const UserModel = mg.model('User', UserSchema);

module.exports = {
    UserModel
};
