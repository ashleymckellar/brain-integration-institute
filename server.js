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


server.use('/api', validateAuthToken, apiRouter)
// server.use('/admin', adminRouter)
// server.use(ex.static(path.resolve(__dirname, 'client', 'dist')))
// server.get('*', staticSiteRouter)


server.get('/api/files', (req, res) => {
    res.json({ message: 'CORS enabled!' });
});

server.get('/pracs/public-profiles', async (req, res) => {
    try {
        const profiles = await ProfileModel.find();
        const users = await UserModel.find(
            {},
            '_id isCertified userProfilePicture',
        );

        const mergedProfiles = profiles.map((profile) => {
            const associatedUser = users.find(
                (user) => user._id.toString() === profile.userId.toString(),
            );
            return {
                ...profile.toObject(),
                practitionerImage: associatedUser?.userProfilePicture || '',
                isCertified: associatedUser?.isCertified || false,
            };
        });

        const certifiedProfiles = mergedProfiles.filter(
            (profile) => profile.isCertified,
        );

        res.json(certifiedProfiles);
    } catch (error) {
        console.error('Error fetching public profiles:', error);
        res.status(500).json({ message: 'Error fetching public profiles' });
    }
});

//public route for getting single profile
server.get('/pracs/public-profiles/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const user = await UserModel.findOne({ userEmail: email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const profile = await ProfileModel.findOne({ userId: user._id }).populate({
      
            path: 'userId',
            select: 'userProfilePicture',
        });
       
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        const profileData = {
            ...profile.toObject(),
            userProfilePicture: profile.userId.userProfilePicture,
            email: profile.userId.userEmail
        };
        res.status(200).json(profileData);
    } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).json({ message: 'Server error' });
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