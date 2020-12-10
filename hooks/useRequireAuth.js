import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

export function useRequireAuth(redirectUrl = "/") {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (auth.user === false) {
            router.push(redirectUrl);
        }
    }, [auth, router]);

    return auth.user;
}
