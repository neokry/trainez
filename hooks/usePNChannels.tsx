import { usePubNub } from "pubnub-react";
import { useEffect, useState } from "react";
import { useStream } from "./useStream";

const usePNChannels = (userId?: string) => {
    const pubnub = usePubNub();
    const { currentUser } = useStream();
    const timeConversion = 10000;
    const [messages, setMessages] = useState([]);
    const [channelName, setChannelName] = useState("");
    const [isNewChannel, setIsNewChannel] = useState(false);

    useEffect(() => {
        if (userId) {
            const name = getChannelName(currentUser.id, userId);
            setChannelName(name);
        }
    }, [userId]);

    useEffect(() => {
        if (channelName) getMessages();
    }, [channelName]);

    const getChannelName = (user1: string, user2: string): string => {
        const comp = user1.localeCompare(user2);
        switch (comp) {
            case -1:
                return user1 + user2;
            case 1:
                return user2 + user1;
            default:
                throw new Error(
                    "Error getting channel name users are the same"
                );
        }
    };

    const getMessages = async () => {
        const events = await pubnub.fetchMessages({
            channels: [channelName],
            count: 10,
        });
        const channel = events.channels[channelName];
        if (channel) {
            const myMessages = channel.map((event) => processEvent(event));
            setMessages(myMessages);
        } else {
            setIsNewChannel(true);
        }
    };

    const getMessagePreviews = async (userIds: string[]) => {
        const channels = userIds.map((userId) =>
            getChannelName(currentUser.id, userId)
        );
        const get = await pubnub.fetchMessages({ channels, count: 1 });
        const res = [];
        for (let k in get.channels) {
            const msg = get.channels[k][0].message;
            res.push(msg);
        }
        return res;
    };

    const sendMessage = async (message) => {
        if (message) {
            await pubnub.publish({
                channel: channelName,
                message: {
                    text: message,
                    userData: currentUser.data,
                    userId: currentUser?.id,
                },
            });
            console.log("sent message");
            if (isNewChannel) {
                initNewChannel();
            }
        }
    };

    const initNewChannel = async () => {
        await pubnub.objects.setChannelMembers({
            channel: channelName,
            uuids: [currentUser.id, userId],
        });

        console.log("New channel setup");
    };

    const handleMessage = (event) => {
        setMessages((messages) => [...messages, processEvent(event)]);
    };

    const processEvent = (event) => {
        const time = event.timetoken / timeConversion;
        return { ...event.message, time: new Date(time) };
    };

    return {
        getChannelName,
        messages,
        handleMessage,
        sendMessage,
        channelName,
        getMessagePreviews,
    };
};

export default usePNChannels;
