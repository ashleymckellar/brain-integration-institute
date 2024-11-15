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

server.get('/notify', (req, res) => {
    res.json({ message: 'route enabled!' });
});



server.use('/api', validateAuthToken, apiRouter)
server.use(ex.static(path.resolve(__dirname, 'client', 'dist')))
// server.get('*', staticSiteRouter)

server.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });

  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
  });


server.get('/api/files', (req, res) => {
    res.json({ message: 'CORS enabled!' });
});



server.post('/assessment', async (req, res) => {
    try {
        const { userId, status } = req.body;
        if (!userId || !status) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const notificationData = await createNotification({
        timestamp, isAshAwesome, testName
        });
        res.status(201).json({ success: true, notificationData });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



server.post('/webhook', (req, res) => {
    const payload = req.body; // Handle webhook payload
    console.log('Webhook received:', payload);
    res.status(200).send({ message: 'Webhook received successfully' });
});

// server.use(errorHandler);


module.exports = {
    server
}