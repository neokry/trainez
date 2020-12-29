import axios from "axios";
import useMyStripeInfo from "./useMyStripeInfo";

export default function useMyStripe() {
    const stripeInfo = useMyStripeInfo();

    const setupStripe = async (userId, email) => {
        const connectAcount = { email: email, country: "US" };
        try {
            const response = await axios.post(
                "/api/stripe/create",
                connectAcount
            );
            const data = response.data;
            if (data) {
                const updateData = {
                    accountId: data.accId,
                    customerId: data.cusId,
                };
                await stripeInfo.updateStripeInfo(userId, updateData);
                return data;
            }
        } catch (err) {
            console.log("Error creating stripe account " + err);
        }
    };

    const linkAccount = async (userId) => {
        const url = window.location.href;
        const info = await stripeInfo.getStripeInfo(userId);
        if (!info.accountId) return false;

        const linkReq = {
            account: info.accountId,
            refresh_url: url,
            return_url: url,
        };

        try {
            const response = await axios.post(
                "/api/stripe/accounts/link",
                linkReq
            );
            return response.data?.url;
        } catch (err) {
            console.log("Error linking account " + err);
            return false;
        }
    };

    const getDashboardLink = async (userId) => {
        const info = await stripeInfo.getStripeInfo(userId);
        if (!info.accountId) return false;

        const res = await axios.get(
            `/api/stripe/accounts/${info.accountId}/dashboard`
        );
        return res.data.url;
    };

    const getAccount = async (userId) => {
        const info = await stripeInfo.getStripeInfo(userId);
        if (!info.accountId) return false;

        const res = await axios.get(`/api/stripe/accounts/${info.accountId}/`);
        return res.data.account;
    };

    const addPaymentMethod = async (userId, paymentMethodId) => {
        const info = await stripeInfo.getStripeInfo(userId);
        if (!info?.customerId) return false;

        const pyamentAttachment = {
            method: paymentMethodId,
            customer: info.customerId,
        };

        console.log("Adding payment method");

        const res = await axios.post(
            `/api/stripe/customers/payment`,
            pyamentAttachment
        );

        return res.data;
    };

    const getPaymentMethods = async (userId) => {
        const info = await stripeInfo.getStripeInfo(userId);
        if (!info?.customerId) return false;

        const res = await axios.get(
            `/api/stripe/customers/payment/${info.customerId}/`
        );
        return res.data;
    };

    const addSubscriptionPrice = async (userId, price) => {
        const info = await stripeInfo.getStripeInfo(userId);
        if (!info?.accountId) return false;

        console.log("Adding subscription price");

        const subscriptionPriceReq = {
            price: price,
            userId: userId,
            accountId: info.accountId,
            productId: info.productId ?? false,
        };

        const res = await axios.post(
            `/api/stripe/accounts/subscriptionPrice`,
            subscriptionPriceReq
        );

        if (res.data?.priceId)
            await stripeInfo.updateStripeInfo(userId, res.data);
        return true;
    };

    const detatchPaymentMethod = async (paymentId) => {
        const res = await axios.get(
            `/api/stripe/customers/payment/detatch/${paymentId}/`
        );
        return res.data;
    };

    const getSubscriptionPrice = async (userId) => {
        const info = await stripeInfo.getStripeInfo(userId);
        if (!info?.priceId) return false;

        const res = await axios.get(
            `/api/stripe/accounts/subscriptionPrice/${info.priceId}/`
        );
        return res.data;
    };

    const addSubscription = async (creatorId, subscriberId) => {
        const subscriberInfo = await stripeInfo.getStripeInfo(subscriberId);
        const creatorInfo = await stripeInfo.getStripeInfo(creatorId);

        const subscriptionReq = {
            priceId: creatorInfo.priceId,
            accountId: creatorInfo.accountId,
            customerId: subscriberInfo.customerId,
            creatorId: creatorId,
            subscriberId: subscriberId,
        };

        const res = await axios.post(
            `/api/stripe/subscriptions`,
            subscriptionReq
        );

        return await res.data;
    };

    const cancelSubscription = async (creatorId, subscriberId) => {
        const subscriberInfo = await stripeInfo.getStripeInfo(subscriberId);
        const creatorInfo = await stripeInfo.getStripeInfo(creatorId);

        const cancelReq = {
            accountId: creatorInfo.accountId,
            customerId: subscriberInfo.customerId,
        };

        const res = await axios.post(
            `/api/stripe/subscriptions/cancel`,
            cancelReq
        );

        return res.data;
    };

    return {
        setupStripe,
        linkAccount,
        getDashboardLink,
        getAccount,
        addPaymentMethod,
        getPaymentMethods,
        detatchPaymentMethod,
        addSubscriptionPrice,
        getSubscriptionPrice,
        addSubscription,
        cancelSubscription,
    };
}
