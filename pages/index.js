import { useEffect, useState } from "react";
import Loading from "../components/loading";
import MainFeed from "../components/mainFeed";
import Signup from "../components/signup";
import { useAuth } from "../hooks/useAuth";
import { useStream } from "../hooks/useStream";

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

    if (authFailed) {
        return (
            <div className="md:flex md:justify-start">
                <div className="mt-24 md:mt-0 md:w-1/2 flex justify-around">
                    <img
                        src="/landingImage.jpg"
                        alt="landing image"
                        className="h-40 w-40 md:h-screen md:w-full object-top object-cover rounded-full md:rounded-md"
                    />
                </div>
                <div className="md:mt-24 md:w-1/2 flex justify-around">
                    <div className="w-full md:w-1/2">
                        <Signup showTitle={true} />
                    </div>
                </div>
            </div>
        );
    } else if (stream.currentUser) {
        return <MainFeed />;
    } else {
        return <Loading />;
    }
}

export default IndexPage;
