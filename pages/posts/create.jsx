import React, { useEffect, useState } from "react";
import Stream from "../../components/stream";
import { StatusUpdateForm } from "react-activity-feed";
import Layout from "../../components/layout";
import { useAuth } from "../../hooks/useAuth";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import Loading from "../../components/loading";
import Creatable from "react-select/creatable";
import useStreamTopics from "../../hooks/useStreamTopics";
import { useStream } from "../../hooks/useStream";

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
});

export default function Create() {
    const req = useRequireAuth();
    const stream = useStream();
    const topics = useStreamTopics(stream.currentUser?.id);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!req) {
        return <Loading />;
    }

    const handleCreate = async (topic) => {
        setIsLoading(true);
        const newTopic = createOption(topic);
        await topics.addTopic(newTopic);
        setSelectedTopic(newTopic);
        setIsLoading(false);
    };

    const onSuccess = async (post) => {
        await topics.addPostToTopic(post.id, selectedTopic.value);
        setSelectedTopic(null);
    };

    return (
        <Layout>
            <Stream>
                <div className="z-10">
                    <StatusUpdateForm
                        feedGroup="user"
                        FooterItem={
                            <div className="mt-4 w-2/3 md:w-1/3">
                                <Creatable
                                    options={topics.topicList}
                                    onChange={setSelectedTopic}
                                    onCreateOption={handleCreate}
                                    isLoading={isLoading}
                                    isDisabled={isLoading}
                                    noOptionsMessage={(x) => null}
                                    value={selectedTopic}
                                    placeholder="Topic"
                                />
                            </div>
                        }
                        onSuccess={onSuccess}
                    />
                    <div className="mt-10">
                        <p className="text-gray-600">
                            To add videos to this post copy-and-paste the URL
                            into the editor. Videos can only be posted through
                            youtube, vimeo etc. at this time.
                        </p>
                    </div>
                </div>
            </Stream>
        </Layout>
    );
}
