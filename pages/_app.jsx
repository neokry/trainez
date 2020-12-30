import "../css/index.css";
import "react-activity-feed/dist/index.css";
import { ProvideAuth } from "../hooks/useAuth";
import { ProvideStream } from "../hooks/useStream";
import firebase from "firebase";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { useEffect } from "react";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        firebase.analytics();
    }, [firebase]);

    useEffect(() => {
        Sentry.init({
            dsn:
                "https://b9226b7a35c54e35a9d199e0c8f9b4be@o493691.ingest.sentry.io/5563539",
            autoSessionTracking: true,
            environment: process.env.VERCEL_ENV,
            integrations: [new Integrations.BrowserTracing()],
            tracesSampleRate: 1.0,
        });
    }, [Sentry]);

    return (
        <div>
            <DefaultSeo
                openGraph={{
                    type: "website",
                    locale: "en_IE",
                    url: "https://www.trainez.app/",
                    site_name: "TrainEZ",
                    description: "The easiest way to build a fitness community",
                    images: [
                        {
                            url: "https://trainez.vercel.app/landingImage.jpg",
                            alt: "Landing Image",
                        },
                    ],
                }}
            />
            <ProvideStream>
                <ProvideAuth>
                    <Component {...pageProps} />
                </ProvideAuth>
            </ProvideStream>
        </div>
    );
}

export default MyApp;
