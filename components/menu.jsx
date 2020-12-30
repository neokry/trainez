import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
    faCog,
    faCreditCard,
    faUniversity,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import ProfilePicture from "./profilePicture";

export default function menu({ user, followingStats }) {
    const auth = useAuth();
    console.log("stats", followingStats);

    const signoutClick = (e) => {
        e.preventDefault();
        auth.signout();
    };

    return (
        <div>
            <motion.div
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                exit={{ x: "100vw" }}
                transition={{ ease: "easeOut", duration: 0.25 }}
                className="fixed bg-white top-0 right-0 w-2/3 md:w-1/3 lg:w-1/4 h-full z-30 shadow flex justify-between"
            >
                <div className="mt-20 w-full px-4">
                    {user ? (
                        <div>
                            <div className="flex justify-between items-stretch">
                                <ProfilePicture
                                    displayName={user.name}
                                    profileImg={user.profileImage}
                                    isSmall={true}
                                />
                                <div>
                                    <button className="text-2xl text-gray-500">
                                        X
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-md">{user.name}</p>
                                <p className="text-gray-500 text-sm">
                                    @{user.userName}
                                </p>
                            </div>
                            <div className="mt-2 flex text-sm">
                                <Link href="/my/subscribers">
                                    <button type="button" className="mr-1">
                                        {followingStats.followers} Fans
                                    </button>
                                </Link>
                                {" - "}
                                <Link href="/my/subscriptions">
                                    <button type="button" className="ml-1">
                                        {followingStats.following} Following
                                    </button>
                                </Link>
                            </div>
                            <div className="mt-5 border-t-2">
                                <Link href={"/" + user.userName}>
                                    <div className="flex items-center mt-2 cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faUserCircle}
                                            className="text-xl m-2"
                                        />
                                        <p className="text-sm">My Profile</p>
                                    </div>
                                </Link>
                                <Link href="/my/settings/profile">
                                    <div className="flex items-center mt-2 cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faCog}
                                            className="text-xl m-2"
                                        />
                                        <p className="text-sm">Edit Profile</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="mt-5 border-t-2">
                                <Link href="/my/payments">
                                    <div className="flex items-center mt-2 cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faCreditCard}
                                            className="text-xl m-2"
                                        />
                                        <p className="text-sm">
                                            Your Cards{" "}
                                            <span className="text-gray-500">
                                                (to subscribe)
                                            </span>
                                        </p>
                                    </div>
                                </Link>

                                <Link href="/my/payout">
                                    <div className="flex items-center mt-2 cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faUniversity}
                                            className="text-xl m-2"
                                        />
                                        <p className="text-sm">
                                            Add payout{" "}
                                            <span className="text-gray-500">
                                                (to earn)
                                            </span>
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className="mt-5 border-t-2">
                                <div className="flex items-center mt-2">
                                    <FontAwesomeIcon
                                        icon={faSignOutAlt}
                                        className="text-xl m-2"
                                    />
                                    <button
                                        onClick={signoutClick}
                                        className="text-sm"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="">
                                <div className="flex items-center mt-2">
                                    <FontAwesomeIcon
                                        icon={faSignOutAlt}
                                        className="text-xl m-2"
                                    />
                                    <button
                                        onClick={signoutClick}
                                        className="text-sm"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
