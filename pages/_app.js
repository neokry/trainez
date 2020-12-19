import "../css/index.css";
import "react-activity-feed/dist/index.css";
import { ProvideAuth } from "../hooks/useAuth";
import { ProvideStream } from "../hooks/useStream";
import firebase from "firebase";
import { useEffect } from "react/cjs/react.development";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        firebase.analytics();
        console.log("analytics setup");

        Sentry.init({
            dsn:
                "https://b9226b7a35c54e35a9d199e0c8f9b4be@o493691.ingest.sentry.io/5563539",
            autoSessionTracking: true,
            environment: process.env.VERCEL_ENV,
            integrations: [new Integrations.BrowserTracing()],

            // We recommend adjusting this value in production, or using tracesSampler
            // for finer control
            tracesSampleRate: 1.0,
        });
    }, [firebase]);

    return (
        <ProvideStream>
            <ProvideAuth>
                <Component {...pageProps} />
            </ProvideAuth>
        </ProvideStream>
    );
}

export default MyApp;
