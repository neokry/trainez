import { usePubNub } from "pubnub-react";
import { useEffect, useRef, useState } from "react";
import usePNChannels from "../../hooks/usePNChannels";
import { useStream } from "../../hooks/useStream";
import Message from "./message";
import MyMessage from "./my-message";

const Chat: React.FC<{ userId: string }> = ({ userId }) => {
    const pubnub = usePubNub();
    const stream = useStream();
    const { messages, handleMessage, sendMessage, channelName } = usePNChannels(
        userId
    );
    const [channels] = useState([channelName]);
    const [message, setMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const messagesEnd: React.MutableRefObject<HTMLDivElement> = useRef();

    useEffect(() => {
        if (messages.length > 0) {
            messagesEnd.current.scrollIntoView({
                behavior: "auto",
                block: "end",
            });
        }
        setLoaded(true);
    }, [messages]);

    useEffect(() => {
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
                    onKeyPress={async (e) => {
                        if (e.key !== "Enter") return;
                        await sendMessage(message);
                        setMessage("");
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="w-full flex justify-end mb-1 pr-2">
                    <button
                        className="py-2 px-4 rounded-full bg-blue-400 text-white"
                        onClick={async (e) => {
                            e.preventDefault();
                            await sendMessage(message);
                            setMessage("");
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
