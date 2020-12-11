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
    const [currentUser, setCurrentUser] = useState(false);
    const [streamToken, setStreamToken] = useState(false);
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
                setStreamToken(json.token);
            });
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

    return {
        getStreamToken,
        updateUser,
        getCurrentUser,
        currentUser,
        getUser,
        streamToken,
    };
}
