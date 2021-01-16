import Link from "next/link";
import { useEffect, useState } from "react";
import ProfilePicture from "./profilePicture";

export default function UserCard({ user, onConfirm }) {
    const [lastOnline, setLastOnline] = useState(false);
    const minute = 60000;
    const hour = minute * 60;
    const day = hour * 24;

    useEffect(() => {
        if (user.lastOnline) {
            const now = new Date();
            const then = new Date(user.lastOnline);

            const diff = now.getTime() - then.getTime();

            if (diff < minute) setLastOnline("a few seconds");
            else if (diff < hour)
                setLastOnline(
                    `${Math.floor(diff / minute)} ${
                        diff / minute > 2 ? "minutes" : "minute"
                    }`
                );
            else if (diff < day)
                setLastOnline(
                    `${Math.floor(diff / hour)} ${
                        diff / hour > 2 ? "hours" : "hour"
                    }`
                );
            else
                setLastOnline(
                    `${Math.floor(diff / day)} ${
                        diff / day > 2 ? "days" : "day"
                    }`
                );
        }
    }, []);

    return (
        <div className="border border-gray-300 rounded-md p-5">
            <Link href={`/${user.userData.userName}`}>
                <div className="flex items-center cursor-pointer">
                    <div className="mr-2">
                        <ProfilePicture
                            displayName={user.userData.name}
                            profileImg={user.userData.profileImage}
                            size="lg"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-lg">
                            {user.userData.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                            @{user.userData.userName}
                        </p>
                        {user.lastOnline && (
                            <p className="text-sm text-gray-500">
                                Last seen {lastOnline} ago
                            </p>
                        )}
                    </div>
                </div>
            </Link>
            {onConfirm && (
                <div className="mt-5 flex items-center justify-around">
                    {user.status === "active" || user.status === null ? (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onConfirm(user);
                            }}
                            className="border border-green-500 text-green-500 px-5 py-2 rounded-full text-sm font-semibold outline-none focus:outline-none"
                        >
                            Subscribed For {user.price ?? "FREE"}{" "}
                            {user.price && "$ (PER MONTH)"}
                        </button>
                    ) : (
                        <div className="border border-gray-500 text-gray-500 px-5 py-2 rounded-full text-sm font-semibold outline-none focus:outline-none">
                            <p>UNSUBSCRIBED</p>
                        </div>
                    )}
                </div>
            )}
            <div className="mt-5 flex items-center justify-around">
                <Link href={`/my/chats/chat/${user.id}`}>
                    <button className="border border-green-500 text-green-500 px-10 py-2 rounded-full text-sm font-semibold outline-none focus:outline-none">
                        Send Message
                    </button>
                </Link>
            </div>
        </div>
    );
}
