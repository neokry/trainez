import Stream from "../components/stream";
import { FlatFeed, LikeButton, Activity } from "react-activity-feed";
import Layout from "../components/layout";
import { useState } from "react";

export default function MainFeed() {
    const [showComments, setShowComments] = useState(false);

    function handleCommentsClick(e) {
        e.preventDefault();
        console.log(showComments);
        setShowComments(true);
    }

    return (
        <Layout>
            <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                Home
            </h1>
            <div className="md:w-3/4 mt-6">
                <Stream>
                    <FlatFeed
                        options={{ reactions: { recent: true } }}
                        notify
                        Activity={(props) => (
                            <div className="py-2 border-b-2">
                                <Activity
                                    {...props}
                                    Footer={() => (
                                        <div>
                                            <LikeButton {...props} />
                                        </div>
                                    )}
                                />
                            </div>
                        )}
                    />
                </Stream>
            </div>
        </Layout>
    );
}
