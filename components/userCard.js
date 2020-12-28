import ProfilePicture from "./profilePicture";

export default function UserCard({ user, onConfirm }) {
    return (
        <div className="border border-gray-300 rounded-md p-5">
            <div className="flex items-center">
                <div className="mr-2">
                    <ProfilePicture
                        displayName={user.name}
                        profileImg={user.profileImage}
                        isSmall={false}
                    />
                </div>
                <div className="flex flex-col">
                    <p className="font-semibold text-lg">{user.name}</p>
                    <p className="text-gray-600 text-sm">@{user.userName}</p>
                </div>
            </div>
            <div className="mt-5 flex items-center justify-around">
                {user.status === "active" ? (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm(user);
                        }}
                        className="border border-green-500 text-green-500 px-5 py-2 rounded-full text-md font-semibold outline-none focus:outline-none"
                    >
                        Subscribed For {user.price ?? "FREE"}{" "}
                        {user.price && "$ (PER MONTH)"}
                    </button>
                ) : (
                    <div className="border border-gray-500 text-gray-500 px-5 py-2 rounded-full text-md font-semibold outline-none focus:outline-none">
                        <p>UNSUBSCRIBED</p>
                    </div>
                )}
            </div>
        </div>
    );
}
