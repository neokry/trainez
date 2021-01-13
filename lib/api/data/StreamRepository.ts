import { Activity, connect, StreamUser } from "getstream";
import UserDetailsEntity from "./entities/UserDetailsEntity";
import jwt from "jsonwebtoken";
import axios, { AxiosRequestConfig } from "axios";

const client = connect(
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

    return { userDetails, activites };
}
