const AdminNotificationsModel = require('../models/adminNotifications.js');
const NotificationsModel = require('../models/notifications.js')
const { UserModel } = require('../models/User.js');

// const { adminNotificationsRouter } = require('../routes/adminNotifications.js');


//fetches all notifications regarding users and send to admin panel
//saved under shared admin email address and accessible by all admins
const getAllNotifications = async () => {
    try {
        // Fetch additional notification types (e.g., assessmentUpdate, docExpirationReminder)
        const allNotifications = await AdminNotificationsModel.find({
            notificationType: {
                $in: [
                    'assessmentUpdate',
                    'docExpirationReminder',
                    'docStatusUpdate',
                ],
            },
        }).sort({ timestamp: -1 }); // Sort notifications by timestamp (newest first)

        return allNotifications;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw new Error('Error fetching notifications');
    }
};

//create notification when a user action happens, such as uploading a new doc for review or pass/fail exam
// const createNotification = async (data) => {
//     const notification = new AdminNotificationsModel(data);
//     await notification.save();
//     return notification;
// };

//admin creates a message and send it to a user

// const createMessage = async (metadata) => {
//     const message = new NotificationsModel(metadata);
//     await message.save();
//     return message;
// };


const createNotification = async (data) => {
    data.admin = 'sharedadmin@test.com'
    const notification = new AdminNotificationsModel(data);
    await notification.save();
    return notification;
};

//create function to post new notification when a user upload a new document for review



//get unread messages only
// const unreadMessages = await ApprovalModel.find({ userEmail: user.email, hasBeenRead: false });

//mark messages as read
// const markAsRead = await ApprovalModel.updateMany(
//     { userEmail: user.email, hasBeenRead: false },
//     { hasBeenRead: true, readTimestamp: new Date() }

// To archive messages older than a certain period,  add an archived boolean or move older messages to a separate collection for archival.

module.exports = {
    getAllNotifications,

    createNotification
};
