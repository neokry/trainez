import {
    Activity,
    connect,
    NewActivity,
    StreamClient,
    StreamUser,
} from "getstream";
import UserDetailsEntity from "./entities/UserDetailsEntity";
import jwt from "jsonwebtoken";
import axios, { AxiosRequestConfig } from "axios";

const client: StreamClient = connect(
    process.env.NEXT_PUBLIC_STREAM_KEY,
    process.env.STREAM_SECRET,
    process.env.NEXT_PUBLIC_STREAM_APP_ID
);

export default function StreamRepository() {
    const userDetails = async (
        userIds: string[]
    ): Promise<UserDetailsEntity[]> => {
        let userGroup: Promise<StreamUser<Record<string, unknown>>>[] = [];

        userIds.map((userId) => {
            userGroup.push(client.user(userId).get());
        });

        const userDetails = await Promise.all(userGroup);

        return userDetails.map((user) => {
            const detail: UserDetailsEntity = {
                id: user.id,
                data: user.data,
            };
            return detail;
        });
    };

    const activites = async (activityIds: string[]): Promise<Activity[]> => {
        const scope = {
            resource: "activities",
            action: "read",
            feed_id: "*",
        };

        const token = jwt.sign(scope, process.env.STREAM_SECRET);

        const config: AxiosRequestConfig = {
            headers: { "Stream-Auth-Type": jwt, Authorization: token },
            params: {
                api_key: process.env.NEXT_PUBLIC_STREAM_KEY,
                ids: activityIds.join(","),
            },
        };

        const res = await axios.get(
            "https://us-east-api.stream-io-api.com/api/v1.0/enrich/activities/",
            config
        );

        return res.data?.results;
    };

    const notify = async (
        actorId: string,
        object: string,
        verb: string,
        feedId: string
    ) => {
        const feed = client.feed("notification", feedId);
        const activity: NewActivity = {
            actor: actorId,
            verb: verb,
            object: object,
        };
        const result = await feed.addActivity(activity);
        console.log("notify res", result);
        return result;
    };

    const follow = async (currentUserId: string, followingUserId: string) => {
        const feed = client.feed("timeline", currentUserId);
        const result = await feed.follow("user", followingUserId);
        console.log("follow res", result);
        return result;
    };

    return { userDetails, activites, notify, follow };
}
