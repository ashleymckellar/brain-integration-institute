const ex = require('express');
// const { processFile } = require('../middleware/cdn');
// const { getAllFilesByOwner, createFile } = require('../services/file');
// const File  = require('../models/file');
// const cloudinary = require('cloudinary').v2; 

const notifyRouter = ex.Router();

notifyRouter.get('/', async (req, res, next) => {
    try {
      
        console.log('test route')
        res.status(200).send({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500);
        next(err);
    }
 });
 



module.exports = {
    notifyRouter
};
