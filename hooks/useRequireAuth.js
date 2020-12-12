import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useStream } from "./useStream";

export function useRequireAuth(redirectUrl = "/") {
    const stream = useStream();
    const router = useRouter();

    useEffect(() => {
        if (stream.currentUser === false) {
            router.push(redirectUrl);
        }
    }, [stream.currentUser, router]);

    return stream.currentUser;
}
