// This is your test secret API key.
const stripe = require('stripe')('type de secret key of your stripe account');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(cors())
app.use(bodyParser.json());

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const items = req.body.items.map((item) =>{
    return {
      price_data: {
        currency: 'usd',
        product_data:{
          name: item.title,
          images: [item.image]
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty
    }
  });
  const session = await stripe.checkout.sessions.create({
    line_items: [...items],
    mode: 'payment',
    success_url: 'http://localhost:4242/success.html?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,

  })
  res.status(200).json(session);
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.listen(4242, () => console.log('Running on port 4242'));