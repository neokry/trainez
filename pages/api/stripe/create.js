const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function Create(req, res) {
    if (req.method === "POST") {
        if (!req.body) res.status(400).end("No user sent");
        else {
            const user = req.body;
            user.type = "express";
            user.capabilities = {
                card_payments: { requested: true },
                transfers: { requested: true },
            };

            try {
                const account = await stripe.accounts.create(user);
                const customer = await stripe.customers.create();

                console.log("account response", JSON.stringify(account));

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(
                    JSON.stringify({ accId: account.id, cusId: customer.id })
                );
            } catch (err) {
                console.log("Error creating stripe account " + err);
                throw err;
            }
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
