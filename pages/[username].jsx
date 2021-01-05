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
    faShareSquare,
    faCog,
    faLink,
    fas,
} from "@fortawesome/free-solid-svg-icons";
import Signup from "../components/signup";
import Loading from "../components/loading";
import ProfilePicture from "../components/profilePicture";
import { motion } from "framer-motion";
import useMyStripe from "../hooks/useMyStripe";
import Spinner from "../components/spinner";
import { mutate } from "swr";

export default function User() {
    const router = useRouter();
    const fire = useFirebase();
    const stream = useStream();
    const stripe = useMyStripe();
    const auth = useAuth();

    const [user, setUser] = useState(false);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSubscribeModal, setShowSubscribeModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showLinkNotification, setShowLinkNotification] = useState(false);
    const [hasPaymentMethods, setHasPaymentMethods] = useState(false);
    const [subPrice, setSubPrice] = useState(false);

    const { username, payment } = router.query;

    //Page Load
    useEffect(() => {
        if (username) initPage();
    }, [username]);

    useEffect(() => {
        if (payment) setShowSubscribeModal(true);
    }, [payment]);

    //Show subscribe modal if user logs in
    useEffect(() => {
        if (stream.currentUser) returnFromSignin();
    }, [stream.currentUser]);

    useEffect(() => {
        if (user?.id == stream.currentUser?.id) {
            setIsCurrentUser(true);
        }
    }, [stream.currentUser, user]);

    //Initilize page with user data
    const initPage = async () => {
        try {
            setUser(false);
            setIsFollowing(false);
            setIsCurrentUser(false);
            setHasPaymentMethods(false);
            setSubPrice(false);

            const userIdResult = await fire.getUserIdFromName(username);
            const isFollowingResult = await stream.isFollowing(userIdResult);
            const userResult = await stream.getUser(userIdResult);
            const subPriceResult = await stripe.getSubscriptionPrice(
                userIdResult
            );
            if (subPriceResult) setSubPrice(subPriceResult?.unit_amount * 0.01);

            if (userIdResult == stream.currentUser?.id) {
                setIsCurrentUser(true);
            }

            setIsFollowing(isFollowingResult);
            setUser({ ...userResult?.data, id: userResult.id });
        } catch (err) {
            console.log("Error loading page " + err);
        }
    };

    const returnFromSignin = async () => {
        const result = await stripe.getPaymentMethods(stream.currentUser?.id);
        if (result) setHasPaymentMethods(result.data?.length ?? false);

        if (showSignIn && stream.currentUser?.id) {
            setShowSignIn(false);
            if (user?.id != stream.currentUser?.id) setShowSubscribeModal(true);
            else setIsCurrentUser(true);
        }
    };

    const subscribeClick = (e) => {
        e.preventDefault();
        if (!auth.user) setShowSignIn(true);
        else setShowSubscribeModal(true);
    };

    if (!user) return <Loading />;
    else if (showSignIn)
        return <SignupScreen user={user} setShowSignIn={setShowSignIn} />;

    //Public profile
    return (
        <>
            {showLinkNotification && <LinkNotification />}
            {showSubscribeModal && (
                <SubscribeModal
                    user={user}
                    setShowSubscribeModal={setShowSubscribeModal}
                    setIsFollowing={setIsFollowing}
                    hasPaymentMethods={hasPaymentMethods}
                    subPrice={subPrice}
                />
            )}
            <Layout>
                <div className="md:w-3/4">
                    <UserHeader
                        user={user}
                        isCurrentUser={isCurrentUser}
                        setShowLinkNotification={setShowLinkNotification}
                        subPrice={subPrice}
                        subscribeClick={subscribeClick}
                        isFollowing={isFollowing}
                    />
                    <div className="border-t-2 mt-10">
                        {isFollowing || isCurrentUser ? (
                            <UserFeed userId={user.id}></UserFeed>
                        ) : (
                            <LockedUserFeed subscribeClick={subscribeClick} />
                        )}
                    </div>
                </div>
            </Layout>
        </>
    );
}

function UserHeader({
    user,
    isCurrentUser,
    setShowLinkNotification,
    subPrice,
    subscribeClick,
    isFollowing,
}) {
    const copyToClipboard = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        setShowLinkNotification(true);

        setTimeout(function () {
            setShowLinkNotification(false);
        }, 3000);
    };

    return (
        <>
            <div className="flex justify-between items-stretch">
                <ProfilePicture
                    displayName={user.name}
                    profileImg={user.profileImage}
                    isSmall={false}
                />
                <div>
                    <div className="flex items-center">
                        {isCurrentUser && (
                            <Link href="/my/settings/profile">
                                <div className="w-34 px-2 mr-2 h-12 cursor-pointer border-2 border-green-400 rounded-full text-green-400 flex items-center justify-around">
                                    <FontAwesomeIcon
                                        className="text-xl mr-3"
                                        icon={faCog}
                                    />
                                    <a className="mr-2">Edit Profile</a>
                                </div>
                            </Link>
                        )}
                        <button
                            onClick={copyToClipboard}
                            className="w-12 h-12 border-2 border-green-400 rounded-full text-green-400 text-xl"
                        >
                            <FontAwesomeIcon icon={faShareSquare} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <p className="font-bold text-xl">{user.name}</p>
                <p className="text-gray-500 text-md">@{user.userName}</p>
                <p className="mt-5 text-lg">{user.bio}</p>
                <a
                    href={"http://" + user.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex items-center mt-1"
                >
                    <FontAwesomeIcon className="text-gray-500 " icon={faLink} />
                    <p className="text-gray-500 ml-1 text-md">{user.url}</p>
                </a>
            </div>
            {!(isCurrentUser || isFollowing) && (
                <div className="mt-4 font-semibold border border-gray-400 rounded-md w-full h-24 p-4 py-2">
                    {subPrice ? (
                        <p>Subscription ${subPrice} per month</p>
                    ) : (
                        <p>Free Subscription</p>
                    )}
                    <div className="flex justify-around mt-2">
                        <button
                            type="button"
                            onClick={subscribeClick}
                            className="bg-green-400 text-white w-full px-5 py-2 text-sm rounded-full"
                        >
                            SUBSCRIBE FOR {subPrice ? `$${subPrice}` : "FREE"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

function LockedUserFeed({ subscribeClick }) {
    return (
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
                        className="bg-green-400 text-white px-5 py-2 text-sm rounded-full"
                    >
                        SUBSCRIBE TO SEE USERS POSTS
                    </button>
                </div>
            </div>
        </div>
    );
}

function SignupScreen({ user, setShowSignIn }) {
    const backClick = (e) => {
        e.preventDefault();
        setShowSignIn(false);
    };

    return (
        <div className="px-2 h-screen overflow-hidden">
            <div className="mt-4 flex items-center">
                <button onClick={backClick}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="mr-4 text-xl text-gray-800"
                    />
                </button>
                <h1 className="text-sm">LOGIN TO SUBSCRIBE</h1>
            </div>

            <div className="md:flex md:h-full pb-20 md:items-center">
                <div className="w-full md:w-1/2 md:flex md:justify-end md:mr-10 lg:mr-20">
                    <SubscribeDetails user={user} isSignup={true} />
                </div>

                <div className="w-full h-full md:w-1/2 md:flex md:justify-start">
                    <div className="flex flex-col lg:w-3/4 items-center justify-around">
                        <div className="w-full ">
                            <div className="h-1/2 hidden md:flex justify-center items-baseline">
                                <div>
                                    <h1 className="flex items-center justify-around text-5xl font-thin text-green-500">
                                        train ez
                                    </h1>
                                    <div className="text-sm font-thin">
                                        The easiest way to build a fitness
                                        community!
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <Signup />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SubscribeDetails({ user, isSignup }) {
    return (
        <div
            className={`flex flex-col items-center mt-10 ${
                isSignup &&
                "md:border-2 md:border-gray-200 md:rounded-lg md:py-20 md:px-10"
            }`}
        >
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

function SubscribeModal({
    setShowSubscribeModal,
    setIsFollowing,
    user,
    hasPaymentMethods,
    subPrice,
}) {
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
                            <SubscribeDetails user={user} isSignup={false} />
                            <SubscribeControl
                                setShowSubscribeModal={setShowSubscribeModal}
                                setIsFollowing={setIsFollowing}
                                user={user}
                                hasPaymentMethods={hasPaymentMethods}
                                subPrice={subPrice}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

function SubscribeControl({
    setShowSubscribeModal,
    setIsFollowing,
    user,
    hasPaymentMethods,
    subPrice,
}) {
    const fire = useFirebase();
    const stream = useStream();
    const stripe = useMyStripe();
    const userId = user.id;
    const [memberCode, setMemberCode] = useState("");
    const [useMemberCode, setUseMemberCode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const subscribeWithMemberCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const isValid = await fire.isMemberCodeValid(userId, memberCode);
        if (isValid) {
            const res = await stream.followUser(userId);
            if (res) {
                setShowSubscribeModal(false);
                setIsFollowing(true);
            }
        }
        setIsLoading(false);
        updateStats();
    };

    const subscribeWithStripe = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const sub = await stripe.addSubscription(
            userId,
            stream.currentUser?.id
        );
        if (sub?.status == "active") {
            const res = await stream.followUser(userId);
            if (res) {
                setShowSubscribeModal(false);
                setIsFollowing(true);
            }
        }
        setIsLoading(false);
        updateStats();
    };

    const subscribeFree = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await stream.followUser(userId);
        if (res) {
            setShowSubscribeModal(false);
            setIsFollowing(true);
        }
        setIsLoading(false);
        updateStats();
    };

    const updateStats = () => {
        mutate(
            `/api/stream/${stream.currentUser.id}/followStats`,
            fetch(
                `/api/stream/${stream.currentUser.id}/followStats`
            ).then((res) => res.json())
        );
    };

    const handleSwitch = (e) => {
        e.preventDefault();
        setUseMemberCode(!useMemberCode);
    };

    if (useMemberCode) {
        return (
            <>
                {" "}
                <input
                    type="text"
                    placeholder="Member Code"
                    value={memberCode}
                    onChange={(e) => setMemberCode(e.target.value)}
                    className="border-gray-400 border-2 rounded-full w-full h-10 p-2 mt-8 outline-none focus:outline-none"
                />
                <div className="bg-green-500 rounded-full w-full h-10 mt-2 flex items-center justify-around text-white">
                    <button
                        type="button"
                        className="outline-none focus:outline-none w-full h-full"
                        onClick={subscribeWithMemberCode}
                    >
                        <div className="flex justify-around">
                            <div className="flex items-center">
                                <p>Subscribe</p>
                                {isLoading && (
                                    <div className="ml-2">
                                        <Spinner />
                                    </div>
                                )}
                            </div>
                        </div>
                    </button>
                </div>
                <div className="flex justify-around">
                    <button
                        type="button"
                        className="text-sm text-green-500 mt-2"
                        onClick={handleSwitch}
                    >
                        I don't have a member code
                    </button>
                </div>
            </>
        );
    } else if (!subPrice) {
        return (
            <div className="bg-green-500 rounded-full w-full h-10 mt-8 flex items-center justify-around text-white text-xs">
                <button
                    type="button"
                    className="outline-none focus:outline-none w-full h-full"
                    onClick={subscribeFree}
                >
                    <div className="flex justify-around">
                        <div className="flex items-center">
                            <p>FOLLOW FOR FREE</p>
                            {isLoading && (
                                <div className="ml-2">
                                    <Spinner />
                                </div>
                            )}
                        </div>
                    </div>
                </button>
            </div>
        );
    } else if (subPrice && hasPaymentMethods) {
        return (
            <>
                <div className="bg-green-500 rounded-full w-full h-10 mt-8 flex items-center justify-around text-white text-xs">
                    <button
                        type="button"
                        className="outline-none focus:outline-none w-full"
                        onClick={subscribeWithStripe}
                    >
                        <div className="flex justify-around">
                            <div className="flex items-center">
                                <p>{`SUBSCRIBE FOR $${subPrice} (PER MONTH)`}</p>
                                {isLoading && (
                                    <div className="ml-2">
                                        <Spinner />
                                    </div>
                                )}
                            </div>
                        </div>
                    </button>
                </div>
                <div className="flex justify-around">
                    <button
                        type="button"
                        className="text-sm text-green-500 mt-2 outline-none focus:outline-none"
                        onClick={handleSwitch}
                    >
                        I'm already a subscriber
                    </button>
                </div>
            </>
        );
    } else {
        return (
            <>
                <Link href={`/my/payments?returnTo=${user.userName}`}>
                    <div className="border-green-500 bg-white border rounded-full w-full h-10 mt-8 flex items-center justify-around text-green-500">
                        <button type="button">PLEASE ADD A PAYMENT CARD</button>
                    </div>
                </Link>
                <div className="flex justify-around">
                    <button
                        type="button"
                        className="text-sm text-green-500 mt-2"
                        onClick={handleSwitch}
                    >
                        I'm already a subscriber
                    </button>
                </div>
            </>
        );
    }
}

function LinkNotification() {
    return (
        <motion.div
            initial={{ y: "100vw" }}
            animate={{ y: 0 }}
            exit={{ y: "100vw" }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            class="flex h-20 fixed items-end justify-around bottom-0 inset-x-0 z-40"
        >
            <div class="m-auto">
                <div class="bg-green-400 rounded-lg border-gray-300 border p-3 shadow-lg">
                    <div class="flex flex-row">
                        <div class="px-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 1792 1792"
                                fill="#FFFFFF"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
                            </svg>
                        </div>
                        <div class="ml-2 mr-6">
                            <span class="block text-white">
                                Link to profile was copied to clipboard
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
