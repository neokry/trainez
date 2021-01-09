import { useEffect, useState } from "react";
import Loading from "../components/loading";
import MainFeed from "../components/mainFeed";
import { useAuth } from "../hooks/useAuth";
import { useStream } from "../hooks/useStream";
import { NextSeo } from "next-seo";
import LandingPage from "../components/landingPage";

function IndexPage() {
    const [authFailed, setAuthFailed] = useState(false);
    const auth = useAuth();
    const stream = useStream();

    useEffect(() => {
        if (auth.user === false) {
            setAuthFailed(true);
        } else {
            setAuthFailed(false);
        }
    }, [auth.user]);

    return (
        <>
            <SEOSettings />
            {(() => {
                if (authFailed) {
                    return <LandingPage />;
                } else if (stream.currentUser) {
                    return <MainFeed />;
                } else {
                    return <Loading />;
                }
            })()}
        </>
    );
}

function SEOSettings() {
    return (
        <NextSeo
            title="TrainEZ"
            description="The easiest way to build a fitness community"
        />
    );
}

export default IndexPage;
