const ex = require('express');
require('dotenv').config();
const { validateAuthToken } = require('../middleware/auth.js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const checkoutRouter = ex.Router();

//route to get stripe publishable key
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

// checkoutRouter.post('/webhook', express.json(), async (req, res) => {
//     const event = req.body;
//     if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;
//         const email = session.customer_email;

//         res.status(200).send('Webhook received!');
//     } else {
//         res.status(400).end();
//     }
// });

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
            'http://localhost:5173/success?assessmentUrl=https://docs.google.com/forms/d/e/1FAIpQLSfdUfQkg5ExRPk8vuhKHCZFQmyZw6WhN3JOVfjDJWROId_JaA/viewform?usp=sf_link',
        cancel_url: 'http://localhost:5173/profile',
    });
    res.json({ id: session.id });

    //
});

module.exports = { checkoutRouter };
