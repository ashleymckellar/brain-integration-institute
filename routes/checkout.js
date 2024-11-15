const ex = require('express');
require('dotenv').config();
const { validateAuthToken } = require('../middleware/auth.js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const baseUrl = process.env.VITE_API_BASE_URL;
const frontendUrl = process.env.VITE_FRONTEND_URL;
const successUrl = `${process.env.VITE_FRONTEND_URL}/success?assessmentUrl=https://docs.google.com/forms/d/e/1FAIpQLSfdUfQkg5ExRPk8vuhKHCZFQmyZw6WhN3JOVfjDJWROId_JaA/viewform?usp=sf_link`;
const cancelUrl = `${process.VITE_FRONTEND_URL}/profile`;

const checkoutRouter = ex.Router();

checkoutRouter.get('/publishable-key', (req, res) => {
    try {
        res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
    } catch (error) {
        console.error('Error fetching publishable key:', error);
        res.status(500).send('Server error');
    }
});

checkoutRouter.post('/secret', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 6500,
        currency: 'usd',
        payment_method_types: ['card'],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
});

//study guide checkout
checkoutRouter.post('/create-payment-intent', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'usd',

            amount: 6500,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});

//assessment checkout
checkoutRouter.post('/create-assessment-payment-intent', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'usd',

            amount: 25000,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});


checkoutRouter.post('/create-assessment-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Brain Integration Exam',
                    },
                    unit_amount: 25000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url:
            successUrl,
        cancel_url: cancelUrl,
    });
    res.json({ id: session.id });

    //
});

module.exports = { checkoutRouter };
