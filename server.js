const ex = require('express');
const path = require('path');
const { apiRouter } = require('./routes/api');
const { enableCors, validateAuthToken } = require('./middleware/auth');
const { staticSiteRouter } = require('./routes/static');
// const { errorHandler, logger } = require('./middleware/log');


const server = ex();

// server.use(logger)
server.use(enableCors)

server.use(ex.json());
server.use(ex.urlencoded({ extended: true }));


server.use('/api', validateAuthToken, apiRouter)
// server.use(ex.static(path.resolve(__dirname, 'client', 'dist')))
// server.get('*', staticSiteRouter)


server.get('/api/files', (req, res) => {
    res.json({ message: 'CORS enabled!' });
});

// server.use(errorHandler);


module.exports = {
    server
}