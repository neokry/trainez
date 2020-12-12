export default function ProfilePicture({
    profileImg,
    displayName,
    isSmall,
    isEditable,
}) {
    const initial = displayName.charAt(0);

    return (
        <div className="items-center flex justify-around ">
            {profileImg ? (
                <img
                    src={profileImg}
                    name="profileImage"
                    alt="profile image"
                    className={
                        isSmall
                            ? "rounded-full object-cover object-center  w-16 h-16"
                            : "rounded-full object-cover object-center  w-20 h-20"
                    }
                />
            ) : (
                <div
                    className={
                        isSmall
                            ? "border-2 rounded-full flex justify-around items-center bg-gray-400 w-16 h-16"
                            : "border-2 rounded-full flex justify-around items-center bg-gray-400 w-20 h-20"
                    }
                >
                    <p className="text-4xl font-bold text-gray-700">
                        {initial}
                    </p>
                </div>
            )}
            {isEditable && (
                <img
                    src="/camera.png"
                    className="text-white w-6 h-6 z-20 absolute"
                ></img>
            )}
        </div>
    );
}
