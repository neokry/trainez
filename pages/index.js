import { useEffect, useState } from "react";
import Loading from "../components/loading";
import MainFeed from "../components/mainFeed";
import Signup from "../components/signup";
import { useAuth } from "../hooks/useAuth";

function IndexPage() {
    const [authFailed, setAuthFailed] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        if (auth.user === false) {
            setAuthFailed(true);
        } else {
            setAuthFailed(false);
        }
    }, [auth]);

    if (authFailed) {
        return <Signup />;
    } else if (auth.user) {
        return <MainFeed />;
    } else {
        return <Loading />;
    }
}

export default IndexPage;
