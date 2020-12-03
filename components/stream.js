import React, { useEffect } from "react";
import { StreamApp } from "react-activity-feed";
import useSwr from "swr";
import { useAuth } from "../hooks/useAuth";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Stream(props) {
    const auth = useAuth();
    if (!auth.user) return <div>Loading...</div>;

    const { data, error } = useSwr(
        `/api/stream/${auth.user.uid}/token`,
        fetcher
    );

    if (error) return <div>Failed to load user</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <StreamApp apiKey="et996ub2qf5f" appId="102445" token={data.token}>
            {props.children}
        </StreamApp>
    );
}
