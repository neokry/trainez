import { connect } from "getstream";
import { createContext, useContext, useEffect, useState } from "react";
import { useFirebase } from "./useFirebase";
import useMyStripe from "./useMyStripe";

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
    const stripe = useMyStripe();

    const getClient = () => {
        console.log("loading client");
        const token = localStorage.getItem("stream");
        const client = connect(
            process.env.NEXT_PUBLIC_STREAM_KEY,
            token,
            process.env.NEXT_PUBLIC_STREAM_APP_ID
        );
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

    const unfollowUser = async (userId) => {
        const client = getClient();
        const feed = client.feed("timeline", client.currentUser.id);
        await feed.unfollow("user", userId);
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

    const getFollowing = async () => {
        const client = getClient();
        const feed = client.feed("timeline", client.currentUser.id);

        const following = await feed.following();

        const userIds = following.results.map((follow) => {
            const feedId = follow.target_id;
            const split = feedId.split(":");
            return split[1];
        });

        const info = stripe.getStripeInfo(currentUser.id);

        const usersReq = {
            userIds: userIds,
            customerId: info.customerId,
        };

        const res = await fetch(`/api/stream/users/details`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usersReq),
        });

        return await res.json();
    };

    const getFollowingStats = async () => {
        const response = await fetch(
            `/api/stream/${currentUser.id}/followStats`
        );
        return await response.json();
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
        unfollowUser,
        isFollowing,
        getFollowing,
        getFollowingStats,
    };
}
