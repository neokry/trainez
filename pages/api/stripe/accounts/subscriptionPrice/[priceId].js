const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function Account(req, res) {
    const {
        query: { priceId },
    } = req;

    const price = await stripe.prices.retrieve(priceId);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(price));
}
