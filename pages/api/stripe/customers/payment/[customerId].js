const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function Account(req, res) {
    const {
        query: { customerId },
    } = req;

    const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: "card",
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(paymentMethods));
}
