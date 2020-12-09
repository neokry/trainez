import { connect } from "getstream";
import { useEffect, useState } from "react";
import { useFirebase } from "./useFirebase";

export function useStream() {
    const [currentUser, setCurrentUser] = useState(false);
    const fire = useFirebase();

    const getClient = () => {
        console.log("loading client");
        const token = localStorage.getItem("stream");
        const client = connect("et996ub2qf5f", token, "102445");
        return client;
    };

    const getStreamToken = (userId) => {
        fetch(`/api/stream/${userId}/token`)
            .catch((err) => {
                console.log("Error getting stream token " + err);
            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((json) => {
                localStorage.setItem("stream", json.token);
            });
    };

    const getUser = async (userId) => {
        try {
            const client = getClient();
            console.log("Getting user: " + userId + " and client " + client);
            return await client.user(userId).get();
        } catch (err) {
            console.log("Error getting user " + err);
        }
    };

    const getCurrentUser = () => {
        const client = getClient();
        return client.currentUser
            ?.get()
            .then((usr) => {
                setCurrentUser(usr);
                return usr;
            })
            .catch((err) => {
                console.log("Error getting user " + err);
            });
    };

    const updateUser = async (data) => {
        try {
            const client = getClient();
            data.profileImage = currentUser.data?.profileImage;
            if (data.profileImageFile?.length > 0) {
                const result = await client.images.upload(
                    data.profileImageFile[0]
                );
                data.profileImage = result.file;
            }
            const upload = {
                userName: data.userName,
                name: data.name,
                bio: data.bio,
                url: data.url,
                profileImage: data.profileImage,
            };
            await client.currentUser?.update(upload);
            await fire.updateUsername(data.userName);
        } catch (err) {
            console.log("Error updating user " + err);
        }
    };

    return { getStreamToken, updateUser, getCurrentUser, currentUser, getUser };
}
