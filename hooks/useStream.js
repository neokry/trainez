import { connect } from "getstream";
import { useEffect, useState } from "react";

export function useStream() {
    const [client, setClient] = useState(false);
    const [user, setUser] = useState(false);

    useEffect(() => {
        console.log("loading client");
        const token = localStorage.getItem("stream");
        const client = connect("et996ub2qf5f", token, "102445");
        setClient(client);
    }, []);

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

    const getUser = () => {
        client.currentUser
            ?.get()
            .catch((err) => {
                console.log("Error getting user " + err);
            })
            .then((usr) => {
                setUser(usr);
            });
    };

    const updateUser = (data) => {
        client.currentUser?.update(data).catch((err) => {
            console.log("Error setting user " + err);
        });
    };

    const uploadProfilePicture = (file) => {};

    return { getStreamToken, updateUser, getUser, user };
}
