import ProfilePicture from "../profilePicture";

export default function Message({ message }) {
    return (
        <div className="ml-2 mt-2">
            <div className="flex items-start">
                <div className="mb-4">
                    <ProfilePicture
                        profileImg={message.userData?.profileImage}
                        displayName={message.userData?.name}
                        size="sm"
                        isEditable={false}
                    />
                </div>
                <div className="ml-2">
                    <div className="bg-gray-200 p-2 px-3 mr-12 rounded-md">
                        {message.text}
                    </div>
                    <div
                        style={{ fontSize: "0.6rem" }}
                        className="text-gray-500 mt-1"
                    >
                        {message.time?.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
