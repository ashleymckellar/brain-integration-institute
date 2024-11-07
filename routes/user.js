const ex = require('express');

const {
    getUserMetaData,
    createUserMetaData,
    editUserMetaData,
    getAllUserMetaData,
} = require('../services/user');
const { UserModel } = require('../models/User');
const { ProfileModel } = require('../models/profile');

const userRouter = ex.Router();

//route which creates user metadata post request on first sign in by new user
userRouter.post('/createuser', async (req, res) => {
    const { userEmail, userName, userProfilePicture } = req.body;

    try {
        let userMetaData = await UserModel.findOne({ userEmail });

        if (!userMetaData) {
            userMetaData = new UserModel({
                userEmail,
                userName,
                userProfilePicture: userProfilePicture || '',
                userUploadProgress: 0,
                isAdmin: false,
            });

            await userMetaData.save();

            return res
                .status(201)
                .json({ message: 'User metadata created', userMetaData });
        }

        return res.status(200).json({ userMetaData });
    } catch (error) {
        console.error('Error checking or creating user metadata:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

//get user specific user metadata
userRouter.get('/:email', async (req, res) => {
    const { email } = req.params;
    console.log('Received email param:', email);
    try {
        const profile = await ProfileModel.findOne({ email });
      
        const user = await UserModel.findOne({ userEmail: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userWithProfileData = {
            ...user.toObject(),
            firstName: profile ? profile.firstName : null,
            lastName: profile ? profile.lastName : null,
        };

        const userMetaData = await getUserMetaData(email);
      
        const response = { ...userWithProfileData, ...userMetaData };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching user metadata', error);
        res.status(500).json({ error: 'Failed to send user metadata' });
    }
});

//need a get request to get all users
userRouter.get('/', async (req, res) => {
    try {
        const allUserMetaData = await getAllUserMetaData();
        if (!allUserMetaData) {
            return res.status(404).json({ message: 'no user metadata found' });
        }
        const usersWithProfileData = await Promise.all(
            allUserMetaData.map(async (user) => {
                const profile = await ProfileModel.findOne({
                    userId: user._id,
                }).select('firstName lastName');

                // Spread firstName and lastName into user if profile is found
                return profile
                    ? {
                          ...user.toObject(),
                          firstName: profile.firstName,
                          lastName: profile.lastName,
                      }
                    : user;
            }),
        );

        return res.status(200).json(usersWithProfileData);
    } catch (error) {
        console.error('Error fetching all users metadata', error);
        res.status(500).json({ error: 'Failed to send all users metadata' });
    }
});

// Route to update user progress
userRouter.put('/:email/progress', async (req, res) => {
    const { userUploadProgress } = req.body;
    const { email } = req.params;
    console.log('Request body:', req.body);
    console.log('Email to find:', email);

    if (
        userUploadProgress === undefined ||
        typeof userUploadProgress !== 'number'
    ) {
        return res.status(400).json({
            error: 'userUploadProgress is required and must be a number',
        });
    }

    try {
        const user = await UserModel.findOneAndUpdate(
            { userEmail: email }, // Updated to match the correct field name
            { userUploadProgress }, // Increment the userUploadProgress field
            { new: true, runValidators: true },
        );

        console.log('User found:', user); // Log the found user (or null if not found)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message });
    }
});

//create put route to update user profile pic status

userRouter.put('/:email/profile-picture', async (req, res) => {
    const { userProfilePicture } = req.body;
    const { email } = req.params;
    if (typeof userProfilePicture !== 'string') {
        return res.status(400).json({
            error: 'userProfilePicture must be a string',
        });
    }
    try {
        const user = await UserModel.findOneAndUpdate(
            { userEmail: email },
            { userProfilePicture },
            { new: true, runValidators: true },
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error updating user profile picture:', error);
        res.status(500).json({ error: error.message });
    }
});

//create put route to update user study guide status
userRouter.put('/:email/study-guide', async (req, res) => {
    const { studyGuideAccess } = req.body;
    const { email } = req.params;
    if (typeof studyGuideAccess !== 'boolean') {
        return res.status(400).json({
            error: 'studyGuideAccess is required and must be a boolean',
        });
    }
    try {
        const user = await UserModel.findOneAndUpdate(
            { userEmail: email },
            { studyGuideAccess },
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

userRouter.put('/:email/is-admin', async (req, res) => {
    const { isAdmin } = req.body;
    const { email } = req.params;
    if (typeof isAdmin !== 'boolean') {
        return res.status(400).json({
            error: 'isAdmin is required and must be a boolean',
        });
    }
    try {
        const user = await UserModel.findOneAndUpdate(
            { userEmail: email },
            { isAdmin },
            { new: true, runValidators: true },
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error updating admin status:', error);
        res.status(500).json({ error: error.message });
    }
});

//create put route for assessment access

//assessmentAccess will toggle to true
//once admin has approved all uploaded files.
//right now the only thing preventing them from getting the assessment is payment
//but this will be changed once the admin approval flow is built out

//create put route for each document upload.
//once user uploads a doc, the status for that doc type will be toggled to pending approval

userRouter.put('/:email/document-status', async (req, res) => {
    const email = req.params.email; // Get the email from the URL parameters
    const { certListUploadStatus } = req.body;

    try {
        const updatedUser = await editUserMetaData(email, {
            certListUploadStatus,
        });
        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(updatedUser); // Send back the updated user document
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'An error occurred while updating user metadata.',
        });
    }
});

module.exports = userRouter;

module.exports = {
    userRouter,
};
