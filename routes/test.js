const { QuestionModel } = require('../models/question.js');
const { QuestionSetModel } = require('../models/questionSet.js');
const { TestModel } = require('../models/test.js');
const ex = require('express');

const testRouter = ex.Router();



testRouter.post("/upload-questions", async (req, res) => {
    try {
        const rawQuestions = req.body; // Assuming raw data is sent in the request body

        // Map raw data to Mongoose schema structure
        const formattedQuestions = rawQuestions.map((item) => {
            // Use conditional checks to handle undefined or null properties
            const setName = item["Section"] ? item["Section"].toLowerCase() : "";
            let type = item["Question Type"] ? item["Question Type"].trim().toLowerCase() : "";

            // If the type is not valid, set it to a default (e.g., 'Multiple Choice')
            if (type === "multiple choice") {
                type = "Multiple Choice";
            } else if (type === "true/false" || type === "true false") {
                type = "True/False";
            } else {
                type = "Multiple Choice"; // Default to 'Multiple Choice' if not valid
            }
            const optionA = item["Option A"] || "";
            const optionB = item["Option B"] || "";
            const optionC = item["Option C"] || "";
            const optionD = item["Option D"] || "";
            const questionText = item["Question Text"] || "";
            const correctAnswer = item["Correct Answer"] || "";
            const explanation = item["Explanation/Feedback"] || "";

            return {
                setName,
                type,
                optionA,
                optionB,
                optionC,
                optionD,
                questionText,
                correctAnswer,
                explanation,
            };
        });

     
        const insertedQuestions = await QuestionModel.insertMany(formattedQuestions);

        res.status(201).json({
            message: "Questions successfully added!",
            data: insertedQuestions,
        });
    } catch (error) {
        console.error("Error inserting questions:", error);
        res.status(500).json({ message: "Server error while inserting questions." });
    }
});





module.exports = {
    testRouter,
};
