const stripe = require("stripe")(
    "sk_test_51HtG6uFc6WEwdah2bAN2a3POHM0XCOq3fQhC4D8Mm2MWPXM1c43QXv7niSkjkEaMGfISp5tNoP1mHWQ6QwZkBXBq008c71THGp"
);

export default async function Account(req, res) {
    const {
        query: { customerId },
    } = req;

    const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: "card",
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(paymentMethods));
}
