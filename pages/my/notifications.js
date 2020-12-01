import React from "react";
import Stream from "../../components/stream";
import Layout from "../../components/layout";
import { NotificationFeed, Notification } from "react-activity-feed";
import "react-activity-feed/dist/index.css";

export default function notifications() {
    return (
        <Layout>
            <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                Notifications
            </h1>
            <div className="w-1/2 mt-6">
                <Stream>
                    <NotificationFeed
                        Group={(props) => (
                            <Notification
                                {...props}
                                onClickUser={(user) => console.log(user)}
                                onClickNotification={(notification) =>
                                    console.log(notification)
                                }
                            />
                        )}
                    />
                </Stream>
            </div>
        </Layout>
    );
}
