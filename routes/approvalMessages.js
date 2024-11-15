const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const {
    getAllApprovalMessagesByUser,
    createMessage,
} = require('../services/approvalMessages');
const ApprovalModel = require('../models/approvalMessages');
const { UserModel } = require('../models/User');

const approvalMessagesRouter = ex.Router();

//these routes are for messages sent by admin as to whether a docment is approved or denied

//this works, leave it alone - 11/14/24
approvalMessagesRouter.get('/:useremail', async (req, res) => {
    try {
        const { useremail } = req.params;
        const messages = await getAllApprovalMessagesByUser(useremail);
        console.log(messages, 'message');
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

//post new message to user
approvalMessagesRouter.post('/', async (req, res) => {
    try {
        const { message, userEmail, category } = req.body;
        console.log('JWT sub:', req.auth.payload);
        console.log(req.body, 'req.body');
        console.log('Category:', category);
        if (!message || !userEmail) {
            return res.status(400).json({
                error: 'Message, userEmail, and category are required fields',
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
        });

        const user = await UserModel.findOne({ userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.approvalMessages[category]) {
            user.approvalMessages[category].push(messageMetadata._id);
        } else {
            return res
                .status(400)
                .json({ error: 'Invalid category specified' });
        }

        await user.save();
        res.status(201).json({ success: true, messageMetadata });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = {
    approvalMessagesRouter,
};
