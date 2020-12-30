const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function Cancel(req, res) {
    if (req.method === "POST") {
        if (!req.body) res.status(400).end("No data sent");
        else {
            const cancelReq = req.body;

            try {
                const subscriptions = await stripe.subscriptions.list({
                    customer: cancelReq.customerId,
                });

                const sub = subscriptions.data.find(
                    (x) => x.transfer_data.destination === cancelReq.accountId
                );

                const deleted = await stripe.subscriptions.del(sub.id);

                console.log("Sub canceled");

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(deleted));
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
