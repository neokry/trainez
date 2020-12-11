import { Activity, FlatFeed, LikeButton } from "react-activity-feed";
import Stream from "./stream";

export default function UserFeed({ userId }) {
    return (
        <div>
            <Stream>
                <FlatFeed
                    feedGroup="user"
                    userId={userId}
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
    );
}
