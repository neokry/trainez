import { useEffect, useState } from "react";

export default function ProfilePicture({
    profileImg,
    displayName,
    size,
    isEditable,
}) {
    const initial = displayName?.charAt(0);
    const [imgClass, setImgClass] = useState("");
    let [textClass, setTextClass] = useState("");

    useEffect(() => {
        switch (size) {
            case "sm":
                setImgClass(
                    "rounded-full object-cover object-center  w-10 h-10"
                );
                setTextClass(
                    "border-2 text-xl rounded-full flex justify-around items-center bg-gray-400 w-10 h-10"
                );
                break;
            case "md":
                setImgClass(
                    "rounded-full object-cover object-center  w-16 h-16"
                );
                setTextClass(
                    "border-2 text-3xl rounded-full flex justify-around items-center bg-gray-400 w-16 h-16"
                );
                break;
            case "lg":
                setImgClass(
                    "rounded-full object-cover object-center  w-20 h-20"
                );
                setTextClass(
                    "border-2 text-4xl rounded-full flex justify-around items-center bg-gray-400 w-20 h-20"
                );
                break;
        }
    }, []);

    return (
        <div className="items-center flex justify-around ">
            {profileImg ? (
                <img
                    src={profileImg}
                    name="profileImage"
                    alt="profile image"
                    className={imgClass}
                />
            ) : (
                <div className={textClass}>
                    <p className="font-bold text-gray-700">{initial}</p>
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
