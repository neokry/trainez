const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function Create(req, res) {
    if (req.method === "POST") {
        if (!req.body) res.status(400).end("No user sent");
        else {
            const link = req.body;
            link.type = "account_onboarding";

            try {
                const accountLinks = await stripe.accountLinks.create(link);
                console.log("stripe account link created for " + link.account);

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ url: accountLinks.url }));
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
