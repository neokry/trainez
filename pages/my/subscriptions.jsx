import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Modal from "../../components/modal";
import UserCard from "../../components/userCard";
import useMyStripe from "../../hooks/useMyStripe";
import { useStream } from "../../hooks/useStream";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import Loading from "../../components/loading";
import Skeleton from "../../components/skeleton";
import SubscriptionSkeleton from "../../components/subscriptionSkeleton";

export default function Subscribers() {
    const stream = useStream();
    const stripe = useMyStripe();
    const req = useRequireAuth();
    const [follows, setFollows] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [currentSub, setCurrentSub] = useState(false);

    useEffect(() => {
        if (!stream.currentUser) return;
        getFollowing();
    }, [stream]);

    const getFollowing = async () => {
        const res = await stream.getFollowing();
        if (res?.length > 0) setFollows(res);
        else setFollows(false);
        setCurrentSub(false);
    };

    const onCancel = async (e) => {
        e.preventDefault();
        if (currentSub.price > 0) {
            const creatorId = currentSub.id;
            const subscriberId = stream.currentUser.id;
            const res = await stripe.cancelSubscription(
                creatorId,
                subscriberId
            );
            if (res) {
                setShowConfirm(false);
                await getFollowing();
            }
        } else {
            stream.unfollowUser(currentSub.id);
            setShowConfirm(false);
            await getFollowing();
        }
    };

    const onModalDismiss = (e) => {
        e.preventDefault();
        setShowConfirm(false);
    };

    const onConfirm = (sub) => {
        setCurrentSub(sub);
        setShowConfirm(true);
    };

    if (!req) {
        return <Loading />;
    }

    if (follows === null) {
        return (
            <Layout>
                <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                    Following
                </h1>
                <SubscriptionSkeleton />
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                Following
            </h1>
            {showConfirm && (
                <Modal title="UNSUBSCRIBE">
                    <p className="text-gray-700">
                        Are you sure you want to cancel?
                    </p>
                    <div className="flex mt-5 justify-end">
                        <button
                            className="text-gray-500 mr-5"
                            onClick={onModalDismiss}
                        >
                            Cancel
                        </button>
                        <button className="text-red-500" onClick={onCancel}>
                            Yes
                        </button>
                    </div>
                </Modal>
            )}
            {follows ? (
                <div className="mt-5">
                    {follows?.map((user, idx) => {
                        return (
                            <div className="md:w-1/2 mt-2" key={idx}>
                                <UserCard user={user} onConfirm={onConfirm} />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="w-full flex justify-around text-gray-500 mt-5 text-xl font-semibold">
                    <p>Nothing was found</p>
                </div>
            )}
        </Layout>
    );
}
