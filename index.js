const { init } = require('./services/cdn');
const { server } = require('./server');
const morgan = require('morgan');
const mg = require('mongoose');
require('dotenv').config();

mg.connect(process.env.MONGODB_URI).then((config) => {
    console.log('connected to DB:', config.connection.db.databaseName);
    server.listen(process.env.PORT, () => {
        const cdnConfig = init();
        console.log('initialized CDN:', cdnConfig.cloud_name);
        console.log('server listening on port ' + process.env.PORT);
    });
});
