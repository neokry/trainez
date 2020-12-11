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

export default function menu({ user }) {
    const auth = useAuth();

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
                className="fixed bg-white top-0 right-0 w-2/3 md:w-1/3 lg:w-1/4 h-full z-10 shadow flex justify-between"
            >
                <div className="mt-20 w-full px-4">
                    {user ? (
                        <div>
                            <div className="flex justify-between items-stretch">
                                <div className="border-2 rounded-full w-16 h-16 flex justify-around items-center bg-gray-400">
                                    <img
                                        src={user.profileImage}
                                        name="profileImage"
                                        alt="profile image"
                                        className="rounded-full"
                                    />
                                </div>
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
                            <div className="mt-5 border-t-2">
                                <Link href={"/" + user.userName}>
                                    <div className="flex items-center mt-2">
                                        <FontAwesomeIcon
                                            icon={faUserCircle}
                                            className="text-xl m-2"
                                        />
                                        <p className="text-sm">My Profile</p>
                                    </div>
                                </Link>
                                <Link href="/my/settings/profile">
                                    <div className="flex items-center mt-2">
                                        <FontAwesomeIcon
                                            icon={faCog}
                                            className="text-xl m-2"
                                        />
                                        <p className="text-sm">Settings</p>
                                    </div>
                                </Link>
                            </div>
                            {/* 
                                        <div className="mt-5 border-t-2">
                        <div className="flex items-center mt-2">
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
                        <div className="flex items-center mt-2">
                            <FontAwesomeIcon
                                icon={faUniversity}
                                className="text-xl m-2"
                            />
                            <p className="text-sm">
                                Add Bank{" "}
                                <span className="text-gray-500">(to earn)</span>
                            </p>
                        </div>
                    </div>
                    */}
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
