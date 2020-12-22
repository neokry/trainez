import { projectFirestore } from "../configs/firebase";

export default function useMyStripe() {
    const setupStripe = async (userId, email) => {
        const connectAcount = { email: email, country: "US" };
        try {
            const response = await fetch("/api/stripe/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(connectAcount),
            });
            const json = await response.json();
            if (json) {
                const updateData = {
                    accountId: json.accId,
                    customerId: json.cusId,
                };
                updateStripeInfo(userId, updateData);
            }
        } catch (err) {
            console.log("Error creating stripe account " + err);
        }
    };

    const updateStripeInfo = async (userId, data) => {
        try {
            await projectFirestore
                .collection("stripeInfo")
                .doc(userId)
                .set(data, { merge: true });
        } catch (err) {
            console.log("Error updating stripe id ", err);
        }
    };

    const getStripeInfo = async (userId) => {
        try {
            const doc = await projectFirestore
                .collection("stripeInfo")
                .doc(userId)
                .get();
            return doc.data();
        } catch (err) {
            console.log("Error getting stripe id " + err);
        }
    };

    const linkAccount = async (userId) => {
        const url = window.location.href;
        const info = await getStripeInfo(userId);
        if (!info.accountId) return false;

        const linkReq = {
            account: info.accountId,
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
        const info = await getStripeInfo(userId);
        if (!info.accountId) return false;

        const res = await fetch(`/api/stripe/accounts/${info.accountId}/`);
        const json = await res.json();
        return json.account;
    };

    const addPaymentMethod = async (userId, paymentMethodId) => {
        const info = await getStripeInfo(userId);
        if (!info?.customerId) return false;

        const pyamentAttachment = {
            method: paymentMethodId,
            customer: info.customerId,
        };

        console.log("Adding payment method");

        const res = await fetch(`/api/stripe/customers/payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pyamentAttachment),
        });

        return res;
    };

    const getPaymentMethods = async (userId) => {
        const info = await getStripeInfo(userId);
        if (!info?.customerId) return false;

        const res = await fetch(
            `/api/stripe/customers/payment/${info.customerId}/`
        );
        return await res.json();
    };

    const addSubscriptionPrice = async (userId, price) => {
        const info = await getStripeInfo(userId);
        if (!info?.accountId) return false;

        console.log("Adding subscription price");

        const subscriptionPriceReq = {
            price: price,
            accountId: info.accountId,
            productId: info.productId ?? false,
        };

        const res = await fetch(`/api/stripe/accounts/subscriptionPrice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subscriptionPriceReq),
        });

        const json = await res.json();
        if (json?.priceId) updateStripeInfo(userId, json);
    };

    const getSubscriptionPrice = async (userId) => {
        const info = await getStripeInfo(userId);
        if (!info?.priceId) return false;

        const res = await fetch(
            `/api/stripe/accounts/subscriptionPrice/${info.priceId}/`
        );
        return await res.json();
    };

    return {
        setupStripe,
        linkAccount,
        getAccount,
        addPaymentMethod,
        getPaymentMethods,
        addSubscriptionPrice,
        getSubscriptionPrice,
    };
}
