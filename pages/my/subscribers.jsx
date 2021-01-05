import { useEffect, useState } from "react";
import useSWR from "swr";
import Layout from "../../components/layout";
import Loading from "../../components/loading";
import SubscriptionSkeleton from "../../components/subscriptionSkeleton";
import UserCard from "../../components/userCard";
import { useAuth } from "../../hooks/useAuth";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import useStreamUserDetails from "../../hooks/useStreamUserDetails";

export default function Subscribers() {
    const req = useRequireAuth();
    const [hasMore, setHasMore] = useState(false);
    const auth = useAuth();
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
        const maxLoaded = (pageCount + 1) * 10;
        const followers = followStats?.followers ?? 0;
        const diff = followers - maxLoaded;
        setHasMore(diff > 0);
    }, [pageCount, followStats]);

    if (!req) {
        return <Loading />;
    }

    return (
        <Layout>
            <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                Followers
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
    const { users, isLoading } = useStreamUserDetails({
        type: "followers",
        page: index,
    });

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
            {users?.map((user, idx) => {
                return (
                    <div className="md:w-1/2 mt-2 px-2" key={idx}>
                        <UserCard user={user} />
                    </div>
                );
            })}
        </div>
    );
}
