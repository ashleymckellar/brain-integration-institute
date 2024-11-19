const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const {
    getAllNotificationsByUser,
    createMessage,
} = require('../services/notifications');
const NotificationsModel = require('../models/notifications');
const { UserModel } = require('../models/User');

const notificationsRouter = ex.Router();

//these routes are for messages sent by admin as to whether a docment is approved or denied

//this works, leave it alone - 11/14/24
notificationsRouter.get('/:useremail', async (req, res) => {
    try {
        const { useremail } = req.params;
        const messages = await getAllNotificationsByUser(useremail);
        console.log(messages, 'message');
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

//post new message to user
notificationsRouter.post('/', async (req, res) => {
    try {
        const {
            message,
            userEmail,
            category,
            notificationType,
            notificationStatus,
        } = req.body;
        console.log('JWT sub:', req.auth.payload);
        console.log(req.body, 'req.body');
        console.log('Category:', category);
        if (!userEmail) {
            return res.status(400).json({
                error: 'userEmail, and category are required fields',
            });
        }
        const admin = await UserModel.findOne({ sub: req.auth.payload.sub });
        const adminEmail = admin ? admin.userEmail : 'Admin not found';
        console.log('Admin Email:', adminEmail);
        if (!admin || !admin.userEmail) {
            return res.status(401).json({ error: 'Admin not found' });
        }

        const messageMetadata = await createMessage({
            message,
            admin: adminEmail,
            timestamp: Date.now(),
            userEmail,
            category,
            notificationType,
            notificationStatus,
        });

        const user = await UserModel.findOne({ userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.approvalMessages[category]) {
            user.approvalMessages[category].push(messageMetadata._id);
        }

        await user.save();
        const relatedMessages = await NotificationsModel.find({
            userEmail,
            notificationType: {
                $in: [
                    'assessmentUpdate',
                    'docExpirationReminder',
                    'docStatusUpdate',
                ],
            },
        }).sort({ timestamp: -1 });

        res.status(201).json({
            success: true,
            messageMetadata,
            relatedMessages,
        });
      
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

notificationsRouter.put('/:email/has-been-read', async (req, res) => {
    const { hasBeenRead } = req.body;
    const { email } = req.params;
    if (typeof hasBeenRead !== 'boolean') {
        return res.status(400).json({
            error: 'hasBeenRead is required and must be a boolean',
        });
    }
    try {
        const user = await NotificationsModel.findOneAndUpdate(
            { userEmail: email },
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

module.exports = {
    notificationsRouter,
};
