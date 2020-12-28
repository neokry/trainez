const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function Account(req, res) {
    const {
        query: { accountId },
    } = req;

    const account = await stripe.accounts.retrieve(accountId);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ account: account }));
}
