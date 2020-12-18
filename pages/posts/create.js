import React from "react";
import Stream from "../../components/stream";
import { StatusUpdateForm } from "react-activity-feed";
import Layout from "../../components/layout";
import { useAuth } from "../../hooks/useAuth";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import Loading from "../../components/loading";

export default function Create() {
    const req = useRequireAuth();

    if (!req) {
        return <Loading />;
    }

    return (
        <Layout>
            <Stream>
                <div className="z-10">
                    <StatusUpdateForm feedGroup="user" />
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
