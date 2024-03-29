import Stripe from "stripe";
import { buffer } from "micro";
import { connect } from "getstream";

const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2020-08-27",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stream = connect(
    process.env.NEXT_PUBLIC_STREAM_KEY,
    process.env.STREAM_SECRET,
    process.env.NEXT_PUBLIC_STREAM_APP_ID
);

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig = req.headers["stripe-signature"];

        console.log("Webhook called!");

        let event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case "customer.subscription.deleted":
                const sub = event.data.object;
                await handleSubscriptionDelete(sub);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};

const handleSubscriptionDelete = async (sub) => {
    console.log("Unfollowing with sub data", sub.metadata);

    const data = sub.metadata;
    const feed = stream.feed("timeline", data.subscriberId);
    await feed.unfollow("user", data.creatorId);

    console.log("Unfollowed successfully");
};

export default handler;
