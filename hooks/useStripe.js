import { projectFirestore } from "../configs/firebase";

export default function useStripe() {
    const createAccount = async (userId, email) => {
        const connectAcount = { email: email, country: "US" };
        try {
            const response = await fetch("/api/stripe/accounts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(connectAcount),
            });
            const json = await response.json();
            if (json.id) updateStripeId(userId, json.id);
        } catch (err) {
            console.log("Error creating stripe account " + err);
        }
    };

    const updateStripeId = async (userId, stripeId) => {
        try {
            await projectFirestore
                .collection("stripeIds")
                .doc(userId)
                .set({ stripeId: stripeId });
        } catch (err) {
            console.log("Error updating stripe id ", err);
        }
    };

    const getStripeId = async (userId) => {
        try {
            const doc = await projectFirestore
                .collection("stripeIds")
                .doc(userId)
                .get();
            return doc.data()?.stripeId;
        } catch (err) {
            console.log("Error getting stripe id " + err);
        }
    };

    const linkAccount = async (userId) => {
        const url = window.location.href;
        const stripeId = await getStripeId(userId);
        if (!stripeId) return false;

        const linkReq = {
            account: stripeId,
            refresh_url: url,
            return_url: url,
        };

        try {
            const response = await fetch("/api/stripe/accounts/link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(linkReq),
            });
            const json = await response.json();
            return json.url;
        } catch (err) {
            console.log("Error linking account " + err);
            return false;
        }
    };

    const getAccount = async (userId) => {
        const stripeId = await getStripeId(userId);
        if (!stripeId) return false;

        const res = await fetch(`/api/stream/${stripeId}/token`);
        const json = await res.json();
        return json.account;
    };

    return { createAccount, linkAccount, getAccount };
}
