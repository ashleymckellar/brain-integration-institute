const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const { getAllNotifications } = require('../services/adminNotifications');
const { createNotification } = require('../services/adminNotifications');
const AdminNotificationsModel = require('../models/notifications');
const { UserModel } = require('../models/User');
const NotificationsModel = require('../models/notifications');

const adminNotificationsRouter = ex.Router();

///base endpoint is /api/admin-notifications

// //these routes are for messages sent to admins to notify them that a user has uploaded a doc for review
//or that a user has passed/failed exam

adminNotificationsRouter.get('/', async (req, res) => {
    try {
        const notifications = await getAllNotifications();

        res.status(200).json(notifications.length ? notifications : []);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

// //post new notification to admin when a doc status changes

adminNotificationsRouter.post('/', async (req, res) => {
    try {
        const { message, category, notificationType, notificationStatus } =
            req.body;

        // Get the authenticated user from JWT
        const authenticatedUser = await UserModel.findOne({
            sub: req.auth.payload.sub,
        });
        console.log(authenticatedUser, 'authenticated user');
        if (!authenticatedUser) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Find all admin users
        if (!authenticatedUser.isAdmin) {
            return res
                .status(403)
                .json({ error: 'Access denied. Admins only.' });
        }

        const sharedAdminEmail = 'sharedadmin@test.com';

        // Create notifications for each admin
        const notificationData = {
            message,
            category,
            notificationType,
            notificationStatus,
            timestamp: Date.now(),
            userEmail: authenticatedUser.userEmail,
            admin: sharedAdminEmail, // Send to the shared admin email
        };

        const notification = await createNotification(notificationData);

        // Populate the firstName and lastName fields
        const populatedNotification = await AdminNotificationsModel.populate(
            notification,
            {
                path: 'firstName lastName',
                model: 'User',
            },
        );

        res.status(201).json({
            success: true,
            notification: populatedNotification,
        });
    } catch (error) {
        console.error('Error creating notifications:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

adminNotificationsRouter.put('/has-been-read', async (req, res) => {
    const { hasBeenRead } = req.body;
  
    if (typeof hasBeenRead !== 'boolean') {
        return res.status(400).json({
            error: 'hasBeenRead is required and must be a boolean',
        });
    }
    try {
        const user = await AdminNotificationsModel.findOneAndUpdate(
           
            { hasBeenRead },
            { new: true, runValidators: true },
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error updating study guide access:', error);
        res.status(500).json({ error: error.message });
    }
});

//         const admin = await UserModel.findOne({ sub: req.auth.payload.sub });
//         const adminEmail = admin ? admin.userEmail : 'Admin not found';
//         console.log('Admin Email:', adminEmail);
//         if (!admin || !admin.userEmail) {
//             return res.status(401).json({ error: 'Admin not found' });
//         }

//         const messageMetadata = await createMessage({
//             message,
//             admin: adminEmail,
//             timestamp: Date.now(),
//             userEmail,
//             category,
//             notificationType,
//             notificationStatus,
//         });

//         const user = await UserModel.findOne({ userEmail });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         if (user.approvalMessages[category]) {
//             user.approvalMessages[category].push(messageMetadata._id);
//         }

//         await user.save();
//         const relatedMessages = await NotificationsModel.find({
//             userEmail,
//             notificationType: {
//                 $in: [
//                     'assessmentUpdate',
//                     'docExpirationReminder',
//                     'docStatusUpdate',
//                 ],
//             },
//         }).sort({ timestamp: -1 });

//         res.status(201).json({
//             success: true,
//             messageMetadata,
//             relatedMessages,
//         });

//     } catch (error) {
//         console.error('Error processing request:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// notificationsRouter.put('/:email/has-been-read', async (req, res) => {
//     const { hasBeenRead } = req.body;
//     const { email } = req.params;
//     if (typeof hasBeenRead !== 'boolean') {
//         return res.status(400).json({
//             error: 'hasBeenRead is required and must be a boolean',
//         });
//     }
//     try {
//         const user = await NotificationsModel.findOneAndUpdate(
//             { userEmail: email },
//             { hasBeenRead },
//             { new: true, runValidators: true },
//         );
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.json(user);
//     } catch (error) {
//         console.error('Error updating study guide access:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

module.exports = {
    adminNotificationsRouter,
};
