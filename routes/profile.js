const ex = require('express');
// const { processFile } = require('../middleware/cdn');
const { createProfileData, getAllProfileMetaData } = require('../services/profile');
const { ProfileModel } = require('../models/profile');
const { UserModel } = require('../models/User');

const profileRouter = ex.Router();

//api/profile

//create get request to get all active practitioner profiles
//save in context on FE


//create get request to get profile info by user (eg, email)
//call get request in useEffect in the profile page
//if !profileData - render text to create profile - post request is submitted on form submit
//if profileData -  render text to edit profile - put request is submitted on form submit

//create put request for profile data

profileRouter.get('/', async (req, res) => {
    try {
        const allProfileMetaData = await getAllProfileMetaData()
        if (!allProfileMetaData) {
            return res.status(404).json({ message: 'no profile metadata found'})
        }
        return res.status(200).json(allProfileMetaData)
    } catch (error) {
        console.error('Error fetching all profile metadata', error);
        res.status(500).json({ error: 'Failed to send all profile metadata' });
    }
})


profileRouter.get('/:email', async (req, res) => {
    const { email } = req.params;
    console.log('Received email param:', email);
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
        };
        res.status(200).json(profileData);
    } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

profileRouter.post('/create-profile', async (req, res) => {
    const {
        firstName,

        lastName,
        suffix,
        phoneNumber,
        email,
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
        country,
        bio,
        userProfilePicture
    } = req.body;

    console.log(req.body);
    try {
        // Find the user by their email to get the userId
        const user = await UserModel.findOne({ userEmail: email }); // Assuming the userEmail is used to find the user
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }

        // Check if the profile already exists for the user
        let profileData = await ProfileModel.findOne({ userId: user._id });
        if (!profileData) {
            // Create the profile with the userId from the User model
            profileData = new ProfileModel({
                userId: user._id, // Set the userId here
                firstName,
                lastName,
                suffix,
                phoneNumber,
                email,
                addressLine1,
                addressLine2,
                city,
                state,
                zip,
                country,
                bio,
                userProfilePicture
            });
            await profileData.save();
            return res.status(201).json({
                success: true,
                message: 'User profile created',
                profileData,
            });
        }
        return res.status(200).json({ success: true, profileData });
    } catch (error) {
        console.error('Error creating profile data:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});

profileRouter.put('/:email', async (req, res) => {
    const { email } = req.params;
    const updatedData = req.body;
    try {
        // Update only the fields that are provided and not empty
        const filteredData = Object.fromEntries(
            Object.entries(updatedData).filter(
                ([key, value]) => value !== '' && value !== null,
            ),
        );

        const user = await UserModel.findOne({ userEmail: email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }

        const updatedProfile = await ProfileModel.findOneAndUpdate(
            { userId: user._id },
            { $set: req.body },
            {
                new: true,
                runValidators: true,
            },
        );
        if (!updatedProfile) {
            return res
                .status(404)
                .json({ success: false, message: 'Profile not found' });
        }

        return res.status(200).json({ success: true, updatedProfile });
    } catch (error) {
        console.error('Error updating profile data:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});

module.exports = {
    profileRouter,
};
