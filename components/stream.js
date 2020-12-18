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

    if (!streamToken) return null;

    return (
        <StreamApp
            apiKey={process.env.NEXT_PUBLIC_STREAM_KEY}
            appId={process.env.NEXT_PUBLIC_STREAM_APP_ID}
            token={streamToken}
        >
            {props.children}
        </StreamApp>
    );
}
