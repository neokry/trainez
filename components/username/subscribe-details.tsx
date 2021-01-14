import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePicture from "../profilePicture";

export const SubscribeDetails = ({ user, isSignup }) => {
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
                    isEditable={false}
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
};
