import { connect } from "getstream";

const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function UserDetails(req, res) {
    if (req.method === "POST") {
        if (!req.body) res.status(400).end("No user sent");
        else {
            const usersReq = req.body;

            const client = connect(
                process.env.NEXT_PUBLIC_STREAM_KEY,
                process.env.STREAM_SECRET,
                process.env.NEXT_PUBLIC_STREAM_APP_ID
            );

            const userGroup = [];

            usersReq.userIds.map((userId) => {
                userGroup.push(client.user(userId).get());
            });

            let subs = false;
            if (usersReq.customerId) {
                subs = await stripe.subscriptions.list({
                    customer: usersReq.customerId,
                    status: "all",
                });
            }

            const results = await Promise.all(userGroup);

            let usersRes = false;

            if (!usersReq.customerId) {
                usersRes = results.map((result) => {
                    return {
                        ...result.data,
                        id: result.id,
                        price: null,
                        status: "active",
                    };
                });
            } else {
                usersRes = results.map((result) => {
                    const subInfo = subs.data.find((sub) => {
                        return result.id === sub.metadata["creatorId"];
                    });

                    if (subInfo) {
                        const price = subInfo.items.data[0].price?.unit_amount;
                        const amount = (price ?? 0) * 0.01;
                        return {
                            ...result.data,
                            id: result.id,
                            price: amount,
                            status: subInfo.status,
                        };
                    } else {
                        return {
                            ...result.data,
                            id: result.id,
                            price: null,
                            status: "active",
                        };
                    }
                });
            }

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(usersRes));
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
