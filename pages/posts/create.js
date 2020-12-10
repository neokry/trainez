import React from "react";
import Stream from "../../components/stream";
import { StatusUpdateForm } from "react-activity-feed";
import Layout from "../../components/layout";
import { useAuth } from "../../hooks/useAuth";
import { useRequireAuth } from "../../hooks/useRequireAuth";

export default function Create() {
    const req = useRequireAuth();

    if (!req) {
        return <Loading />;
    }

    return (
        <Layout>
            <Stream>
                <StatusUpdateForm feedGroup="user" />
            </Stream>
        </Layout>
    );
}
