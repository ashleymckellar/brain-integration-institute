const ex = require('express');
require('dotenv').config();
const { validateAuthToken } = require('../middleware/auth.js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { ProfileModel } = require('../models/profile');
const { UserModel } = require('../models/User');
const { AssessmentModel } = require('../models/assessment');

const assessmentRouter = ex.Router();

//create get request to get assessment score and date taken by userId

assessmentRouter.get('/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const user = await UserModel.findOne({ userEmail: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const assessment = await AssessmentModel.findOne({ userId: user._id });

        if (!assessment) {
            return res
                .status(404)
                .json({ message: 'Assessment data not found' });
        }

        //this will return score and date taken
        const assessmentData = {
            ...assessment.toObject(),
            score: assessment.score,
            date: assessment.dateTaken,
        };
        res.status(200).json(assessmentData);
    } catch (error) {
        console.error('Error fetching assessment data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//create post request to post assessment score after assessment is completed
//this post request won't happen until assessment is taken
//so if FE makes a request to get this data and they haven't taken the test yet (it returns null), will display N/A or not yet taken
//on FE

// assessmentRouter.post();

assessmentRouter.post('/create-assessment/:email', async (req, res) => {
    const {
        score,
        dateTaken = new Date(),
        duration = 0,
        status = 'incomplete',
        flaggedQuestions = [],
    } = req.body;
    const { email } = req.params; 

    try {
       
        const user = await UserModel.findOne({ userEmail: email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }

        // Find or create assessment data for the user
        let assessmentData = await AssessmentModel.findOne({
            userId: user._id,
        });
        if (!assessmentData) {
            assessmentData = new AssessmentModel({
                userId: user._id,
                score,
                dateTaken,
                duration,
                status,
                flaggedQuestions,
            });
            await assessmentData.save();
            return res.status(201).json({
                success: true,
                message: 'User assessment data created',
                assessmentData,
            });
        }
        return res.status(200).json({ success: true, assessmentData });
    } catch (error) {
        console.error('Error creating assessment data:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});

module.exports = {
    assessmentRouter,
};
