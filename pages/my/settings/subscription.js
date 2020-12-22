import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../../components/layout";
import Loading from "../../../components/loading";
import { useAuth } from "../../../hooks/useAuth";
import useMyStripe from "../../../hooks/useMyStripe";
import { useRequireAuth } from "../../../hooks/useRequireAuth";

export default function Subscription() {
    const { register, handleSubmit, setValue } = useForm();
    const stripe = useMyStripe();
    const req = useRequireAuth();
    const auth = useAuth();

    useEffect(() => {
        if (auth.user?.uid) getPrice();
    }, [auth.user]);

    const getPrice = async () => {
        const price = await stripe.getSubscriptionPrice(auth.user.uid);
        if (price.unit_amount) setValue("price", price.unit_amount * 0.01);
    };

    const onSubmit = async (data) => {
        console.log("Submitting price");
        await stripe.addSubscriptionPrice(auth.user.uid, data.price);
    };

    if (!req) {
        return <Loading />;
    }

    return (
        <Layout>
            <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                Subscription
            </h1>
            <div className="mt-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-gray-600">Price per month</p>
                    <div className="border-gray-400 border-2 rounded-md w-full h-10 p-2 flex items-center">
                        <p className="mr-2 text-gray-500">$</p>
                        <input
                            className="outline-none focus:outline-none"
                            type="number"
                            ref={register}
                            placeholder="Free"
                            name="price"
                        />
                    </div>
                    <div className="border-t-2 mt-5 flex justify-end w-full">
                        <div>
                            <button
                                type="button"
                                className="w-20 p-2 mt-5 text-sm mr-2 border-gray-700 border rounded-full text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-20 p-2 mt-5 text-sm bg-green-500 rounded-full text-white"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
