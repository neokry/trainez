import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LockedUserFeed = ({ subscribeClick }) => {
    return (
        <div className="mt-10 bg-gray-200 w-full h-64 rounded-lg flex justify-around items-center">
            <div className="mt-10 flex flex-col">
                <div className="flex justify-around items-center">
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
};
