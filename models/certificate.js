const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    uploadDate: { type: Date, required: true },
    filename: { type: String, required: true },
  
});


const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports =  Certificate ;