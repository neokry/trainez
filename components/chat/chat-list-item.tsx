import ProfilePicture from "../profilePicture";

interface User {
    id: string;
    data: {
        bio: string;
        name: string;
        url: string;
        userName: string;
        profileImage?: string;
    };
}

const ChatListItem = ({ user, preview }: { user: User; preview?: string }) => {
    return (
        <div className="flex items-center">
            <ProfilePicture
                profileImg={user.data.profileImage}
                displayName={user.data.name}
                size="md"
                isEditable={false}
            />
            <div className="ml-2">
                <div className="flex">
                    <div className="mr-2 font-semibold">
                        <p>{user.data.name}</p>
                    </div>
                    <p className="text-gray-600 font-light">
                        @{user.data.userName}
                    </p>
                </div>
                <p className="text-gray-600 text-xs font-light">{preview}</p>
            </div>
        </div>
    );
};

export default ChatListItem;
