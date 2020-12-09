import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import UserFeed from "../components/userFeed";
import { useAuth } from "../hooks/useAuth";
import { useFirebase } from "../hooks/useFirebase";
import { useStream } from "../hooks/useStream";

export default function User() {
    const router = useRouter();
    const auth = useAuth();
    const fire = useFirebase();
    const stream = useStream();
    const [user, setUser] = useState(false);
    const [userId, setUserId] = useState(false);
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    const { username } = router.query;

    useEffect(() => {
        fire.getUserIdFromName(username)
            .then((userId) => {
                if (userId == auth.user?.uid) setIsCurrentUser(true);
                setUserId(userId);
                return stream.getUser(userId);
            })
            .then((userData) => {
                setUser(userData?.data);
            });
    }, [username]);

    if (!user) {
        return <Layout></Layout>;
    } else {
        console.log(isCurrentUser);
        return (
            <Layout>
                <div className="flex justify-between items-stretch">
                    <div className="border-2 rounded-full w-24 h-24 flex justify-around items-center bg-gray-400">
                        <img
                            src={user.profileImage}
                            name="profileImage"
                            alt="profile image"
                            className="rounded-full"
                        />
                    </div>
                    <div>
                        {isCurrentUser ? (
                            <Link href="/my/settings/profile">
                                <a className="px-4 py-2 border-2 rounded-full text-green-400">
                                    Edit Profile
                                </a>
                            </Link>
                        ) : null}
                    </div>
                </div>
                <div className="mt-2">
                    <p className="font-bold text-xl">{user.name}</p>
                    <p className="text-gray-500 text-md">@{user.userName}</p>
                    <p className="mt-5 text-lg">{user.bio}</p>
                    <p className="text-gray-500 mt-1 text-md">{user.url}</p>
                </div>

                <div className="border-t-2 mt-10">
                    <UserFeed userId={userId}></UserFeed>
                </div>
            </Layout>
        );
    }
}
