const { auth } = require('express-oauth2-jwt-bearer');

const cors = require('cors');

/**
 * Authenticates incoming JWT token from client. Creates a `req.auth` object upon success.
 */
const validateAuthToken = auth({
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    audience: process.env.AUTH0_AUDIENCE,
    
    tokenSigningAlg: 'RS256',
});

const validateAuthTokenMiddleware = (req, res, next) => {
    console.log("Validating auth token...");
    validateAuthToken(req, res, next);
};

/**
 * Enforces the authenticated request that it contains the provided permissions.
 * These must first be defined on the Auth0 API app, added to a user role, and assigned to a specific user for it to authorize
 * @param {Array<String>} permissions 
 */
const allow = (permissions) => (req, res, next) => {
    if(!req.auth) {
        res.status(401);
        return next(Error('Unauthenticated user'))
    }
    if (permissions.every(permission => req.auth.payload.permissions.includes(permission)))
        return next();
    res.status(403);
    next(Error(`Access denied: ${permissions}. You don't have permission to access requested resource`))
}

const enableCors = cors({
    origin: [
        ...process.env.CORS_WHITELIST.split(','),
        process.env.AUTH0_ISSUER_BASE_URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
});


//app.use(cors({ origin: 'http://example.com', // Allow only requests from example.com methods: ['GET', 'POST'], // Allow only GET and POST requests allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers credentials: true // Allow cookies to be sent in CORS requests }));


module.exports = {
    validateAuthToken,
    allow,
    enableCors,
    validateAuthTokenMiddleware
}