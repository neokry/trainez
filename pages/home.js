import React from "react";
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

export default function Home() {
    return (
        <div>
            <h1 className="font-bold text-2xl border-2">Home</h1>
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
    );
}
