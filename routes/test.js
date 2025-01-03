const { QuestionModel } = require('../models/question.js');
const { QuestionSetModel } = require('../models/questionSet.js');
const { TestModel } = require('../models/test.js');
const { ProfileModel } = require('../models/profile');
const { UserModel } = require('../models/User');
const ex = require('express');

const { tabulateScore, updateSubmittedAnswers } = require('../services/test');

const testRouter = ex.Router();

//api/test is the endpoint
//make test questions required on test model
//add to post route
//make patch request with end time
//if end time is greater than 90 mins from start time, declined the patch request
//so that user can't tamper with timer to try to get more time



//creates test for user with random questions based on how many questions per section

//i need to create a route which fetches the user specific test after it is already created, not create a new one.
//I'll use the generate route when they first pay for the test,
//and the new route I'll create if they want to access the test later, like from their profile

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
    let questionNumber = 1; 

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
                questionNumber: questionNumber++,
                questionId: q._id,
                questionText: q.questionText,
                optionA: q.optionA,
                optionB: q.optionB,
                optionC: q.optionC,
                optionD: q.optionD,
                correctAnswer: q.correctAnswer,
                setName: q.setName,
                questionType: q.questionType,
            })),
        );
    }

    const test = new TestModel({
        userId,
        questions: selectedQuestions,
    });

    console.log(selectedQuestions.length, 'selected questions');

    await test.save();
    user.assessments.push(test._id)
    await user.save();
    res.status(201).json(test);
});

//create get route to get test by email
//this route is triggered whenever they click to start the test.
//it should also add the startTime to the test object

testRouter.patch('/:email/start-test/:testId', async (req, res) => {
    const { email, testId } = req.params;

    try {
       
        const user = await UserModel.findOne({ userEmail: email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

    
        const test = await TestModel.findOne({ _id: testId, userId: user._id });
        if (!test) {
            return res.status(404).json({ success: false, message: 'Test not found' });
        }

      
 

        if (test.completed) {
            return res.status(400).json({
                success: false,
                message: 'Test has already been completed',
            });
        }

    
        test.startTime = new Date();

  
        await test.save();

        console.log(`Test ${testId} started for user ${email}`);
        res.status(200).json({
         
            test
        });
    } catch (error) {
        console.error('Error starting test:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});


//user submitted responses

testRouter.patch('/:testId/submit', async (req, res) => {
    const { testId } = req.params;
    const { submittedAnswers } = req.body;

    try {
   
        const result = await updateSubmittedAnswers(testId, submittedAnswers);
        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }

      
        const { score, percentageScore } = await tabulateScore(testId);

     
        const updatedTest = await TestModel.findById(testId);
        updatedTest.score = score;
        updatedTest.testCompleted = true;  
        updatedTest.endTime = new Date();  
        await updatedTest.save();

      
        return res.status(200).json({
            updatedTest,
            score,
            percentageScore
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while submitting the test' });
    }
});




// When user submits the test, all of the below should happen:

//testCompleted: true
//endTime: timestamp of when test was completed
//patch request with submitted answers - see above
//function which checks the submitted answers with the correct answers
// score ++ for every correct answer
//final score is tabulated and put/patched to the test object route
//resulting score is passed to the FE
//notification is sent to admin & updated on user profile
//if user fails, 90 days out date is set to retest
//this needs to be persisted somewhere in the db
//probably on the user object.  This will lock them out from retaking the test until that date has passed

// testRouter.patch('/:testId/submit-score', async (req, res) => {
////function which checks the submitted answers with the correct answers
// score ++ for every correct answer
//final score is tabulated and put/patched to the test object route
//testCompleted is also updated to true on this route
//and retakeTestDate is set (if they fail) for 90 days out
//}

// testRouter.patch('/:testId/submit-score', async (req, res) => {
// 1. Retrieve the test by `_id` and user data (via the testId in params).
// 2. Loop through the submitted answers and check them against the correct answers.
//    - Increment the score for each correct answer.
// 3. Update the following fields:
//    - `score`: Calculated based on the correct answers.
//    - `testCompleted`: Set to `true`.
//    - `endTime`: Set to the current timestamp when the test is completed.
//    - `retestDate`: If score < 70, set the `retestDate` to 90 days in the future.
// 4. Update the user document (for the test retake date) if needed.
// 5. Send notifications to the admin (if the score is below 70 or for any other condition as required).
// 6. Send the final score back to the frontend (either as part of the test result or user profile).

// The flow for this route ensures the test is finalized, the results are processed, and the user is notified.
//};

module.exports = {
    testRouter
};
