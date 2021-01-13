import { Activity } from "getstream";
import FireRepository from "../data/FireRepository";
import StreamRepository from "../data/StreamRepository";

export default function SocialService() {
    const { activites } = StreamRepository();
    const { topicPosts } = FireRepository();

    const getActivitiesByTopic = async (
        topicId: string,
        userId: string
    ): Promise<Activity[]> => {
        const activityIds = await topicPosts(topicId, userId);
        const actData = await activites(activityIds);
        return actData;
    };

    return { getActivitiesByTopic };
}
