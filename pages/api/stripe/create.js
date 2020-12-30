const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function Create(req, res) {
    if (req.method === "POST") {
        if (!req.body) res.status(400).end("No user sent");
        else {
            const createReq = req.body;
            const user = {
                email: createReq.email,
                country: createReq.country,
                type: "express",
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                },
            };

            const account = await stripe.accounts.create(user);
            const customer = await stripe.customers.create({
                email: createReq.email,
                description: createReq.name,
            });

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ accId: account.id, cusId: customer.id }));
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
