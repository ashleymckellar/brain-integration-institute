const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const {
    getAllNotificationsByUser,
    createMessage,
} = require('../services/notifications');
const NotificationsModel = require('../models/notifications');
const { UserModel } = require('../models/User');
const { sendMail } = require('../nodemailer/sendMail.js');
const { v4: uuidv4 } = require('uuid');

const notificationsRouter = ex.Router();

//these routes are for messages sent by admin to user as to whether a docment is approved or denied

//this works, leave it alone - 11/14/24
notificationsRouter.get('/:useremail', async (req, res) => {
    try {
        const { useremail } = req.params;
        const messages = await getAllNotificationsByUser(useremail);
       
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
       
      
        if (!userEmail) {
            return res.status(400).json({
                error: 'userEmail is a required fields',
            });
        }
        const admin = await UserModel.findOne({ sub: req.auth.payload.sub });
        const adminEmail = admin ? admin.userEmail : 'Admin not found';

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
            uniqueid: uuidv4(), 
        });

        const user = await UserModel.findOne({ userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.approvalMessages[category]) {
            user.approvalMessages[category].push(messageMetadata._id);
        }

        // await user.save();
        const relatedMessages = await NotificationsModel.find({
            userEmail,
            notificationType: {
                $in: [
                    'assessmentUpdate',
                    'docExpirationReminder',
                    'docStatusUpdate',
                    'certificationComplete'
                ],
            },
        }).sort({ timestamp: -1 });
        const sharedAdminEmail = 'ashley.l.mckellar@gmail.com';
        let userSubject = '';
        let userHtmlContent = '';
        if (notificationType === 'docStatusUpdate') {
            userSubject = 'Document Status Update';
            const appUrl = 'https://brain-integration-institute.onrender.com/'
            userHtmlContent = `<p>An admin has reviewed your document.   
              <p>To view response, <a href="${appUrl}">click here</a> to log in.  Message: ${message}  </p></p>`;
        } else {
            userSubject = 'New Notification';
            userHtmlContent = `<p>Notification: ${message}</p>`;
        }
        
        await sendMail(sharedAdminEmail, userSubject, message, userHtmlContent);

        res.status(201).json({
            success: true,
          
            relatedMessages,
        });
      
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

notificationsRouter.put('/:uniqueid/has-been-read', async (req, res) => {
    const { uniqueid } = req.params;
    const { hasBeenRead } = req.body;

    try {
       
        // Use findOneAndUpdate directly
        const updatedNotification = await NotificationsModel.findOneAndUpdate(
            { uniqueid },  // Find by uniqueid
            { hasBeenRead },  // Set the new value
            { new: true }  // Return the updated document
        );

        if (!updatedNotification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        return res.status(200).json(updatedNotification);  // Return the updated document
    } catch (error) {
        console.error('Error updating notification:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});


module.exports = {
    notificationsRouter,
};
