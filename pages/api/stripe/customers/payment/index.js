const stripe = require("stripe")(
    "sk_test_51HtG6uFc6WEwdah2bAN2a3POHM0XCOq3fQhC4D8Mm2MWPXM1c43QXv7niSkjkEaMGfISp5tNoP1mHWQ6QwZkBXBq008c71THGp"
);

export default async function Create(req, res) {
    if (req.method === "POST") {
        if (!req.body) res.status(400).end("No data sent");
        else {
            const paymentAttachment = req.body;
            console.log(
                "creating a new payment attachemnt: " +
                    JSON.stringify(paymentAttachment)
            );

            try {
                await stripe.paymentMethods.attach(paymentAttachment.method, {
                    customer: paymentAttachment.customer,
                });

                await stripe.customers.update(paymentAttachment.customer, {
                    invoice_settings: {
                        default_payment_method: paymentAttachment.method,
                    },
                });

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end();
            } catch (err) {
                console.log("Error creating stripe account " + err);
                throw err;
            }
        }
    } else {
        res.status(405).end("Method Not Allowed");
    }
}
