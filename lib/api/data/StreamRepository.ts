import { connect, StreamUser } from "getstream";
import UserDetailsEntity from "./entities/UserDetailsEntity";

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

    return { userDetails };
}
