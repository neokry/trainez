import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import Pubnub from "pubnub";
import { usePubNub } from "pubnub-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAuth } from "../../hooks/useAuth";
import usePNChannels from "../../hooks/usePNChannels";
import ChatListItem from "./chat-list-item";
const fetcher = (url, users) =>
    axios.post(url, { userIds: users }).then((x) => x.data);

const ChatList: React.FC = () => {
    const pubnub: Pubnub = usePubNub();
    const { getMessagePreviews } = usePNChannels();
    const auth = useAuth();
    const [users, setUsers] = useState<boolean | string[]>(false);
    const [previews, setPreviews] = useState<boolean | any[]>(false);
    const { data, error } = useSWR(
        users ? ["/api/stream/users/details", users] : null,
        fetcher,
        { refreshInterval: 0 }
    );

    useEffect(() => {
        const load = async () => {
            const res = await pubnub.objects.getMemberships({
                uuid: auth.user.uid,
            });

            console.log("Channel memberships", res);
            const usrs = res.data.map((data) => {
                const channel = data.channel.id;
                const mid = channel.length / 2; //get the middle of the String
                const user1 = channel.substring(0, mid);
                const user2 = channel.substring(mid);
                if (auth.user.uid !== user1) return user1;
                if (auth.user.uid !== user2) return user2;
            });

            setUsers(usrs);

            const prv = await getMessagePreviews(usrs);
            setPreviews(prv);
        };
        load();
    }, []);

    return (
        <div>
            <div className="p-5 border flex justify-between items-center">
                <div className="text-2xl text-gray-900">Messages</div>
                <Link href="/my/chats/send">
                    <a>
                        <FontAwesomeIcon
                            className="text-xl text-gray-700"
                            icon={faPlus}
                        />
                    </a>
                </Link>
            </div>
            <div className="pl-5 border-l border-r h-screen border-b">
                <div className="text-lg text-gray-600">Recent</div>
                {data &&
                    data.map((user) => {
                        const prv = previews as any[];
                        console.log("preview", prv);
                        const filter = prv.filter(
                            (x) => x.userId == user.id
                        )[0];
                        return (
                            <ChatListItem user={user} preview={filter?.text} />
                        );
                    })}
            </div>
        </div>
    );
};

export default ChatList;
