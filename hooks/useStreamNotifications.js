import { useStream } from "./useStream";

export default function useStreamNotifications() {
    const stream = useStream();

    const likeNotification = async (activity) => {
        const user = stream.currentUser;
        if (user && activity) {
            consol.log("adding notification");
            const feed = client.feed("notification", user.id);
            const data = { actor: user, verb: "like", object: activity };
            return await feed.add_activity(data);
        }
    };

    return { likeNotification };
}
