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
import ProfilePicture from "../components/profilePicture";

export default function User() {
    const router = useRouter();
    const auth = useAuth();
    const fire = useFirebase();
    const stream = useStream();

    const [user, setUser] = useState(false);
    const [userId, setUserId] = useState(false);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSubscribeModal, setShowSubscribeModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const { username } = router.query;

    const subscribeClick = (e) => {
        e.preventDefault();
        if (!auth.user) setShowSignIn(true);
        else setShowSubscribeModal(true);
    };

    const subscribe = async (memberCode) => {
        const isValid = await fire.isMemberCodeValid(userId, memberCode);
        if (isValid) {
            const res = await stream.followUser(userId);
            if (res) {
                setShowSubscribeModal(false);
                setIsFollowing(true);
            }
        }
    };

    const backClick = (e) => {
        e.preventDefault();
        setShowSignIn(false);
    };

    const initPage = async (_username) => {
        try {
            const userIdResult = await fire.getUserIdFromName(_username);
            setUserId(userIdResult);

            const isFollowingResult = await stream.isFollowing(userIdResult);
            setIsFollowing(isFollowingResult);

            const userResult = await stream.getUser(userIdResult);
            setUser(userResult?.data);
        } catch (err) {
            console.log("Error loading page " + err);
        }
    };

    useEffect(() => {
        if (username) initPage(username);
    }, [username]);

    useEffect(() => {
        if (auth.user?.uid && userId && userId == auth.user?.uid)
            setIsCurrentUser(true);
    }, [auth.user, userId]);

    useEffect(() => {
        if (showSignIn) {
            setShowSignIn(false);
            setShowSubscribeModal(true);
        }
    }, [auth.user]);

    if (!user) return <Loading />;

    //Signup modal
    if (showSignIn)
        return (
            <div className="px-2">
                <div className="mt-4 flex items-center">
                    <button onClick={backClick}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="mr-4 text-xl text-gray-800"
                        />
                    </button>
                    <h1 className="text-sm">LOGIN TO SUBSCRIBE</h1>
                </div>

                <SubscribeDetails user={user} />

                <div className="w-full">
                    <Signup />
                </div>
            </div>
        );

    //Public profile
    return (
        <>
            {showSubscribeModal && (
                <SubscribeModal
                    user={user}
                    setShowSubscribeModal={setShowSubscribeModal}
                    subscribe={subscribe}
                />
            )}
            <Layout>
                <div className="md:w-3/4">
                    <div className="flex justify-between items-stretch">
                        <ProfilePicture
                            displayName={user.name}
                            profileImg={user.profileImage}
                            isSmall={false}
                        />
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
                        <p className="text-gray-500 text-md">
                            @{user.userName}
                        </p>
                        <p className="mt-5 text-lg">{user.bio}</p>
                        <p className="text-gray-500 mt-1 text-md">{user.url}</p>
                    </div>
                    <div className="border-t-2 mt-10">
                        {isFollowing || isCurrentUser ? (
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
                                            onClick={subscribeClick}
                                            className="bg-green-400 text-white px-5 py-2 rounded-full"
                                        >
                                            SUBSCRIBE TO SEE USERS POSTS
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    );
}

function SubscribeDetails({ user }) {
    return (
        <div className="flex flex-col items-center mt-10">
            <div className="flex justify-between items-stretch">
                <ProfilePicture
                    displayName={user.name}
                    profileImg={user.profileImage}
                    isSmall={false}
                />
            </div>
            <div className="mt-2">
                <p className="font-semibold text-2xl">{user.name}</p>
            </div>
            <div>
                <p className="text-gray-500 text-lg">@{user.userName}</p>
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
                    <p className="text-sm">Full access to exclusive content</p>
                </div>
                <div className="flex mt-2">
                    <FontAwesomeIcon
                        icon={faCheck}
                        className="text-xl text-green-400 mr-2"
                    />
                    <p className="text-sm">One on one breakout sessions</p>
                </div>
                <div className="flex mt-2">
                    <FontAwesomeIcon
                        icon={faCheck}
                        className="text-xl text-green-400 mr-2"
                    />
                    <p className="text-sm">Connect with group classes</p>
                </div>
            </div>
        </div>
    );
}

function SubscribeModal({ setShowSubscribeModal, user, subscribe }) {
    const [memberCode, setMemberCode] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (memberCode !== "") subscribe(memberCode);
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between rounded-t">
                            <button
                                type="button"
                                className="p-1 ml-auto bg-transparent border-0 fixed z-50 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowSubscribeModal(false);
                                }}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-3xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <SubscribeDetails user={user} />
                            <input
                                type="text"
                                placeholder="Member Code"
                                value={memberCode}
                                onChange={(e) => setMemberCode(e.target.value)}
                                className="border-gray-400 border-2 rounded-full w-full h-10 p-2 mt-8 outline-none focus:outline-none"
                            />
                            <div className="bg-green-500 rounded-full w-full h-10 mt-2 flex items-center justify-around text-white">
                                <button type="button" onClick={handleSubscribe}>
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
