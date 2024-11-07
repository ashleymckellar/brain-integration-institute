/**
 * Log basic info about the request to stdout
 */
// const logger = (req, res, next) => {
//     console.log(req.method, req.originalUrl, req.headers.referer)
//     next();
// }

// /**
//  * Handle all errors thrown by express routes
//  */
// const errorHandler = (err, req, res, next) => {
//     res.send({ success: false, error: err.message });
// }

// module.exports = {
//     logger,
//     errorHandler
// }