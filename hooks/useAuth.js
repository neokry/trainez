import { createContext, useContext, useEffect, useState } from "react";
import { projectAuth } from "../configs/firebase";
import { useFirebase } from "./useFirebase";
import { useStream } from "./useStream";
import { useRouter } from "next/router";
import firebase from "firebase";
import useMyStripe from "./useMyStripe";

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const stream = useStream();
    const fire = useFirebase();
    const router = useRouter();
    const stripe = useMyStripe();

    const signin = async (email, password) => {
        try {
            const response = await projectAuth.signInWithEmailAndPassword(
                email,
                password
            );
            const usr = response.user;
            setUser(usr);
            localStorage.setItem("user", usr);
            const success = await stream.getStreamToken(usr.uid);
            if (success) await stream.getCurrentUser();
            firebase.analytics().logEvent("login", { method: "email" });
        } catch (err) {
            console.log("Error signing in " + err);
            setUser(false);
            throw err;
        }
    };

    const signup = async (email, password, name) => {
        try {
            const userResult = await projectAuth.createUserWithEmailAndPassword(
                email,
                password
            );

            const usr = userResult.user;
            setUser(usr);
            localStorage.setItem("user", usr);
            const success = await stream.getStreamToken(usr.uid);

            if (success) {
                const num = Math.floor(Math.random() * 100000000);
                const username = "u" + num;
                await stream.updateUser({
                    userName: username,
                    name: name,
                });
                await fire.createMemberCode(usr.uid);
                await stripe.setupStripe(usr.uid, email, name);
                await stream.getCurrentUser();

                firebase.analytics().logEvent("sign_up", { method: "email" });
            }
        } catch (err) {
            console.log("Error signing up " + err);
            throw err;
        }
    };

    const signout = (email, password) => {
        projectAuth
            .signOut()
            .catch((err) => {
                console.log("Error signing out" + err);
            })
            .then((e) => {
                stream.clearUser();
                setUser(false);
                localStorage.removeItem("user");
                localStorage.removeItem("stream");
                router.push("/");
            });
    };

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged(async (usr) => {
            if (usr) {
                setUser(usr);
                localStorage.setItem("user", usr);
                const success = await stream.getStreamToken(usr.uid);
                if (success) await stream.getCurrentUser();
            } else {
                stream.clearUser();
                setUser(false);
                localStorage.removeItem("user");
                localStorage.removeItem("stream");
            }
        });

        return () => unsub();
    }, []);

    return { user, signin, signup, signout };
}
