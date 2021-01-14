import { NewActivity, StreamClient } from "getstream";
import { useStream } from "./useStream";

const useStreamNotifications = () => {
    const { getClient } = useStream();

    const followNotification = async (currentUserId, followingUserId) => {
        const client = getClient() as StreamClient;
        const feed = client.feed("notification", followingUserId);
        const activity: NewActivity = {
            actor: `User:${currentUserId}`,
            verb: "follow",
            object: `User:${followingUserId}`,
        };
        await feed.addActivity(activity);
    };

    return { followNotification };
};

export default useStreamNotifications;
