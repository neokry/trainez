import Layout from "../../components/layout";
import Loading from "../../components/loading";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import React, { useState, useEffect, useRef } from "react";
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react";
import { useAuth } from "../../hooks/useAuth";
import { useStream } from "../../hooks/useStream";
import ProfilePicture from "../../components/profilePicture";

export default function Chats() {
    const req = useRequireAuth();
    const auth = useAuth();

    if (!req) {
        return <Loading />;
    }

    console.log("pub", {
        publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH,
        subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE,
        uuid: auth.user.uid,
    });

    const pubnub = new PubNub({
        publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH,
        subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE,
        uuid: auth.user.uid,
    });

    return (
        <div className="h-screen overflow-hidden">
            <Layout>
                <PubNubProvider client={pubnub}>
                    <Chat />
                </PubNubProvider>
            </Layout>
        </div>
    );
}

function Chat() {
    const pubnub = usePubNub();
    const stream = useStream();
    const [channels] = useState(["awesome-channel"]);
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const timeConversion = 10000;
    const messagesEnd: React.MutableRefObject<HTMLDivElement> = useRef();

    const processEvent = (event) => {
        const time = event.timetoken / timeConversion;
        return { ...event.message, time: new Date(time) };
    };

    const handleMessage = (event) => {
        addMessage((messages) => [...messages, processEvent(event)]);
    };

    const sendMessage = async (message) => {
        if (message) {
            try {
                await pubnub.publish({
                    channel: channels[0],
                    message: {
                        text: message,
                        userData: stream.currentUser?.data,
                        userId: stream.currentUser?.id,
                    },
                });
                setMessage("");
            } catch (err) {
                console.log("Error sending message", err);
            }
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            messagesEnd.current.scrollIntoView({
                behavior: "auto",
                block: "end",
            });
            setLoaded(true);
        }
    }, [messages]);

    useEffect(() => {
        const load = async () => {
            const events = await pubnub.fetchMessages({
                channels: ["awesome-channel"],
                count: 10,
            });
            console.log("message", events.channels["awesome-channel"]);
            const myMessages = events.channels["awesome-channel"].map((event) =>
                processEvent(event)
            );
            addMessage(myMessages);
        };

        load();

        pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels });
    }, [pubnub, channels]);

    return (
        <div
            className={`flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen ${
                !loaded && "invisible"
            }`}
        >
            <div className="w-full bg-white∂">
                <h1 className="font-bold border-b-2 text-2xl bg-white text-gray-700">
                    Messages
                </h1>
            </div>
            <div className="flex flex-col space-y-4 p-3 items-baseline h-full w-full overflow-y-auto">
                {messages.map((message, index) => {
                    return (
                        <div key={`message-${index}`} className="w-full">
                            {message.userId === stream.currentUser.id ? (
                                <MyMessage message={message} />
                            ) : (
                                <Message message={message} />
                            )}
                        </div>
                    );
                })}
                <div
                    style={{ float: "left", clear: "both" }}
                    ref={messagesEnd}
                ></div>
            </div>
            <div className="flex flex-col border-t border-gray-400 w-full mb-24">
                <input
                    type="text"
                    placeholder="Type a message"
                    className="p-3 focus:outline-none"
                    value={message}
                    onKeyPress={(e) => {
                        if (e.key !== "Enter") return;
                        sendMessage(message);
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="w-full flex justify-end mb-1 pr-2">
                    <button
                        className="py-2 px-4 rounded-full bg-blue-400 text-white"
                        onClick={(e) => {
                            e.preventDefault();
                            sendMessage(message);
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

function Message({ message }) {
    return (
        <div className="ml-2 mt-2">
            <div className="flex items-start">
                <div className="mb-4">
                    <ProfilePicture
                        profileImg={message.userData?.profileImage}
                        displayName={message.userData?.name}
                        size="sm"
                        isEditable={false}
                    />
                </div>
                <div className="ml-2">
                    <div className="bg-gray-200 p-2 px-3 mr-12 rounded-md">
                        {message.text}
                    </div>
                    <div
                        style={{ fontSize: "0.6rem" }}
                        className="text-gray-500 mt-1"
                    >
                        {message.time?.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MyMessage({ message }) {
    return (
        <div className="ml-2 mt-2 w-full">
            <div className="flex flex-col items-end">
                <div className="ml-2">
                    <div className="bg-blue-400 p-2 px-3 mr-4 ml-12 rounded-md text-white">
                        {message.text}
                    </div>
                </div>
                <div
                    style={{ fontSize: "0.6rem" }}
                    className="text-gray-500 mt-1 mr-4"
                >
                    {message.time?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </div>
        </div>
    );
}
