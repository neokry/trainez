import { useRouter } from "next/router";
import Chat from "../../../../components/chat/chat";
import ChatList from "../../../../components/chat/chat-list";
import Pubnub from "../../../../components/chat/pubnub";
import Layout from "../../../../components/layout";
import Loading from "../../../../components/loading";
import { useRequireAuth } from "../../../../hooks/useRequireAuth";

const UserChat: React.FC = () => {
    const req = useRequireAuth();
    const router = useRouter();

    const { userid } = router.query;

    if (!req) {
        return <Loading />;
    }

    return (
        <div className="h-screen overflow-hidden">
            <Layout>
                <Pubnub>
                    <div className="-mt-8 flex">
                        <div className="w-1/3">
                            <ChatList />
                        </div>

                        <Chat userId={userid as string} />
                    </div>
                </Pubnub>
            </Layout>
        </div>
    );
};

export default UserChat;
