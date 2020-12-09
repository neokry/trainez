import { createContext, useContext, useEffect, useState } from "react";
import { projectAuth } from "../configs/firebase";
import { useFirebase } from "./useFirebase";
import { useStream } from "./useStream";

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

    const signin = (email, password) => {
        projectAuth
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                console.log("Error signing ing" + err);
            })
            .then((e) => {
                setUser(e.user);
                localStorage.setItem("user", e.user);
                return e.user;
            })
            .then((usr) => {
                stream.getStreamToken(usr.uid);
            });
    };

    const signup = (email, password, name) => {
        projectAuth
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                console.log("Error signing up" + err);
            })
            .then((e) => {
                setUser(e.user);
                localStorage.setItem("user", e.user);
                return e.user;
            })
            .then((usr) => {
                stream.getStreamToken(usr.uid);
                fire.updateUsername(name);
            });
    };

    const signout = (email, password) => {
        projectAuth
            .signOut()
            .catch((err) => {
                console.log("Error signing out" + err);
            })
            .then((e) => {
                setUser(false);
                localStorage.removeItem("user");
                localStorage.removeItem("stream");
            });
    };

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((usr) => {
            if (usr) {
                setUser(usr);
                localStorage.setItem("user", usr);
                stream.getStreamToken(usr.uid);
            } else {
                setUser(false);
                localStorage.removeItem("user");
                localStorage.removeItem("stream");
            }
        });

        return () => unsub();
    }, []);

    return { user, signin, signup, signout };
}
