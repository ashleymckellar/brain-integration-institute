const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    uploadDate: { type: Date, required: true },
    filename: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    user: { type: Schema.Types.String, ref: "User", required: true},
    sectionName: { type: String, required: true }
});

const File = mongoose.model('File', fileSchema);

module.exports =  File ;

// // filename,
// owner: req.auth.payload.sub,
// publicId,
// url,
// uploadDate,
// isApproved: false,
