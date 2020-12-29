import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Loading from "../../components/loading";
import Skeleton from "../../components/skeleton";
import SubscriptionSkeleton from "../../components/subscriptionSkeleton";
import UserCard from "../../components/userCard";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { useStream } from "../../hooks/useStream";

export default function Subscribers() {
    const stream = useStream();
    const req = useRequireAuth();
    const [followers, setFollowers] = useState(null);

    useEffect(() => {
        if (!stream.currentUser) return;
        getFollowing();
    }, [stream]);

    const getFollowing = async () => {
        const res = await stream.getFollowers();
        if (res?.length > 0) setFollowers(res);
        else setFollowers(false);
    };

    if (!req) {
        return <Loading />;
    }

    if (followers === null) {
        return (
            <Layout>
                <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                    Followers
                </h1>
                <SubscriptionSkeleton />
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                Followers
            </h1>
            {followers ? (
                <div className="mt-5">
                    {followers?.map((user, idx) => {
                        return (
                            <div className="md:w-1/2 mt-2" key={idx}>
                                <UserCard user={user} />
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
