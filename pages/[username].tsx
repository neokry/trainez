import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useAuth } from "../hooks/useAuth";
import { useFirebase } from "../hooks/useFirebase";
import { useStream } from "../hooks/useStream";
import Loading from "../components/loading";
import useMyStripe from "../hooks/useMyStripe";
import { SignupScreen } from "../components/username/signup-screen";
import { LinkNotification } from "../components/username/link-notification";
import { SubscribeModal } from "../components/username/subscribe-modal";
import { UserHeader } from "../components/username/user-header";
import { FeedTabs } from "../components/username/feed-tabs";
import { LockedUserFeed } from "../components/username/locked-user-feed";

export default function User() {
    const router = useRouter();
    const fire = useFirebase();
    const stream = useStream();
    const stripe = useMyStripe();
    const auth = useAuth();

    const [user, setUser] = useState<any>(false);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [hasPaymentMethods, setHasPaymentMethods] = useState(false);
    const [subPrice, setSubPrice] = useState<number | boolean>(false);

    const [showSignIn, setShowSignIn] = useState(false);
    const [showSubscribeModal, setShowSubscribeModal] = useState(false);
    const [showLinkNotification, setShowLinkNotification] = useState(false);

    const { username, payment } = router.query;

    useEffect(() => {
        const initPage = async () => {
            try {
                const userIdResult = await fire.getUserIdFromName(username);
                const isFollowingResult = await stream.isFollowing(
                    userIdResult
                );
                const userResult = await stream.getUser(userIdResult);
                const subPriceResult = await stripe.getSubscriptionPrice(
                    userIdResult
                );
                if (subPriceResult)
                    setSubPrice(subPriceResult?.unit_amount * 0.01);

                if (userIdResult == stream.currentUser?.id) {
                    setIsCurrentUser(true);
                }

                setIsFollowing(isFollowingResult);
                setUser({ ...userResult?.data, id: userResult.id });
            } catch (err) {
                console.log("Error loading page " + err);
            }
        };

        const reset = () => {
            setUser(false);
            setIsFollowing(false);
            setIsCurrentUser(false);
            setHasPaymentMethods(false);
            setSubPrice(false);
        };

        reset();
        if (username) initPage();
        if (payment) setShowSubscribeModal(true);
    }, [username]);

    //Show subscribe modal if user logs in
    useEffect(() => {
        const returnFromSignin = async () => {
            const result = await stripe.getPaymentMethods(
                stream.currentUser?.id
            );
            if (result) setHasPaymentMethods(result.data?.length ?? false);

            if (showSignIn && stream.currentUser?.id) {
                setShowSignIn(false);
                if (user?.id != stream.currentUser?.id)
                    setShowSubscribeModal(true);
                else setIsCurrentUser(true);
            }
        };

        if (stream.currentUser) returnFromSignin();
    }, [stream.currentUser]);

    useEffect(() => {
        if (user?.id == stream.currentUser?.id) {
            setIsCurrentUser(true);
        }
    }, [stream.currentUser, user]);

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
                    <div className="mt-4">
                        {isFollowing || isCurrentUser ? (
                            <FeedTabs userId={user.id} />
                        ) : (
                            <LockedUserFeed subscribeClick={subscribeClick} />
                        )}
                    </div>
                </div>
            </Layout>
        </>
    );
}
