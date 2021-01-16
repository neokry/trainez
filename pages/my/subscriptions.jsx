import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Modal from "../../components/modal";
import UserCard from "../../components/userCard";
import useMyStripe from "../../hooks/useMyStripe";
import { useStream } from "../../hooks/useStream";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import Loading from "../../components/loading";
import SubscriptionSkeleton from "../../components/subscriptionSkeleton";
import useStreamUserDetails from "../../hooks/useStreamUserDetails";
import useSWR from "swr";
import { useAuth } from "../../hooks/useAuth";

export default function Subscriptions() {
    const req = useRequireAuth();
    const [hasMore, setHasMore] = useState(false);
    const auth = useAuth();
    const pageLimit = 9;
    const { data: followStats } = useSWR(
        auth.user?.uid ? `/api/stream/${auth.user.uid}/followStats` : null,
        {
            refreshInterval: 0,
        }
    );

    const [pageCount, setPageCount] = useState(0);
    const pages = [];
    for (let i = 0; i <= pageCount; i++) {
        pages.push(<Page index={i} key={i} />);
    }

    useEffect(() => {
        const maxLoaded = (pageCount + 1) * pageLimit;
        const following = followStats?.following ?? 0;
        const diff = following - maxLoaded;
        setHasMore(diff > 0);
    }, [pageCount, followStats]);

    if (!req) {
        return <Loading />;
    }

    return (
        <Layout>
            <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                Following
            </h1>
            {pages}
            {hasMore && (
                <div className="w-1/2 flex justify-around mt-5">
                    <button
                        className="w-full border border-green-500 text-green-500 rounded-md px-5 py-2"
                        onClick={(e) => {
                            e.preventDefault();
                            setPageCount(pageCount + 1);
                        }}
                    >
                        Load More Users
                    </button>
                </div>
            )}
        </Layout>
    );
}

function Page({ index }) {
    const stream = useStream();
    const stripe = useMyStripe();
    const [currentSub, setCurrentSub] = useState(false);
    const { users, isLoading, updateUsers } = useStreamUserDetails({
        type: "following",
        page: index,
    });

    const [showConfirm, setShowConfirm] = useState(false);

    const onConfirm = (sub) => {
        setCurrentSub(sub);
        setShowConfirm(true);
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
                await updateUsers(currentSub.id);
            }
        } else {
            await stream.unfollowUser(currentSub.id);
            setShowConfirm(false);
            await updateUsers(currentSub.id);
        }
    };

    const onModalDismiss = (e) => {
        e.preventDefault();
        setShowConfirm(false);
    };

    if (isLoading) {
        return <SubscriptionSkeleton />;
    }

    if (!users && users.length === 0) {
        return (
            <div className="w-full flex justify-around text-gray-500 mt-5 text-xl font-semibold">
                <p>Nothing was found</p>
            </div>
        );
    }

    return (
        <div className="mt-5 w-full md:flex md:flex-wrap">
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
            {users?.map((user, idx) => {
                return (
                    <div className="md:w-1/3 mt-2 px-2" key={idx}>
                        <UserCard user={user} onConfirm={onConfirm} />
                    </div>
                );
            })}
        </div>
    );
}
