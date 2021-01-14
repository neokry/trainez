import { connect } from "getstream";
import { createContext, useContext, useEffect, useState } from "react";
import { useFirebase } from "./useFirebase";
import useMyStripe from "./useMyStripe";
import useMyStripeInfo from "./useMyStripeInfo";
import axios from "axios";

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
            const res = await axios.get(`/api/stream/${userId}/token`);
            localStorage.setItem("stream", res.data.token);
            setStreamToken(res.data.token);
            return true;
        } catch (err) {
            console.log("Error getting stream token " + err);
        }
    };

    const getUser = async (userId) => {
        try {
            const response = await axios.get(`/api/stream/${userId}`);
            return response.data.user;
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
        return true;
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

    const getFollowing = async (limit, page) => {
        const client = getClient();
        const stripeInfo = useMyStripeInfo();
        const feed = client.feed("timeline", currentUser.id);

        console.log("page", page);

        const following = await feed.following({
            limit: limit,
            offset: page * limit,
        });
        console.log("following", JSON.stringify(following));

        const userIds = following.results.map((follow) => {
            const feedId = follow.target_id;
            const split = feedId.split(":");
            return split[1];
        });

        if (userIds.length === 0) return { userIds: [] };

        const info = await stripeInfo.getStripeInfo(currentUser.id);

        const usersReq = {
            userIds: userIds,
            customerId: info.customerId,
        };

        return usersReq;
    };

    const getFollowers = async () => {
        const client = getClient();
        const feed = client.feed("user", client.currentUser.id);

        const followers = await feed.followers();

        const userIds = followers.results.map((follow) => {
            const feedId = follow.feed_id;
            const split = feedId.split(":");
            return split[1];
        });

        if (userIds.length === 0) return { userIds: [] };

        const usersReq = {
            userIds: userIds,
        };

        return usersReq;
    };

    return {
        getClient,
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
        getFollowers,
    };
}
