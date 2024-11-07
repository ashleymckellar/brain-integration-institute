// const multer = require('multer');
// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: Infinity }
// })

// /**
//  * Attaches req.file to express request based on FormData object sent by client
//  * @param {String} field 
//  * @returns {import('express').RequestHandler}
//  */
// const processFile = field => upload.single(field);

// module.exports = {
//     processFile
// }