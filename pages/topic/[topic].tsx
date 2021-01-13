import { useRouter } from "next/router";
import useSWR from "swr";
import { UserActivity } from "../../components/userActivity";
import Layout from "../../components/layout";
import useStreamTopics from "../../hooks/useStreamTopics";
import { useEffect, useState } from "react";
import { SinglePost, LoadMorePaginator } from "react-activity-feed";
import { useStream } from "../../hooks/useStream";
import Stream from "../../components/stream";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import Loading from "../../components/loading";

export default function Topic() {
    const req = useRequireAuth();
    const router = useRouter();
    const { uid, topic } = router.query;
    const { topicList, getPostsInTopic } = useStreamTopics(uid);
    const [actIds, setActIds] = useState([]);
    const [topicName, setTopicName] = useState("");
    const stream = useStream();
    const [pageCount, setPageCount] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    //Initial Load
    useEffect(() => {
        const load = async () => {
            const ids = await getPostsInTopic(topic);
            console.log("ids", ids);
            setActIds(ids);
        };
        load();
    }, [topic]);

    //Get topic name
    useEffect(() => {
        if (topicList.length === 0) return;
        const selected = topicList.find((x) => x.value === topic);
        setTopicName(selected.label);
    }, [topicList]);

    //Pagingination
    const pageSize = 10;
    const pages = [];
    let chunks = [];

    if (actIds) {
        chunks = chunk(actIds, pageSize);
        if (chunks.length > 0) {
            for (let i = 0; i <= pageCount; i++) {
                pages.push(
                    <Page actIds={chunks[i]} uid={uid as string} key={i} />
                );
            }
        }
    }

    useEffect(() => {
        if (pageCount + 1 === chunks.length) {
            setHasMore(false);
        }
    }, [pageCount, chunks]);

    const loadMore = () => {
        setPageCount(pageCount + 1);
    };

    if (!req) return <Loading />;

    if (!actIds || !stream.currentUser || pages.length === 0) {
        return (
            <div>
                <Layout>
                    <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                        {topicName}
                    </h1>
                </Layout>
            </div>
        );
    }

    return (
        <div>
            <Layout>
                <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                    {topicName}
                </h1>
                <Stream>
                    <div className="md:w-3/4">
                        {pages}
                        <LoadMorePaginator
                            loadNextPage={loadMore}
                            refreshing={false}
                            reverse={false}
                            hasNextPage={hasMore}
                        />
                    </div>
                </Stream>
            </Layout>
        </div>
    );
}

interface PageProps {
    actIds: string[];
    uid: string;
}

function Page({ actIds, uid }: PageProps) {
    return (
        <>
            {actIds.map((id, idx) => {
                return (
                    <SinglePost
                        key={idx}
                        activityId={id}
                        userId={uid}
                        feedGroup="user"
                        Activity={(props) => <UserActivity props={props} />}
                    />
                );
            })}
        </>
    );
}

function chunk(array, size) {
    const chunked_arr = [];
    let index = 0;
    while (index < array.length) {
        chunked_arr.push(array.slice(index, size + index));
        index += size;
    }
    return chunked_arr;
}
