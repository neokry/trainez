import Layout from "../../components/layout";
import useMyStripe from "../../hooks/useMyStripe";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/loading";
import { useEffect, useState } from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "../../components/skeleton";

export default function Payout() {
    const req = useRequireAuth();
    const auth = useAuth();
    const stripe = useMyStripe();
    const [isLinked, setIsLinked] = useState(null);
    const [canPayout, setCanPayout] = useState(null);

    useEffect(() => {
        if (!auth.user?.uid) return;
        checkIsLinked(auth.user?.uid);
    }, [auth.user]);

    const checkIsLinked = async (userId) => {
        const account = await stripe.getAccount(userId);
        setIsLinked(account.details_submitted ?? false);
        setCanPayout(account.payouts_enabled ?? false);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (!auth.user?.uid) return;
        const url = await stripe.linkAccount(auth.user.uid);
        if (url) window.location.href = url;
    };

    const handleDashboard = async (e) => {
        e.preventDefault();
        if (!auth.user?.uid) return;
        const url = await stripe.getDashboardLink(auth.user.uid);
        if (url) window.open(url, "_blank");
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
                {canPayout === null ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : (
                    <p className="text-gray-600 md:w-2/3">
                        Just like a real paycheck, your account balance is
                        deposited to your stripe account. Turn things on by
                        connecting or creating your stripe account below.{" "}
                        {canPayout ? (
                            <span className="text-green-500">
                                You're ready to recieve payouts!
                            </span>
                        ) : (
                            <>
                                {isLinked && (
                                    <span className="text-red-500">
                                        Your account it still missing some
                                        information check the dashboard for more
                                        details.
                                    </span>
                                )}
                            </>
                        )}
                    </p>
                )}
            </div>
            <div className="flex items-center p-5 py-10">
                <div className="mr-10">
                    <p className="text-gray-600">Stripe</p>
                </div>
                <div>
                    <StripeButton
                        isLinked={isLinked}
                        handleClick={handleClick}
                        handleDashboard={handleDashboard}
                    />
                </div>
            </div>
        </Layout>
    );
}

function StripeButton({ isLinked, handleClick, handleDashboard }) {
    if (isLinked === null) {
        return (
            <div className="w-40">
                <Skeleton />
            </div>
        );
    } else if (isLinked === true) {
        return (
            <button
                className="border text-sm text-green-500 border-green-500 rounded-md p-2 outline-none focus:outline-none"
                type="button"
                onClick={handleDashboard}
            >
                View My Dashboard
            </button>
        );
    } else {
        return (
            <button type="button" onClick={handleClick}>
                <img
                    alt="connect with stripe"
                    src="/stripeButton.png"
                    className="object-contain w-40 outline-none focus:outline-none"
                />
            </button>
        );
    }
}
