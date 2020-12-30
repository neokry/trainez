const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function Subscriptions(req, res) {
    const {
        query: { customerId },
    } = req;

    const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(subscriptions));
}
