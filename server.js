const ex = require('express');
require('dotenv').config()
const path = require('path');
const { apiRouter } = require('./routes/api');
const { adminRouter } = require('./routes/admin')
const { notifyRouter } = require('./routes/notify')
const { enableCors, validateAuthToken } = require('./middleware/auth');
const { staticSiteRouter } = require('./routes/static');
const { UserModel } = require('./models/User');
const { ProfileModel } = require('./models/profile');

// const { errorHandler, logger } = require('./middleware/log');


const server = ex();

server.use(enableCors)

server.use(ex.json());
server.use(ex.urlencoded({ extended: true }));

// server.get('/notify', (req, res) => {
//     res.json({ message: 'route enabled!' });
// });



server.use('/api', validateAuthToken, apiRouter)
server.use(ex.static(path.resolve(__dirname, 'client', 'dist')))
// server.get('*', staticSiteRouter)

server.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });

  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
  });


// server.get('/api/files', (req, res) => {
//     res.json({ message: 'CORS enabled!' });
// });



// server.post('/assessment', async (req, res) => {
//     try {
//         const { userId, status } = req.body;
//         if (!userId || !status) {
//             return res.status(400).json({ error: 'Missing required fields' });
//         }

//         const notificationData = await createNotification({
//         timestamp, isAshAwesome, testName
//         });
//         res.status(201).json({ success: true, notificationData });
//     } catch (error) {
//         console.error('Error processing request:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

server.get('/public-profiles', async (req, res) => {
 

    try {
        const profiles = await ProfileModel.find();
        const users = await UserModel.find({}, '_id isCertified userProfilePicture');

        const mergedProfiles = profiles.map((profile) => {
            const associatedUser = users.find(user => user._id.toString() === profile.userId.toString());
            return {
                ...profile.toObject(),
                practitionerImage: associatedUser?.userProfilePicture || '',
                isCertified: associatedUser?.isCertified || false,
            };
        });


        const certifiedProfiles = mergedProfiles
            .filter(profile => profile.isCertified)
   
             
            

        res.json(certifiedProfiles);
    } catch (error) {
        console.error('Error fetching public profiles:', error);
        res.status(500).json({ message: 'Error fetching public profiles' });
    }
});





// server.post('/webhook', (req, res) => {
//     const payload = req.body; 
//     // console.log('Webhook received:', payload);
//     res.status(200).send({ message: 'Webhook received successfully' });
// });




module.exports = {
    server
}