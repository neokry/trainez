import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(
    "sk_test_51HtG6uFc6WEwdah2bAN2a3POHM0XCOq3fQhC4D8Mm2MWPXM1c43QXv7niSkjkEaMGfISp5tNoP1mHWQ6QwZkBXBq008c71THGp",
    {
        apiVersion: "2020-08-27",
    }
);
const webhookSecret = "whsec_SnqnZnrWagP5h5Yu6EIU2OnymfggPO9W";

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig = req.headers["stripe-signature"];

        let event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object;
                console.log("PaymentIntent was successful!");
                break;
            case "payment_method.attached":
                const paymentMethod = event.data.object;
                console.log("PaymentMethod was attached to a Customer!");
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};

const handleSubscribe = async (data) => {};

export default handler;
