import { useState } from "react";
import {
    Activity,
    CommentField,
    CommentList,
    LikeButton,
} from "react-activity-feed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export function UserActivity({ props }) {
    const [showComments, setShowComments] = useState(false);
    const router = useRouter();

    const onClickUser = (user) => {
        const userName = user.data.userName;
        router.push("/" + userName);
    };

    const onCommentClick = (e) => {
        e.preventDefault();
        setShowComments(!showComments);
    };

    return (
        <div className="py-2 border-b-2">
            <Activity
                onClickUser={onClickUser}
                {...props}
                Footer={() => (
                    <div className="mt-3">
                        <div className="flex items-baseline justify-between pr-2">
                            <div className="mr-2">
                                <LikeButton {...props} />
                            </div>

                            <button type="button" onClick={onCommentClick}>
                                <div className="flex">
                                    <div className="mr-2 text-lg text-gray-500">
                                        <FontAwesomeIcon icon={faComment} />
                                    </div>

                                    <p className="text-sm font-extrabold text-gray-700">
                                        {props.activity.reaction_counts.comment}{" "}
                                        {props.activity.reaction_counts
                                            .comment > 1
                                            ? "comments"
                                            : "comment"}
                                    </p>
                                </div>
                            </button>
                        </div>

                        {showComments && (
                            <>
                                <CommentList activityId={props.activity.id} />
                                <CommentField
                                    activity={props.activity}
                                    onAddReaction={props.onAddReaction}
                                />
                            </>
                        )}
                    </div>
                )}
            />
        </div>
    );
}
