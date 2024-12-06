const mg = require('mongoose');
const Schema = mg.Schema;

const AssessmentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: Number,
    dateTaken: { type: Date, default: Date.now },
    duration: Number, // Time taken to complete the test in minutes
    status: { type: String, enum: ['completed', 'incomplete', 'notStarted'], default: 'notStarted' },
    flaggedQuestions: [Number], 
});

const AssessmentModel = mg.model('Assessment', AssessmentSchema);

module.exports = {
    AssessmentModel
};

