const stripe = require("stripe")(
    "sk_test_51HtG6uFc6WEwdah2bAN2a3POHM0XCOq3fQhC4D8Mm2MWPXM1c43QXv7niSkjkEaMGfISp5tNoP1mHWQ6QwZkBXBq008c71THGp"
);

export default async function Create(req, res) {
    if (req.method === "POST") {
        if (!req.body) res.status(400).end("No user sent");
        else {
            const user = req.body;
            user.type = "express";
            console.log(
                "creating stripe account with user: " + JSON.stringify(user)
            );

            try {
                const account = await stripe.accounts.create(user);

                console.log("stripe account created " + account.id);

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ id: account.id }));
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
