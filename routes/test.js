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

testRouter.post('/:email/user-test', async (req, res) => {
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
            { userId: user._id },
            {
                endTime: endTime || Date.now(),
                testCompleted: testCompleted || true,
            },
        );

        console.log(testData, 'test data');

        if (!testData) {
            return res.status(404).send({
                message: 'Active test not found or already completed',
            });
        }

        res.status(200).send(testData);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'An error occurred while updating test data.',
        });
    }
});

//creates test for user with random questions based on how many questions per section

testRouter.get('/:email/generate', async (req, res) => {
    const { email } = req.params;
    const user = await UserModel.findOne({ userEmail: email });
    if (!user) {
        return res
            .status(404)
            .json({ success: false, message: 'User not found' });
    }

    const userId = user._id;
    const selectedQuestions = [];

    const sections = [
        { category: 'section1', count: 8 },
        { category: 'section2', count: 8 },
        { category: 'section3', count: 4 },
        { category: 'section4', count: 5 },
        { category: 'section5', count: 1 },
        { category: 'section6', count: 3 },
        { category: 'section7', count: 3 },
        { category: 'section8', count: 2 },
        { category: 'section9', count: 5 },
        { category: 'section10', count: 5 },
        { category: 'section11', count: 2 },
        { category: 'section12', count: 4 },
        { category: 'section13', count: 1 },
        { category: 'section14', count: 1 },
        { category: 'section15', count: 2 },
        { category: 'section16', count: 2 },
        { category: 'section17', count: 2 },
        { category: 'section18', count: 2 },
        { category: 'section19', count: 3 },
        { category: 'section20', count: 1 },
        { category: 'section21', count: 6 },
        { category: 'section22', count: 6 },
        { category: 'section23', count: 3 },
        { category: 'section24', count: 3 },
        { category: 'section25', count: 1 },
        { category: 'section26', count: 2 },
        { category: 'section27', count: 1 },
        { category: 'section28', count: 1 },
        { category: 'section29', count: 1 },
        { category: 'section30', count: 1 },
        { category: 'section31', count: 2 },
        { category: 'section32', count: 2 },
        { category: 'section33', count: 1 },
        { category: 'section34', count: 2 },
        { category: 'section35', count: 1 },
        { category: 'section36', count: 1 },
        { category: 'section37', count: 1 },
        { category: 'section38', count: 1 },
    ];

    for (const { category, count } of sections) {
        const questions = await QuestionModel.aggregate([
            { $match: { setName: category } },
            { $sample: { size: count } },
        ]);

        selectedQuestions.push(
            ...questions.map((q) => ({
                questionId: q._id,
                questionText: q.questionText,
                optionA: q.optionA,
                optionB: q.optionB,
                optionC: q.optionC,
                optionD: q.optionD,
                correctAnswer: q.correctAnswer,
                setName: q.setName,
                questionType: q.questionType
            })),
        );
    }

    const test = new TestModel({
        userId,
        questions: selectedQuestions,
    });

    console.log(selectedQuestions.length, 'selected questions');

    await test.save();
    res.status(201).json(test);
});

//user submitted responses

// testRouter.patch('/:testId/submit', async (req, res) => {

// });

module.exports = {
    testRouter,
};
