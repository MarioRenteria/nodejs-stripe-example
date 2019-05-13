const { Router } = require('express');
const router = Router();
const stripe = require('stripe')(process.env.SECRET_TOKEN_STRIPE);

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/checkout', async (req, res) => {
    // console.log(req.body);
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    const charge = await stripe.charges.create({
        amount: '3000',
        currency: 'usd',
        customer: customer.id,
        description: 'Vide Editing Software'
    });
    console.log(charge.id)
    // Final Show a success view
    res.render('download');
})

module.exports = router;
