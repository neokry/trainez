import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";
import Loading from "../../components/loading";
import { useAuth } from "../../hooks/useAuth";
import useMyStripe from "../../hooks/useMyStripe";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import stateList from "../../public/states";

const stripePromise = loadStripe(
    "pk_test_51HtG6uFc6WEwdah25wh7hk6TZxs1Cu0ZfpVDlyWYL8xLxzIBdLx30sHBPRjSI48q7hu6Ek1TAMvryN9Rmw32YU7E00v2Az97iP"
);

export default function Payments() {
    const req = useRequireAuth();
    const myStripe = useMyStripe();
    const auth = useAuth();
    const [methods, setMethods] = useState(null);

    const getPaymentMethods = async () => {
        console.log("Getting methods");
        const res = await myStripe.getPaymentMethods(auth.user.uid);
        if (res.data.length > 0) setMethods(res.data);
        else setMethods(false);
    };

    useEffect(() => {
        if (auth.user?.uid) getPaymentMethods();
    }, [auth.user]);

    return (
        <Layout>
            <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                Payments
            </h1>
            <div className="mt-2">
                <p className="text-gray-600">
                    We are fully compliant with Payment Card Industry Data
                    Security Standards.
                </p>
            </div>
            <div className="w-full">
                {(() => {
                    switch (methods) {
                        case null:
                            return null;
                        case false:
                            return (
                                <Elements stripe={stripePromise}>
                                    <AddCard />
                                </Elements>
                            );
                        default:
                            return <PaymentMethodList methods={methods} />;
                    }
                })()}
            </div>
        </Layout>
    );
}

function PaymentMethodList({ methods }) {
    return (
        <div className="mt-5 md:w-1/2 lg:w-1/3">
            {methods.map((method, i) => {
                return <PaymentMethod key={i} method={method} />;
            })}
        </div>
    );
}

function PaymentMethod({ method }) {
    console.log(method);
    return (
        <div className="border-gray-300 border-2 p-3 rounded-md">
            <div className="flex justify-between">
                <p className="font-bold">
                    {capitalizeFirstLetter(method.card.brand)}
                </p>
                <p>
                    ············{" "}
                    <span className="font-bold">{method.card.last4}</span>
                </p>
            </div>
            <div className="flex justify-between mt-5 border-t border-gray-300 pt-2">
                <button type="button" className="text-red-600">
                    Delete
                </button>
                <p className="text-gray-600">
                    Exp: {method.card.exp_month}/{method.card.exp_year}
                </p>
            </div>
        </div>
    );
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function AddCard() {
    const { register, handleSubmit, errors } = useForm();
    const stripe = useStripe();
    const auth = useAuth();
    const myStripe = useMyStripe();
    const elements = useElements();
    const states = stateList.states;

    const onSubmit = async (data) => {
        if (!stripe || !elements) return;
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
                address: {
                    city: data.city,
                    country: "US",
                    line1: data.street,
                    postal_code: data.zip,
                    state: data.state,
                },
                email: data.email,
                name: data.name,
            },
        });

        if (!error && auth.user?.uid && paymentMethod.id) {
            myStripe.addPaymentMethod(auth.user?.uid, paymentMethod.id);
        }
    };

    return (
        <form className="md:flex" onSubmit={handleSubmit(onSubmit)}>
            <div className="md:mr-5 md:w-1/2">
                <input
                    type="text"
                    ref={register}
                    name="street"
                    placeholder="Street"
                    className="border-gray-400 border-2 rounded-md w-full h-10 p-2 mt-5"
                />
                <input
                    type="text"
                    ref={register}
                    name="city"
                    placeholder="City"
                    className="border-gray-400 border-2 rounded-md w-full h-10 p-2 mt-5"
                />
                <select
                    ref={register}
                    name="state"
                    className="border-gray-400 border-2 rounded-md w-full h-10 p-2 mt-5"
                >
                    {states?.map((state, i) => (
                        <option key={i} value={state.abbreviation}>
                            {state.name}
                        </option>
                    ))}
                </select>
                <div className="border-gray-400 border-2 rounded-md w-full h-10 p-2 mt-5 text-gray-600">
                    <label>United States of America</label>
                </div>
            </div>
            <div className="md:mt-0 md:w-1/2">
                <input
                    type="zip"
                    ref={register}
                    name="zip"
                    placeholder="ZIP"
                    className="border-gray-400 border-2 rounded-md w-full h-10 p-2 mt-5"
                />
                <input
                    type="text"
                    ref={register}
                    name="email"
                    placeholder="E-mail"
                    className="border-gray-400 border-2 rounded-md w-full h-10 p-2 mt-8 md:mt-5"
                />
                <input
                    type="text"
                    ref={register}
                    name="name"
                    placeholder="Name on the card"
                    className="border-gray-400 border-2 rounded-md w-full h-10 p-2 mt-5"
                />
                <CardElement className="border-gray-400 border-2 rounded-md w-full h-10 p-2 mt-5" />
                <div className="md:flex md:justify-end md:mt-5">
                    <button
                        type="submit"
                        className="w-full p-2 bg-green-500 rounded-md text-white shadow-sm mt-4 md:w-40"
                    >
                        Save Card
                    </button>
                </div>
            </div>
        </form>
    );
}
