
const ex = require('express');
require('dotenv').config();
const { validateAuthToken } = require('../middleware/auth.js')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const assessmentRouter = ex.Router();