import React from "react";
import Stream from "../../components/stream";
import { StatusUpdateForm } from "react-activity-feed";
import Layout from "../../components/layout";
import { useAuth } from "../../hooks/useAuth";

export default function Create() {
    return (
        <Layout>
            <Stream>
                <StatusUpdateForm feedGroup="timeline" />
            </Stream>
        </Layout>
    );
}
