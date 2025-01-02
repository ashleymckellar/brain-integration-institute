const { TestModel } = require('../models/test.js');
const { UserModel } = require('../models/User');

const tabulateScore = async (testId) => {
    try {
        // Find the test by ID
        const test = await TestModel.findOne({ _id: testId });

        if (!test) {
            return { error: 'Test not found or access denied', status: 404 };
        }

        let score = 0;
        const totalQuestions = test.questions.length;

        // Loop through the test questions to calculate the score
        test.questions.forEach((question) => {
            // Get the submitted answer for this question
            const submittedAnswer = question.submittedAnswer;

            if (submittedAnswer) {
                // Normalize both the correct and submitted answers to lowercase for comparison
                const correctAnswerNormalized = question.correctAnswer.trim().toLowerCase();
                const submittedAnswerNormalized = submittedAnswer.trim().toLowerCase();

                // Check if the answer is correct
                if (correctAnswerNormalized === submittedAnswerNormalized) {
                    score++; // Increase score if answer matches
                }
            }
        });

        // Calculate percentage score
        const percentageScore = (score / totalQuestions) * 100;

        // Return the calculated score and percentage
        return { score, percentageScore };
    } catch (error) {
        console.error(error);
        return { error: 'An error occurred while tabulating the score', status: 500 };
    }
};


const updateSubmittedAnswers = async (testId, submittedAnswers) => {
  
    try {
        // Find the test by its ID
        const test = await TestModel.findOne({ _id: testId });

        if (!test) {
            return { error: 'Test not found or access denied', status: 404 };
        }

        // Iterate through the submittedAnswers and update the corresponding questions
        test.questions.forEach((question, index) => {
            // Find the corresponding submitted answer for the question
            const submittedAnswer = submittedAnswers.find(ans => ans.questionId.toString() === question._id.toString());

        
            console.log(submittedAnswer, 'submitted answer');  // Check if this logs correctly
        
            if (submittedAnswer) {
                // Update the submittedAnswer field in the question
                question.submittedAnswer = submittedAnswer.submittedAnswer;
                question.isFlagged = submittedAnswer.isFlagged !== undefined ? submittedAnswer.isFlagged : question.isFlagged;
            }
        });

        // Save the updated test with the submitted answers
        const updatedTest = await test.save();

        // Return the updated test
        return { updatedTest };
    } catch (error) {
        console.error(error);
        return { error: 'An error occurred while submitting the answers', status: 500 };
    }
};


    //step one - find test using test model
    //check each question's submittedAnswer against correctAnswer
    //using for loop or other iterative function
    //++ for each that is ===
    //no action if !=
    //return score
    //update score on the user specfic test route (patch or put)
    //if score is >= 70, user has passed and a not is made to admin
    //also the score is passed to the FE on the user's profile
    //if score is < 70, user has failed
    //retakeTestDate is updated to 90 days out
    //score is still passed to FE
    //update testCompleted to true


module.exports = {
    tabulateScore,
    updateSubmittedAnswers
};
