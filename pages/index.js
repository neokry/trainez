import Stream from "../components/stream";
import {
    FlatFeed,
    LikeButton,
    Activity,
    CommentList,
    CommentField,
    StatusUpdateForm,
} from "react-activity-feed";
import "react-activity-feed/dist/index.css";
import Layout from "../components/layout";

function IndexPage() {
    return (
        <Layout>
            <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                Home
            </h1>
            <div className="w-1/2 mt-6">
                <Stream>
                    <FlatFeed
                        options={{ reactions: { recent: true } }}
                        notify
                        Activity={(props) => (
                            <Activity
                                {...props}
                                Footer={() => (
                                    <div style={{ padding: "8px 16px" }}>
                                        <LikeButton {...props} />
                                        <CommentField
                                            activity={props.activity}
                                            onAddReaction={props.onAddReaction}
                                        />
                                        <CommentList
                                            activityId={props.activity.id}
                                        />
                                    </div>
                                )}
                            />
                        )}
                    />
                </Stream>
            </div>
        </Layout>
    );
}

export default IndexPage;
