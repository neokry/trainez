import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { mutate } from "swr";
import { useFirebase } from "../../hooks/useFirebase";
import useMyStripe from "../../hooks/useMyStripe";
import { useStream } from "../../hooks/useStream";
import useStreamNotifications from "../../hooks/useStreamNotifications";
import Spinner from "../spinner";

export const SubscribeControl = ({
    setShowSubscribeModal,
    setIsFollowing,
    user,
    hasPaymentMethods,
    subPrice,
}) => {
    const fire = useFirebase();
    const stream = useStream();
    const notification = useStreamNotifications();
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
            follow();
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
            follow();
        }
        setIsLoading(false);
        updateStats();
    };

    const subscribeFree = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        follow();
        setIsLoading(false);
        updateStats();
    };

    const follow = async () => {
        const res = await axios.post("/api/stream/users/follow", {
            currentUserId: stream.currentUser.id,
            followingUserId: userId,
        });
        if (res) {
            setShowSubscribeModal(false);
            setIsFollowing(true);
        }
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
};
