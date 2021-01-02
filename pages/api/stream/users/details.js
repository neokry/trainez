import { connect } from "getstream";
import { projectFirestore } from "../../../../configs/firebase";

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const client = connect(
    process.env.NEXT_PUBLIC_STREAM_KEY,
    process.env.STREAM_SECRET,
    process.env.NEXT_PUBLIC_STREAM_APP_ID
);

export default async function UserDetails(req, res) {
    if (req.method === "POST") {
        if (!req.body) res.status(400).end("No user sent");
        else {
            const usersReq = req.body;

            const userGroup = [];
            const dataGroup = [];

            usersReq.userIds.map((userId) => {
                userGroup.push(client.user(userId).get());
            });

            let subs = false;

            const lastOnlineQuery = projectFirestore
                .collection("lastOnline")
                .where("__name__", "in", usersReq.userIds)
                .get();

            dataGroup.push(lastOnlineQuery);

            if (usersReq.customerId) {
                subs = stripe.subscriptions.list({
                    customer: usersReq.customerId,
                    status: "all",
                });
                dataGroup.push(subs);
            }

            const dataResults = await Promise.all(dataGroup);
            const results = await Promise.all(userGroup);

            const lastOnlineSnap = dataResults[0];
            if (usersReq.customerId) subs = dataResults[1];

            let usersRes = false;

            usersRes = results.map((result) => {
                const lastOnline = GetLastOnline(lastOnlineSnap, result.id);

                const data = {
                    ...result.data,
                    id: result.id,
                    price: null,
                    status: "active",
                    lastOnline: lastOnline,
                };

                if (usersReq.customerId) {
                    const subInfo = subs.data.find((sub) => {
                        return result.id === sub.metadata["creatorId"];
                    });

                    if (subInfo) {
                        const price = subInfo.items.data[0].price?.unit_amount;
                        const amount = (price ?? 0) * 0.01;
                        data.price = amount;
                        data.status = subInfo.status;
                    }
                }

                return data;
            });

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(usersRes));
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}

function GetLastOnline(lastOnlineSnap, userId) {
    if (lastOnlineSnap.docs.length > 0) {
        const lastOnlineDoc = lastOnlineSnap.docs.find(
            (doc) => doc.id === userId
        );

        return lastOnlineDoc.data().lastOnline.toDate();
    } else {
        return null;
    }
}
