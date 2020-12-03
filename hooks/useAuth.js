import { createContext, useContext, useEffect, useState } from "react";
import { projectAuth } from "../configs/firebase";

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
            });
    };

    const signup = (email, password) => {
        projectAuth
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                console.log("Error signing up" + err);
            })
            .then((e) => {
                setUser(e.user);
                localStorage.setItem("user", e.user);
                return e.user;
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
            });
    };

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                localStorage.setItem("user", user);
            } else {
                setUser(false);
                localStorage.removeItem("user");
            }
        });

        return () => unsub();
    }, []);

    return { user, signin, signup, signout };
}
