import { Activity } from "getstream";
import FireRepository from "../data/FireRepository";
import StreamRepository from "../data/StreamRepository";

export default function SocialService() {
    const { activites, notify, follow } = StreamRepository();
    const { topicPosts } = FireRepository();

    const getActivitiesByTopic = async (
        topicId: string,
        userId: string
    ): Promise<Activity[]> => {
        const activityIds = await topicPosts(topicId, userId);
        const actData = await activites(activityIds);
        return actData;
    };

    const followUser = async (currentUserId, followingUserId) => {
        const res = await follow(currentUserId, followingUserId);
        if (res)
            await notify(
                `SU:${currentUserId}`,
                `SU:${followingUserId}`,
                "follow",
                followingUserId
            );
    };

    return { getActivitiesByTopic, followUser };
}
