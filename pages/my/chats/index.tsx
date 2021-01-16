import Layout from "../../../components/layout";
import Loading from "../../../components/loading";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import React from "react";
import ChatList from "../../../components/chat/chat-list";
import Pubnub from "../../../components/chat/pubnub";

export default function Chats() {
    const req = useRequireAuth();

    if (!req) {
        return <Loading />;
    }

    return (
        <div className="h-screen overflow-hidden">
            <Layout>
                <Pubnub>
                    <div className="w-1/3 -mt-8">
                        <ChatList />
                    </div>
                </Pubnub>
            </Layout>
        </div>
    );
}
