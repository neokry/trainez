const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function Dashboard(req, res) {
    const {
        query: { accountId },
    } = req;

    const link = await stripe.accounts.createLoginLink(accountId);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(link));
}
