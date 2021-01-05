import Stripe from "stripe";
import SubscriptionEntity from "./entities/SubscriptionEntity";

const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2020-08-27",
});

export default function StripeRepository() {
    const listUserSubscriptions = async (
        customerId: string
    ): Promise<SubscriptionEntity[]> => {
        const subs = await stripe.subscriptions.list({
            customer: customerId,
            status: "all",
        });

        return subs.data.map((sub) => {
            const item = sub.items.data[0];
            const details: SubscriptionEntity = {
                creatorId: sub.metadata["creatorId"],
                price: item.price.unit_amount,
                status: sub.status,
            };
            return details;
        });
    };

    return { listUserSubscriptions };
}
