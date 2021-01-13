import { projectFirestore } from "../configs/firebase";
import firebase from "firebase";
import { useEffect, useState } from "react";

export default function useStreamTopics(userId) {
    const [topicList, setTopicList] = useState([]);

    useEffect(() => {
        if (userId) getTopics();
    }, [userId]);

    const addPostToTopic = async (postId, topic) => {
        await projectFirestore
            .collection("topics")
            .doc(topic)
            .collection("posts")
            .doc(userId)
            .set(
                {
                    posts: firebase.firestore.FieldValue.arrayUnion(postId),
                },
                { merge: true }
            );
        console.log("Added post to topic");
    };

    const getPostsInTopic = async (topic) => {
        const res = await projectFirestore
            .collection("topics")
            .doc(userId)
            .collection("posts")
            .doc(topic)
            .get();
        return res.data()?.posts;
    };

    const addTopic = async (topic) => {
        await projectFirestore
            .collection("topics")
            .doc(userId)
            .set(
                {
                    topics: firebase.firestore.FieldValue.arrayUnion(topic),
                },
                { merge: true }
            );
        setTopicList([...topicList, topic]);
        console.log("Added topic");
    };

    const getTopics = async () => {
        const res = await projectFirestore
            .collection("topics")
            .doc(userId)
            .get();
        if (res.data()?.topics) {
            setTopicList(res.data()?.topics);
        }
    };

    return { topicList, addPostToTopic, getPostsInTopic, addTopic };
}
