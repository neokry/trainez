import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import UserFeed from "../components/userFeed";
import { useAuth } from "../hooks/useAuth";
import { useFirebase } from "../hooks/useFirebase";
import { useStream } from "../hooks/useStream";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLock,
    faArrowLeft,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Signup from "../components/signup";
import Loading from "../components/loading";

export default function User() {
    const router = useRouter();
    const auth = useAuth();
    const fire = useFirebase();
    const stream = useStream();
    const [user, setUser] = useState(false);
    const [userId, setUserId] = useState(false);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const { username } = router.query;

    const signInClick = (e) => {
        e.preventDefault();
        setShowSignIn(true);
    };

    useEffect(() => {
        fire.getUserIdFromName(username)
            .then((userId) => {
                if (auth.user?.uid && userId == auth.user?.uid)
                    setIsCurrentUser(true);
                setUserId(userId);
                console.log("getting stream user");
                return stream.getUser(userId);
            })
            .then((userData) => {
                console.log("found stream user " + JSON.stringify(userData));
                setUser(userData?.data);
            });
    }, [username]);

    if (!user) return <Loading />;

    //Signup modal
    if (showSignIn)
        return (
            <div class="px-4">
                <div className="mt-4 flex items-center">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="mr-4 text-xl text-gray-800"
                    />
                    <h1 className="text-sm">LOGIN TO FOLLOW</h1>
                </div>

                <div className="flex flex-col items-center mt-10">
                    <div className="flex justify-between items-stretch">
                        <div className="border-2 rounded-full w-24 h-24 flex justify-around items-center bg-gray-400">
                            <img
                                src={user.profileImage}
                                name="profileImage"
                                alt="profile image"
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className="font-semibold text-2xl">{user.name}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-lg">
                            @{user.userName}
                        </p>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-500 font-light text-xl">
                            SUBSCRIPTION BENIFITS
                        </p>
                    </div>
                    <div className="flex flex-col items-start w-full px-8">
                        <div className="flex mt-2">
                            <FontAwesomeIcon
                                icon={faCheck}
                                className="text-xl text-green-400 mr-2"
                            />
                            <p className="text-sm">
                                Full access to exclusive content
                            </p>
                        </div>
                        <div className="flex mt-2">
                            <FontAwesomeIcon
                                icon={faCheck}
                                className="text-xl text-green-400 mr-2"
                            />
                            <p className="text-sm">
                                Direct messaging with this user
                            </p>
                        </div>
                        <div className="flex mt-2">
                            <FontAwesomeIcon
                                icon={faCheck}
                                className="text-xl text-green-400 mr-2"
                            />
                            <p className="text-sm">
                                Cancel your subscription at any time
                            </p>
                        </div>
                    </div>
                    <div className="w-full">
                        <Signup />
                    </div>
                </div>
            </div>
        );

    //Public profile
    return (
        <Layout>
            <div className="md:w-3/4">
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
                                <a className="px-4 py-2 border-2 border-green-400 rounded-full text-green-400">
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
                    {isFollowing ? (
                        <UserFeed userId={userId}></UserFeed>
                    ) : (
                        <div className="mt-10 bg-gray-200 w-full h-64 rounded-lg flex justify-around items-center">
                            <div className="mt-10 flex flex-col">
                                <div className="flex justify-around items-center">
                                    {" "}
                                    <FontAwesomeIcon
                                        className="text-4xl text-gray-400 "
                                        icon={faLock}
                                    />
                                </div>
                                <div className="flex justify-around mt-10">
                                    <button
                                        type="button"
                                        onClick={signInClick}
                                        className="bg-green-400 text-white px-5 py-2 rounded-full"
                                    >
                                        FOLLOW TO SEE USERS POSTS
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
