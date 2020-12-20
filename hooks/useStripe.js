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
            if (json.id) updateAccountId(userId, json.id);
        } catch (err) {
            console.log("Error creating stripe account " + err);
        }
    };

    const updateAccountId = async (userId, stripeId) => {
        try {
            await projectFirestore
                .collection("stripeInfo")
                .doc(userId)
                .set({ accountId: stripeId });
        } catch (err) {
            console.log("Error updating stripe id ", err);
        }
    };

    const getAccountId = async (userId) => {
        try {
            const doc = await projectFirestore
                .collection("stripeInfo")
                .doc(userId)
                .get();
            return doc.data()?.accountId;
        } catch (err) {
            console.log("Error getting stripe id " + err);
        }
    };

    const linkAccount = async (userId) => {
        const url = window.location.href;
        const stripeId = await getAccountId(userId);
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
        const accountId = await getAccountId(userId);
        if (!accountId) return false;

        const res = await fetch(`/api/stripe/accounts/${accountId}/`);
        const json = await res.json();
        return json.account;
    };

    return { createAccount, linkAccount, getAccount };
}
