import { Activity, FlatFeed, LikeButton } from "react-activity-feed";
import Stream from "./stream";
import { UserActivity } from "./userActivity";

export default function UserFeed({ userId }) {
    return (
        <div>
            <Stream>
                <FlatFeed
                    feedGroup="user"
                    userId={userId}
                    options={{ reactions: { recent: true } }}
                    notify
                    Activity={(props) => <UserActivity props={props} />}
                />
            </Stream>
        </div>
    );
}
