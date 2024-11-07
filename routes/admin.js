const ex = require('express');
const axios = require('axios');
require('dotenv').config();
const { validateAuthToken } = require('../middleware/auth.js');
const { validateAuthTokenMiddleware } = require('../middleware/auth.js');

const adminRouter = ex.Router();

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_M2M_CLIENT_ID = process.env.AUTH0_M2M_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_MANAGEMENT_API_AUDIENCE = process.env.AUTH0_MANAGEMENT_API_AUDIENCE;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE

const getAuth0Token = async () => {
    const { data } = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
        client_id: AUTH0_M2M_CLIENT_ID,
        //t2E6pSuAhciCWH343iErq92hL7WXjmKm
        client_secret: AUTH0_CLIENT_SECRET,
        //EqwdWx_2unhkM9kvRNbcRLxeV8LGg4ySj9UWgFTAgWmobLBhfKxHjSC8Uz33CZN7
        audience: AUTH0_MANAGEMENT_API_AUDIENCE,

        //https://dev-ugmxdnpnwrk8mk5v.us.auth0.com/api/v2/
        grant_type: 'client_credentials'
        // scope: 'read:users update:users read:roles update:roles',
    });
    return data.access_token;
};

const checkAdminRole = (req, res, next) => {
    const roles = ['manage:users']; 
    if (roles && roles.includes('manage:users')) {
        return next();
    } else {
        return res.status(403).json({ message: 'Forbidden' });
    }
};

const getUserRoles = async (userId) => {
    const token = await getAuth0Token();
    const response = await axios.get(`https://${AUTH0_DOMAIN}/api/v2/users/${userId}/roles`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; // This will contain the roles of the user
};


adminRouter.use((req, res, next) => {
    console.log("Admin router accessed");
    next();
});
// api/admin/assign-admin-role/:userId

adminRouter.get('/', async (req, res) => {
    console.log('get route')
})

adminRouter.post('/assign-admin-role/:userId',  validateAuthToken, checkAdminRole, async (req, res) => {
    console.log('admin post route hit')
    const { userId } = req.params; 
    const token = await getAuth0Token();
    console.log("Token:", token);

    try {
        await axios.post(
            `https://${AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
            { roles: ['rol_lwu5eAZTdsyGTDTp'] }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'  
                },
            },
        );
        res.status(200).json({
            message: 'User promoted to admin successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to promote user to admin',
            error,
        });
    }
});

module.exports = {
    adminRouter,
};

