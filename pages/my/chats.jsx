import React from "react";
import Layout from "../../components/layout";
import Loading from "../../components/loading";
import { useRequireAuth } from "../../hooks/useRequireAuth";

export default function Chats() {
    const req = useRequireAuth();

    if (!req) {
        return <Loading />;
    }

    return (
        <Layout>
            <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                Messages
            </h1>
            <p>Coming Soon...</p>
        </Layout>
    );
}
