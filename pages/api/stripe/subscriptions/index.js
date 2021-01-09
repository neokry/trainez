const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function Create(req, res) {
    if (req.method === "POST") {
        if (!req.body) res.status(400).end("No data sent");
        else {
            const subscriptionReq = req.body;
            console.log("Creating sub " + JSON.stringify(subscriptionReq));

            try {
                const subscription = await stripe.subscriptions.create({
                    customer: subscriptionReq.customerId,
                    items: [
                        {
                            price: subscriptionReq.priceId,
                        },
                    ],
                    expand: ["latest_invoice.payment_intent"],
                    transfer_data: {
                        destination: subscriptionReq.accountId,
                    },
                    application_fee_percent: subscriptionReq.applicationFee,
                    metadata: {
                        creatorId: subscriptionReq.creatorId,
                        subscriberId: subscriptionReq.subscriberId,
                    },
                });

                console.log("Sub created");

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(subscription));
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
