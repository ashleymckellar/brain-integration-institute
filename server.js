const ex = require('express');
require('dotenv').config()
const path = require('path');
const { apiRouter } = require('./routes/api');
const { adminRouter } = require('./routes/admin')
const { notifyRouter } = require('./routes/notify')
const { enableCors, validateAuthToken } = require('./middleware/auth');
const { staticSiteRouter } = require('./routes/static');
// const { errorHandler, logger } = require('./middleware/log');


const server = ex();

server.use(enableCors)

server.use(ex.json());
server.use(ex.urlencoded({ extended: true }));


server.use('/api', validateAuthToken, apiRouter)
// server.use('/admin', adminRouter)
// server.use(ex.static(path.resolve(__dirname, 'client', 'dist')))
// server.get('*', staticSiteRouter)


server.get('/api/files', (req, res) => {
    res.json({ message: 'CORS enabled!' });
});



server.post('/webhook', (req, res) => {
    const payload = req.body; 
    console.log('Webhook received:', payload);
    res.status(200).send({ message: 'Webhook received successfully' });
});




module.exports = {
    server
}