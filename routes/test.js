const { QuestionModel } = require('../models/question.js');
const { QuestionSetModel } = require('../models/questionSet.js');
const { TestModel } = require('../models/test.js');
const ex = require('express');

const testRouter = ex.Router();

//api/test is the endpoint


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
