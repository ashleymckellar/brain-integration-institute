const ex = require('express');
const axios = require('axios');
require('dotenv').config()
const { validateAuthToken } = require('../middleware/auth.js');

const adminRouter = ex.Router();

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_M2M_CLIENT_ID = process.env.AUTH0_M2M_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_MANAGEMENT_API_AUDIENCE = process.env.AUTH0_MANAGEMENT_API_AUDIENCE;
// const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

const getAuth0Token = async () => {
    const { data } = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
        client_id: AUTH0_M2M_CLIENT_ID,

        client_secret: AUTH0_CLIENT_SECRET,

        audience: AUTH0_MANAGEMENT_API_AUDIENCE,

        grant_type: 'client_credentials',
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


//no longer using below function, retaining for possible future use
// const getUserRoles = async (userId) => {
//     const token = await getAuth0Token();
//     const response = await axios.get(
//         `https://${AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         },
//     );
//     return response.data; // This will contain the roles of the user
// };

adminRouter.use((req, res, next) => {
    console.log('Admin router accessed');
    next();
});

adminRouter.get('/', async (req, res) => {
    console.log('get route');
});


//post request to obtain token for managment api
adminRouter.post('/get-management-token', async (req, res) => {
    try {
        const response = await axios.post(
            `https://${AUTH0_DOMAIN}/oauth/token`,
            {   
                grant_type: 'client_credentials', 
                client_id: AUTH0_M2M_CLIENT_ID,

                client_secret: AUTH0_CLIENT_SECRET,

                audience: AUTH0_MANAGEMENT_API_AUDIENCE,
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', 
                },
            }
        );

        const accessToken = response.data.access_token;
        res.json({ accessToken });
    } catch (error) {
        console.error('Error fetching Auth0 Management API token:', error);
        res.status(500).json({ message: 'Failed to get token' });
    }
});

//delete user with Auth0 admin api
//FE makes request to this endpoint, which in turn mains request to auth0 api
//cors proxy route
adminRouter.delete('/delete-user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { accessToken } = req.body;

        const response = await axios.delete(
            `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        res.json({ message: `User ${userId} deleted successfully` });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

adminRouter.post(
    '/assign-admin-role/:userId',
    validateAuthToken,
    checkAdminRole,
    async (req, res) => {
        console.log('admin post route hit');
        const { userId } = req.params;
        const token = await getAuth0Token();
        console.log('Token:', token);

        try {
            await axios.post(
                `https://${AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
                { roles: ['rol_lwu5eAZTdsyGTDTp'] },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
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
    },
);

module.exports = {
    adminRouter,
};
