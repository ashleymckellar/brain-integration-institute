const { QuestionModel } = require('../models/question.js');
const { QuestionSetModel } = require('../models/questionSet.js');
const { TestModel } = require('../models/test.js');
const { ProfileModel } = require('../models/profile');
const { UserModel } = require('../models/User');
const ex = require('express');

const testRouter = ex.Router();

//api/test is the endpoint
//make test questions required on test model
//add to post route
//make patch request with end time
//if end time is greater than 90 mins from start time, declined the patch request
//so that user can't tamper with timer to try to get more time

testRouter.post('/:email/generate', async (req, res) => {
    const { email } = req.params;
    console.log('email passed to route', req.user?.email);
    const { startTime } = req.body;

    try {
        const user = await UserModel.findOne({ userEmail: email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }

        let testData = await TestModel.findOne({ userId: user._id });
        if (!testData) {
            testData = new TestModel({
                userId: user._id,
                startTime,
            });
            await testData.save();
            return res.status(201).json({
                success: true,
                message: 'User test created',
                testData,
            });
        }
        return res.status(200).json({ success: true, testData });
    } catch (error) {
        console.error('Error creating test data:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});

testRouter.patch('/:email/end-time', async (req, res) => {
    const email = req.params.email;
    const { endTime, testCompleted } = req.body;
    console.log(
        `Received request to update test end time for user: ${email}, End Time: ${endTime}, Test Completed: ${testCompleted}`,
    );

    try {
       
        const user = await UserModel.findOne({ userEmail: email });
       
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

      
        const testData = await TestModel.findOneAndUpdate(
            { userId: user._id  }, 
            { 
                endTime: endTime || Date.now(),  
                testCompleted: testCompleted || true  
            },
        );

        console.log(testData, 'test data')

        if (!testData) {
            return res.status(404).send({ message: 'Active test not found or already completed' });
        }

      
        res.status(200).send(testData);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'An error occurred while updating test data.',
        });
    }
});

//i think this needs to be a post request because user will submit patch request with the submitted answers at the end of the
//test
//it also needs to have the randomization logic

// //testRouter.post('/generate', async (req, res) => {
//     const userId = req.user.id; // Assuming user authentication
//     const selectedQuestions = [];

//     const categories = [
//         { category: 'Category1', count: 8 },
//         { category: 'Category2', count: 2 },
//         // Add other categories here
//     ];

//     for (const { category, count } of categories) {
//         const questions = await QuestionModel.aggregate([
//             { $match: { setName: category } },
//             { $sample: { size: count } },
//         ]);
//         selectedQuestions.push(...questions.map(q => q._id));
//     }

//     const test = new TestModel({
//         userId,
//         questions: selectedQuestions.map(id => ({ questionId: id })),
//     });

//     await test.save();
//     res.status(201).json(test);
// });

//route for posting unique test for each user using random algorithm
//will also contain the patch request with the user submitted answer

// testRouter.patch('/:testId/submit', async (req, res) => {
//     const { testId } = req.params;
//     const { answers } = req.body; // { questionId: 'submittedAnswer' }

//     const test = await TestModel.findById(testId).populate('questions.questionId');

//     if (!test) return res.status(404).json({ message: 'Test not found' });

//     test.questions.forEach(q => {
//         if (answers[q.questionId._id]) {
//             q.submittedAnswer = answers[q.questionId._id];
//         }
//     });

//     // Calculate the score
//     const score = test.questions.reduce((sum, q) => {
//         return sum + (q.submittedAnswer === q.questionId.correctAnswer ? 1 : 0);
//     }, 0);

//     test.score = score;
//     test.testCompleted = true;
//     test.endTime = new Date();

//     await test.save();

//     res.status(200).json({ score, test });
// });

module.exports = {
    testRouter,
};
