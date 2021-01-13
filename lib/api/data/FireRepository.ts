import { projectFirestore } from "../../../configs/firebase";
import LastOnlineEntity from "./entities/LastOnlineEntity";

export default function FireRepository() {
    const usersLastOnline = async (
        userIds: string[]
    ): Promise<LastOnlineEntity[]> => {
        const query = await projectFirestore
            .collection("lastOnline")
            .where("__name__", "in", userIds)
            .get();

        return query.docs.map((doc) => {
            const data = doc.data();
            const lastOnline: LastOnlineEntity = {
                userId: doc.id,
                lastOnline: data.lastOnline.toDate(),
            };
            return lastOnline;
        });
    };

    const topicPosts = async (
        userId: string,
        topicId: string
    ): Promise<string[]> => {
        const res = await projectFirestore
            .collection("topics")
            .doc(topicId)
            .collection("posts")
            .doc(userId)
            .get();

        return res.data()?.posts;
    };

    return { usersLastOnline, topicPosts };
}
