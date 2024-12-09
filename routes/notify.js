const ex = require('express');
const { createNotification } = require('../services/notify');
// const { processFile } = require('../middleware/cdn');
// const { getAllFilesByOwner, createFile } = require('../services/file');
// const File  = require('../models/file');
// const cloudinary = require('cloudinary').v2;

const notifyRouter = ex.Router();

notifyRouter.get('/', async (req, res, next) => {
    try {
        console.log('test route');
        res.status(200).send({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500);
        next(err);
    }
});

notifyRouter.post('/assessment', async (req, res) => {
    try {
        const { userId, status } = req.body;
        if (!userId || !status) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const notificationData = await createNotification({
        timestamp, isAshAwesome, testName
        });
        res.status(201).json({ success: true, notificationData });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//  ileRouter.post('/', async (req, res) => {
//     try {
//         const { publicId, url, uploadDate, filename, sectionName } = req.body;

//         if (!publicId || !url || !uploadDate || !filename) {
//             return res.status(400).json({ error: 'Missing required fields' });
//         }

//         const fileMetadata = await createFile({
//             filename,
//             user: req.auth.payload.sub,
//             publicId,
//             url,
//             uploadDate,
//             isApproved: false,
//             sectionName
//         });

//         res.status(201).json({ success: true, fileMetadata  });
//     } catch (error) {
//         console.error('Error processing request:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

module.exports = {
    notifyRouter,
};
