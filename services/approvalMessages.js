

const ApprovalModel = require('../models/approvalMessages.js');
const { UserModel } = require('../models/User.js');

const getAllApprovalMessagesByUser = async (userEmail) => {
    try {
        // Find the user by their email
        const user = await UserModel.findOne({ userEmail }).populate([
            { path: 'approvalMessages.brainIntegrationTraining', model: 'Approval' },
            { path: 'approvalMessages.clinicalHours', model: 'Approval' },
            { path: 'approvalMessages.firstAidTraining', model: 'Approval' },
            { path: 'approvalMessages.cprCert', model: 'Approval' },
            { path: 'approvalMessages.videoPresentation', model: 'Approval' },
            { path: 'approvalMessages.insurance', model: 'Approval' },
        ])
        console.log(user, 'user email')

        // Check if user exists and return their approval messages
        if (user) {
            return user.approvalMessages;
        } else {
            throw new Error(`User with email ${userEmail} not found.`);
        }
    } catch (error) {
        console.error('Error fetching approval messages:', error);
        throw error;
    }
};

const createMessage = async (metadata) => {
    const message = new ApprovalModel(metadata);
    await message.save();
    return message;
};

//get unread messages only
// const unreadMessages = await ApprovalModel.find({ userEmail: user.email, hasBeenRead: false });

//mark messages as read
// const markAsRead = await ApprovalModel.updateMany(
//     { userEmail: user.email, hasBeenRead: false },
//     { hasBeenRead: true, readTimestamp: new Date() }

    // To archive messages older than a certain period,  add an archived boolean or move older messages to a separate collection for archival.



module.exports = {
    getAllApprovalMessagesByUser,
    createMessage,
};
