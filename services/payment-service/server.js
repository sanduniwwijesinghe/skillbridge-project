const express = require('express');
const cors = require('cors');
// The Stripe secret key is loaded from the environment variable set by Kubernetes
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

/**
 * Creates a Stripe Payment Intent.
 * The frontend will call this to get a client secret before confirming the payment.
 */
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body; // Amount should be in the smallest currency unit (e.g., cents)

    if (!amount || amount <= 0) {
        return res.status(400).send({ error: 'Invalid amount provided.' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd', // You can make this configurable
            automatic_payment_methods: {
                enabled: true,
            },
        });

        console.log(`Created Stripe Payment Intent with ID: ${paymentIntent.id}`);

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating Stripe Payment Intent:", error);
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Payment Service listening at http://localhost:${port}`);
});

