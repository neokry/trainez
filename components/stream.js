import React, { useEffect, useState } from "react";
import { StreamApp } from "react-activity-feed";
import useSwr from "swr";
import { useAuth } from "../hooks/useAuth";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Stream(props) {
    const [stream, setStream] = useState(false);
    useEffect(() => {
        setStream(localStorage.getItem("stream"));
    }, []);

    if (!stream) return <div>Loading..</div>;

    return (
        <StreamApp apiKey="et996ub2qf5f" appId="102445" token={stream}>
            {props.children}
        </StreamApp>
    );
}
