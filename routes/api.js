const ex = require('express');
const { fileRouter } = require('./file');
const { documentRouter } = require('./document');
const { userRouter } = require('./user');
const { checkoutRouter } = require('./checkout');
const signedUrlRouter = require('./signedUrl');
const { profileRouter } = require('./profile')
const { adminRouter } = require('./admin')
const { notifyRouter } = require('./notify')
const { assessmentRouter } = require('./assessment')
const { testRouter } = require('./test')
const { questionRouter } = require('./question')
const { notificationsRouter } = require('./notifications');
const { adminNotificationsRouter } = require('./adminNotifications')

const apiRouter = ex.Router();

apiRouter.use('/files', fileRouter);
apiRouter.use('/files/:user', fileRouter);
apiRouter.use('/images', documentRouter)
apiRouter.use('/user', userRouter)
apiRouter.use('/', checkoutRouter)
apiRouter.use('/signed', signedUrlRouter)
apiRouter.use('/profile', profileRouter)
apiRouter.use('/admin', adminRouter)
apiRouter.use('/notify', notifyRouter)
apiRouter.use('/notifications', notificationsRouter)
apiRouter.use('/admin-notifications', adminNotificationsRouter)
apiRouter.use('/assessment', assessmentRouter)
apiRouter.use('/test', testRouter)
apiRouter.use('/question', questionRouter)

module.exports = {
    apiRouter
}