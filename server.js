const ex = require('express');
require('dotenv').config();
const path = require('path');
const { apiRouter } = require('./routes/api');
const { adminRouter } = require('./routes/admin');
const { notifyRouter } = require('./routes/notify');
const { enableCors, validateAuthToken } = require('./middleware/auth');
const { staticSiteRouter } = require('./routes/static');
const { UserModel } = require('./models/User');
const { ProfileModel } = require('./models/profile');
const bodyParser = require('body-parser'); 

// const { errorHandler, logger } = require('./middleware/log');

const server = ex();

server.use(enableCors);

server.use(bodyParser.json({ limit: '20mb' })); 

server.use(ex.json());
server.use(ex.urlencoded({ extended: true }));

// server.get('/notify', (req, res) => {
//     res.json({ message: 'route enabled!' });
// });

server.use('/api', validateAuthToken, apiRouter);

server.get('/pracs/public-profiles', async (req, res) => {
    try {
        const profiles = await ProfileModel.find();
        const users = await UserModel.find(
            {},
            '_id isCertified userProfilePicture isisSubscribedEducator isSubscribedPrac',
        );

        const mergedProfiles = profiles.map((profile) => {
            const associatedUser = users.find(
                (user) => user._id.toString() === profile.userId.toString(),
            );
            return {
                ...profile.toObject(),
                practitionerImage: associatedUser?.userProfilePicture || '',
                isCertified: associatedUser?.isCertified || false,
                isSubscribedEducator: associatedUser?.isSubscribedPrac || false,
                isSubscribedPrac: associatedUser?.isSubscribedPrac || false
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
            email: profile.userId.userEmail,
            isSubscribedEducator: profile.userId.isSubscribedEducator,
            isSubscribedPrac: profile.userId.isSubscribedPrac
        };
        res.status(200).json(profileData);
    } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
server.use(ex.static(path.resolve(__dirname, 'client', 'dist')));
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

module.exports = {
    server,
};