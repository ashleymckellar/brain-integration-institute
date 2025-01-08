const ex = require('express');

const {
    getUserMetaData,
    editUserMetaData,
    getAllUserMetaData,
    deleteUserMetaData,
} = require('../services/user');
const { deleteProfileData } = require('../services/profile');
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
                sub: req.auth.payload.sub,
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
            { userEmail: email },
            { userUploadProgress },
            { new: true, runValidators: true },
        );

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

userRouter.put('/:email/assessment-access', async (req, res) => {
    const { assessmentAccess } = req.body;
    const { email } = req.params;
    if (typeof assessmentAccess !== 'boolean') {
        return res.status(400).json({
            error: 'assessmentAccess is required and must be a boolean',
        });
    }
    try {
        const user = await UserModel.findOneAndUpdate(
            { userEmail: email },
            { assessmentAccess },
            { new: true, runValidators: true },
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error updating assessment access:', error);
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
        console.log(`Updating admin status for user ${email} to ${isAdmin}`);

        const user = await UserModel.findOneAndUpdate(
            { userEmail: email },
            { isAdmin },
            { new: true, runValidators: true },
        );

        if (!user) {
            console.log(`User with email ${email} not found`);
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(`User ${email} admin status updated to:`, user.isAdmin);
        res.json(user);
    } catch (error) {
        console.error('Error updating admin status:', error);
        res.status(500).json({ error: error.message });
    }
});

//route for when they pay to have photo in prac directory, as well as details,
//default is false, will toggle to true once payment is confirmed
userRouter.put('/:email/is-sub-prac', async (req, res) => {
    const { isSubscribedPrac } = req.body;
    const { email } = req.params;

    if (typeof isSubscribedPrac !== 'boolean') {
        return res.status(400).json({
            error: 'isSubscribedPrac is required and must be a boolean',
        });
    }

    try {
        console.log(`Updating user status for user ${email} to ${isSubscribedPrac}`);

        const user = await UserModel.findOneAndUpdate(
            { userEmail: email },
            { isSubscribedPrac },
            { new: true, runValidators: true },
        );

        if (!user) {
            console.log(`User with email ${email} not found`);
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(`User ${email} admin status updated to:`, user.isSubscribedPrac);
        res.json(user);
    } catch (error) {
        console.error('Error updating subscription status:', error);
        res.status(500).json({ error: error.message });
    }
});

userRouter.put('/:email/is-sub-educator', async (req, res) => {
    const { isSubscribedEducator } = req.body;
    const { email } = req.params;

    if (typeof isSubscribedEducator !== 'boolean') {
        return res.status(400).json({
            error: 'isSubscribedEducator is required and must be a boolean',
        });
    }

    try {
        console.log(`Updating user status for user ${email} to ${isSubscribedEducator}`);

        const user = await UserModel.findOneAndUpdate(
            { userEmail: email },
            { isSubscribedEducator },
            { new: true, runValidators: true },
        );

        if (!user) {
            console.log(`User with email ${email} not found`);
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(`User ${email} admin status updated to:`, user.isSubscribedEducator);
        res.json(user);
    } catch (error) {
        console.error('Error updating subscription status:', error);
        res.status(500).json({ error: error.message });
    }
});

userRouter.put('/:email/is-certified', async (req, res) => {
    const { isCertified } = req.body;
    const { email } = req.params;

    if (typeof isCertified !== 'boolean') {
        return res.status(400).json({
            error: 'isCertified is required and must be a boolean',
        });
    }

    try {
        console.log(
            `Updating certification status for user ${email} to ${isCertified}`,
        );

        const updateFields = isCertified
            ? { isCertified, certifiedDate: Date.now() }
            : { isCertified };

        const user = await UserModel.findOneAndUpdate(
            { userEmail: email },
            updateFields,
            { new: true, runValidators: true },
        );

        if (!user) {
            console.log(`User with email ${email} not found`);
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(`User ${email} admin status updated to:`, user.isCertified);
        res.json(user);
    } catch (error) {
        console.error('Error updating admin status:', error);
        res.status(500).json({ error: error.message });
    }
});

//delete assessment - internal use only - i shouldn't actually use this in production
userRouter.patch('/:email/assessment', async (req, res) => {
    const { email } = req.params;
    const { assessment } = req.body;

    try {
        const user = await UserModel.findOne({ userEmail: email });
        if (!user) {
            console.log(`User with email ${email} not found`);
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }

        const originalCount = user.assessments.length;
        user.assessments = user.assessments.filter(
            (id) => id.toString() !== assessment,
        );

        if (user.assessments.length === originalCount) {
            console.log(
                `Assessment ${assessment} not found in user assessments`,
            );
            return res.status(404).json({
                success: false,
                message: 'Assessment not found in user assessments',
            });
        }

        await user.save();

        console.log(`Assessment ${assessment} removed for user ${email}`);
        res.status(200).json({
            success: true,
            message: 'Assessment removed successfully',
            updatedAssessments: user.assessments,
        });
    } catch (error) {
        console.error('Error removing assessment:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//create put route for assessment access

//assessmentAccess will toggle to true
//once admin has approved all uploaded files.
//right now the only thing preventing them from getting the assessment is payment
//but this will be changed once the admin approval flow is built out

//create put route for each document upload.
//once user uploads a doc, the status for that doc type will be toggled to pending approval

userRouter.patch('/:email/document-status', async (req, res) => {
    const email = req.params.email;
    const { documentType, newStatus } = req.body;
    console.log(
        `Received request to update document ${documentType} for user: ${email}`,
    );

    // Ensure the documentType and status are valid
    if (!documentType || !newStatus) {
        return res
            .status(400)
            .send({ message: 'documentType and status are required' });
    }

    const allowedStatuses = [
        'waiting for upload',
        'pending approval',
        'approved',
        'declined',
    ];

    if (!allowedStatuses.includes(newStatus)) {
        return res.status(400).send({ message: 'Invalid status value' });
    }

    const validDocumentTypes = [
        'brainIntegrationTraining',
        'clinicalHours',
        'firstAidTraining',
        'cprCert',
        'videoPresentation',
        'insurance',
    ];

    if (!validDocumentTypes.includes(documentType)) {
        return res.status(400).send({ message: 'Invalid document type' });
    }

    try {
        const user = await UserModel.findOne({ userEmail: email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Update the correct document status field
        user.certListUploadStatus[documentType] = newStatus;

        // Save the updated user document
        const updatedUser = await user.save();

        res.status(200).send(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'An error occurred while updating user metadata.',
        });
    }
});

//delete user route - can only be accessed by admins
userRouter.delete('/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const deletedUser = await UserModel.findOneAndDelete({
            userEmail: email,
        });

        if (!deletedUser) {
            console.log('[Delete Route] User not found');
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('[Delete Route] User deleted successfully');

        try {
            const userId = deletedUser._id; // Assuming `UserModel`'s `_id` corresponds to the `userId` in `ProfileModel`
            await deleteProfileData(userId);
            console.log('[Delete Route] Profile data deleted successfully');
        } catch (profileError) {
            console.error(
                '[Delete Route] Error deleting profile data:',
                profileError,
            );
            return res.status(500).json({
                message:
                    'User deleted, but an error occurred while deleting profile data',
            });
        }
        return res
            .status(200)
            .json({ message: 'User and metadata deleted successfully' });
    } catch (error) {
        console.error('[Delete Route] Error:', error);
        return res
            .status(500)
            .json({ message: 'An error occurred while deleting the user' });
    }
});

module.exports = userRouter;

module.exports = {
    userRouter,
};
