const mg = require('mongoose');
const Schema = mg.Schema;

//this is for the unique test that is created for each user
//it will also be used on the route that handles patch request with submitted answers
// I need a place to list the questions, the correct answers, and the answers submitted by the user


const TestSchema = new mg.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    questions: [
        {
            questionId: { type: Schema.Types.ObjectId, ref: 'Question'},
            questionNumber: { type: Number},
            questionText: { type: String, required: true }, 
            optionA: { type: String, required: true },
            optionB: { type: String, required: true },
            optionC: { type: String },
            optionD: { type: String },
            correctAnswer: { type: String, required: true },
            submittedAnswer: { type: String, default: null }, 
            setName:{ type: String },
            questionType: { type: String },
            isFlagged: { type: Boolean, default: false}
    
        },
    ],
    startTime: { type: Date },
    endTime: { type: Date },
    score: { type: Number, default: 0 },
    testCompleted: { type: Boolean, default: false },
    retestDate: { type: Date }
});

const TestModel = mg.model('Test', TestSchema);

module.exports = {
    TestModel
};



