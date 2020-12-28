const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function Detatch(req, res) {
    const {
        query: { paymentId },
    } = req;

    const paymentMethod = await stripe.paymentMethods.detach(paymentId);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(paymentMethod));
}
