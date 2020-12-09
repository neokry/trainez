import React, { useEffect, useState } from "react";
import { StreamApp } from "react-activity-feed";
import { useAuth } from "../hooks/useAuth";
import { useStream } from "../hooks/useStream";

export default function Stream(props) {
    const stream = useStream();
    const auth = useAuth();
    const [streamToken, setStreamToken] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("stream")) {
            setStreamToken(localStorage.getItem("stream"));
        } else if (stream.streamToken) {
            setStreamToken(stream.streamToken);
        }
    }, [stream.streamToken]);

    if (!streamToken) return <div>Loading..</div>;

    return (
        <StreamApp apiKey="et996ub2qf5f" appId="102445" token={streamToken}>
            {props.children}
        </StreamApp>
    );
}
