const NotificationsModel = require('../models/notifications.js');
const AdminNotificationsModel = require('../models/adminNotifications.js')
const { UserModel } = require('../models/User.js');

const getAllNotificationsByUser = async (userEmail) => {
    try {
        if (typeof userEmail !== 'string') {
            throw new Error('userEmail should be a string.');
        }

       

       
        const user = await UserModel.findOne({ userEmail })

     

  
        if (user) {
           
            const additionalNotifications = await NotificationsModel.find({
                userEmail,
                notificationType: { $in: ['assessmentUpdate', 'docExpirationReminder', 'docStatusUpdate'] },
            }).sort({ timestamp: -1 }); // Sort notifications by timestamp (newest first)

           
            const allNotifications = {
                // approvalMessages: user.approvalMessages,
                additionalNotifications, // add the additional notifications to the result
            };

            return allNotifications;
        } else {
            throw new Error(`User with email ${userEmail} not found.`);
        }
    } catch (error) {
        console.error('Error fetching approval messages:', error);
        throw error;
    }
};

//this creates a notification when a user uploads a doc or passes/fails the exam and sends it to admins
const createMessage = async (metadata) => {
    const message = new NotificationsModel(metadata);
    await message.save();
    return message;
};




//get unread messages only

//no longer using this route, filtering is done on frontend  
// const unreadMessages = await ApprovalModel.find({ userEmail: user.email, hasBeenRead: false });

//mark messages as read
// const markAsRead = await ApprovalModel.updateMany(
//     { userEmail: user.email, hasBeenRead: false },
//     { hasBeenRead: true, readTimestamp: new Date() }

// To archive messages older than a certain period,  add an archived boolean or move older messages to a separate collection for archival.

module.exports = {
    getAllNotificationsByUser,

    createMessage,
};
