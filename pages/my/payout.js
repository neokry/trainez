import Layout from "../../components/layout";
import useStripe from "../../hooks/useStripe";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/loading";
import { useEffect, useState } from "react";

export default function Payout() {
    const req = useRequireAuth();
    const auth = useAuth();
    const stripe = useStripe();
    const isLinked = useState(false);

    useEffect(() => {
        if (!auth.user?.uid) return;
        checkIsLinked(auth.user?.uid);
    }, stripe);

    const checkIsLinked = async (userId) => {
        const account = await stripe.getAccount(userId);
        isLinked(account.details_submitted);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (!auth.user?.uid) return;
        const url = await stripe.linkAccount(auth.user.uid);
        if (url) window.location.href = url;
    };

    if (!req) {
        return <Loading />;
    }

    return (
        <Layout>
            <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                Payout
            </h1>
            <div className="mt-5 px-3">
                <p className="text-gray-600 md:w-2/3">
                    Just like a real paycheck, your account balance is deposited
                    to your stripe account. Turn things on by connecting or
                    creating your stripe account below.
                </p>
            </div>
            <div className="flex p-5 py-10">
                <div className="mr-10">
                    <p className="text-gray-600">Stripe</p>
                </div>
                <div>
                    {isLinked ? (
                        <p>Linked!</p>
                    ) : (
                        <button type="button" onClick={handleClick}>
                            <img
                                alt="connect with stripe"
                                src="/stripeButton.png"
                                className="object-contain w-40"
                            />
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    );
}