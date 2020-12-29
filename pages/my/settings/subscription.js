import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../../components/layout";
import Loading from "../../../components/loading";
import Skeleton from "../../../components/skeleton";
import { useAuth } from "../../../hooks/useAuth";
import useMyStripe from "../../../hooks/useMyStripe";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import { useStream } from "../../../hooks/useStream";

export default function Subscription() {
    const stripe = useMyStripe();
    const req = useRequireAuth();
    const auth = useAuth();
    const [isLinked, setIsLinked] = useState(null);

    useEffect(() => {
        if (auth.user?.uid) {
            checkIsLinked();
        }
    }, [auth.user]);

    const checkIsLinked = async () => {
        console.log("check is linked");
        const account = await stripe.getAccount(auth.user.uid);
        if (account?.details_submitted !== null)
            setIsLinked(account?.details_submitted);
        else setIsLinked(false);
    };

    if (!req) {
        return <Loading />;
    }

    return (
        <Layout>
            <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                Subscription
            </h1>
            {(() => {
                switch (isLinked) {
                    case null:
                    case true:
                        return <SubscriptionForm />;
                    case false:
                        return <UnlinkedForm />;
                }
            })()}
        </Layout>
    );
}

function UnlinkedForm() {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push("/my/payout");
    };

    return (
        <div className="mt-5 md:w-1/2">
            <p className="text-gray-600">Price per month</p>
            <div className="border-gray-400 border-2 rounded-md w-full h-10 p-2 flex items-center text-gray-500">
                <p className="mr-2">$</p>
                <label>Free</label>
            </div>
            <div>
                <p className="text-gray-500 text-xs">
                    You must{" "}
                    <button
                        type="button"
                        className="text-blue-400"
                        onClick={handleClick}
                    >
                        Link a Stripe Account
                    </button>{" "}
                    before you can set your price or accept tips. Minimum $4.99
                    USD or free
                </p>
            </div>
            <div className="border-t-2 mt-5 flex justify-end w-full">
                <div className="mt-5">
                    <label className="w-20 p-2 text-sm mr-2 border-gray-400 border rounded-full text-gray-400">
                        Cancel
                    </label>
                    <label className="w-20 px-5 p-2 mt-5 text-sm bg-gray-400 rounded-full text-white">
                        Save
                    </label>
                </div>
            </div>
        </div>
    );
}

function SubscriptionForm() {
    const { register, handleSubmit, setValue } = useForm();
    const stripe = useMyStripe();
    const auth = useAuth();
    const [isSaved, setIsSaved] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (auth.user?.uid) {
            getPrice();
        }
    }, [auth.user]);

    const getPrice = async () => {
        const price = await stripe.getSubscriptionPrice(auth.user.uid);
        setIsLoaded(true);
        if (price.unit_amount) setValue("price", price.unit_amount * 0.01);
    };

    const onSubmit = async (data) => {
        console.log("Submitting price");
        const res = await stripe.addSubscriptionPrice(
            auth.user.uid,
            data.price
        );
        if (res) setIsSaved(true);
    };

    return (
        <div className="mt-5 md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-gray-600">Price per month</p>
                {isLoaded ? (
                    <div className="border-gray-400 border-2 rounded-md w-full h-10 p-2 flex items-center">
                        <p className="mr-2 text-gray-500">$</p>
                        <input
                            className="outline-none focus:outline-none"
                            type="text"
                            ref={register}
                            placeholder="Free"
                            name="price"
                        />
                    </div>
                ) : (
                    <Skeleton />
                )}
                <div className="border-t-2 mt-5 flex justify-end w-full">
                    {isLoaded ? (
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
                    ) : (
                        <>
                            <div className="w-20 mt-5 mr-2">
                                <Skeleton />
                            </div>
                            <div className="w-20 mt-5">
                                <Skeleton />
                            </div>
                        </>
                    )}
                </div>
                {isSaved && (
                    <div className="mt-2 flex justify-end w-full">
                        <p className="text-green-600">Price saved!</p>
                    </div>
                )}
            </form>
        </div>
    );
}
