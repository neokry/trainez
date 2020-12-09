import { useEffect, useState } from "react";
import MainFeed from "../components/mainFeed";
import Signup from "../components/signup";
import { useAuth } from "../hooks/useAuth";

function IndexPage() {
    const [login, setLogin] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        if (localStorage.getItem("user") || auth.user) setLogin(true);
        else setLogin(false);
    }, [auth.user]);

    if (login) {
        return <MainFeed />;
    } else {
        return <Signup />;
    }
}

export default IndexPage;
