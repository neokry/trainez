export function useStream() {
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

    return { getStreamToken };
}
