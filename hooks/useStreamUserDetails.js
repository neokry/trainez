import { useEffect, useState } from "react";
import { useStream } from "./useStream";
import axios from "axios";
import useSWR, { mutate } from "swr";
const fetcher = (url, query) => axios.post(url, query).then((res) => res.data);

export default function useStreamUserDetails({ type, page }) {
    const [query, setQuery] = useState(false);
    const stream = useStream();

    const { data, error } = useSWR(
        query ? [`/api/stream/users/details`, query] : null,
        fetcher,
        { refreshInterval: 0 }
    );

    useEffect(() => {
        if (stream.currentUser) getQuery();
    }, [type, stream]);

    const getQuery = async () => {
        if (type === "following") {
            const newQuery = await stream.getFollowing(10, page);
            setQuery(newQuery);
        } else if (type === "followers") {
            const newQuery = await stream.getFollowers(10, page);
            setQuery(newQuery);
        }
    };

    const updateUsers = async (userId) => {
        await getQuery();
        mutate(
            [`/api/stream/users/details`, query],
            async (users) => {
                return users.filter((user) => user.id !== userId);
            },
            false
        );
    };

    return {
        users: data,
        isLoading: !data && !error,
        isError: error,
        updateUsers,
    };
}
