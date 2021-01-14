import {
    faCog,
    faLink,
    faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ProfilePicture from "../profilePicture";

export const UserHeader = ({
    user,
    isCurrentUser,
    setShowLinkNotification,
    subPrice,
    subscribeClick,
    isFollowing,
}) => {
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
                    isEditable={false}
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
};
