const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function SubscribePrice(req, res) {
    if (req.method === "POST") {
        if (!req.body) res.status(400).end("No body data");
        else {
            const priceReq = req.body;

            if (priceReq?.productId === null && priceReq?.accountId === null) {
                res.status(400).end("No product or account");
            }

            try {
                let productId = priceReq.productId;
                let subs = false;

                if (!productId) {
                    const account = await stripe.accounts.retrieve(
                        priceReq.accountId
                    );
                    const product = await stripe.products.create({
                        name:
                            (account.business_profile.name ??
                                account.settings?.statement_descriptor ??
                                "TrainEZ") + " Premium Subscription",
                    });
                    productId = product.id;
                } else {
                    subs = await stripe.subscriptions.list({
                        price: priceReq.priceId,
                    });
                }

                const price = await stripe.prices.create({
                    unit_amount: priceReq.price * 100,
                    currency: "usd",
                    recurring: { interval: "month" },
                    product: productId,
                });

                console.log("pricing created");

                if (subs) {
                    const batch = [];
                    subs.data.map((sub) => {
                        const subItem = sub.items.data[0];
                        const update = stripe.subscriptions.update(sub.id, {
                            items: [{ id: subItem.id, price: price.id }],
                        });
                        batch.push(update);
                    });
                    await Promise.all(batch);
                    console.log("Subscribtions updated");
                }

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(
                    JSON.stringify({ productId: productId, priceId: price.id })
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
