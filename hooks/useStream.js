import { connect } from "getstream";
import { createContext, useContext, useEffect, useState } from "react";
import { useFirebase } from "./useFirebase";

const streamContext = createContext();

export function ProvideStream({ children }) {
    const stream = useProvideStream();
    return (
        <streamContext.Provider value={stream}>
            {children}
        </streamContext.Provider>
    );
}

export const useStream = () => {
    return useContext(streamContext);
};

function useProvideStream() {
    const [currentUser, setCurrentUser] = useState(null);
    const [streamToken, setStreamToken] = useState(false);
    const fire = useFirebase();

    useEffect(() => {
        if (streamToken) getCurrentUser();
    }, [streamToken]);

    const getClient = () => {
        console.log("loading client");
        const token = localStorage.getItem("stream");
        const client = connect("et996ub2qf5f", token, "102445");
        return client;
    };

    const getStreamToken = async (userId) => {
        try {
            const res = await fetch(`/api/stream/${userId}/token`);
            if (!res.ok) {
                throw Error(res.statusText);
            }
            const json = await res.json();
            localStorage.setItem("stream", json.token);
            setStreamToken(json.token);
            return true;
        } catch (err) {
            console.log("Error getting stream token " + err);
        }
    };

    const getUser = async (userId) => {
        try {
            const response = await fetch(`/api/stream/${userId}`);
            const json = await response.json();
            console.log("got json " + JSON.stringify(json));
            return json?.user;
        } catch (err) {
            console.log("Error getting user " + err);
        }
    };

    const getCurrentUser = async () => {
        try {
            const client = getClient();
            const usr = await client.currentUser?.get();
            setCurrentUser(usr);
            return usr;
        } catch (err) {
            console.log("Error getting current user " + err);
        }
    };

    const updateUser = async (data) => {
        try {
            const client = getClient();
            data.profileImage = currentUser?.data?.profileImage;
            if (data.profileImageFile?.length > 0) {
                console.log("uploading profile image");
                const result = await client.images.upload(
                    data.profileImageFile[0]
                );
                data.profileImage = result.file;
            }

            console.log("updating user with data: " + data);
            const upload = {
                userName: data.userName,
                name: data.name,
                bio: data.bio,
                url: data.url,
                profileImage: data.profileImage,
            };
            await client.currentUser?.update(upload);
            await fire.updateUsername(client.currentUser.id, data.userName);
            await getCurrentUser();
            return true;
        } catch (err) {
            console.log("Error updating user " + err);
            return false;
        }
    };

    const clearUser = () => {
        setCurrentUser(null);
        setStreamToken(false);
    };

    const followUser = async (userId) => {
        try {
            const client = getClient();
            const feed = client.feed("timeline", client.currentUser.id);
            const result = await feed.follow("user", userId);
            if (result) return true;
        } catch (err) {
            console.log("Error following user " + err);
        }
    };

    const isFollowing = async (userId) => {
        try {
            const client = getClient();
            const feed = client.feed("timeline", client.currentUser.id);
            const res = await feed.following({
                limit: 1,
                offset: 0,
                filter: ["user:" + userId],
            });
            return res.results.length > 0;
        } catch (err) {
            console.log("Error checking user following " + err);
        }
    };

    return {
        getStreamToken,
        updateUser,
        getCurrentUser,
        currentUser,
        getUser,
        streamToken,
        clearUser,
        followUser,
        isFollowing,
    };
}
