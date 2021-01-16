import Pubnub from "../../../components/chat/pubnub";
import Layout from "../../../components/layout";
import Loading from "../../../components/loading";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import SubscriberList from "../../../components/chat/subscriber-list";

const Send: React.FC = () => {
    const req = useRequireAuth();

    if (!req) {
        return <Loading />;
    }

    return (
        <div className="h-screen overflow-hidden">
            <Layout>
                <Pubnub>
                    <div className="w-1/3 -mt-8">
                        <SubscriberList />
                    </div>
                </Pubnub>
            </Layout>
        </div>
    );
};

export default Send;
