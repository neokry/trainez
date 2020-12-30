import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import { useStream } from "../../../hooks/useStream";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import Loading from "../../../components/loading";
import ProfilePicture from "../../../components/profilePicture";
import { useFirebase } from "../../../hooks/useFirebase";
import { layer } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faShare,
    faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Spinner from "../../../components/spinner";

export default function Profile() {
    const stream = useStream();
    const fire = useFirebase();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        errors,
        watch,
    } = useForm();
    const [profileImg, setProfileImg] = useState(false);
    const [userName, setUserName] = useState("");
    const [memberCode, setMemberCode] = useState("");
    const [showCopiedText, setShowCopiedText] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const req = useRequireAuth();

    useEffect(() => {
        stream.getCurrentUser();
    }, []);

    useEffect(() => {
        if (stream.currentUser?.data !== null) {
            const user = stream.currentUser?.data;
            if (!user) return;
            reset(user);
            if (user?.name) setUserName(user.name);
            if (user?.profileImage) setProfileImg(user.profileImage);
            getMemberCode();
        }
    }, [stream.currentUser]);

    const getMemberCode = async () => {
        const code = await fire.getMemberCode(stream.currentUser.id);
        setMemberCode(code);
    };

    const validateUsername = async (username) => {
        return await fire.isUsernameAvailible(stream.currentUser.id, username);
    };

    const onSubmit = async (data) => {
        setIsloading(true);
        const result = await stream.updateUser(data);
        setIsSaved(result);
        setIsloading(false);
    };

    const onSubscriptionClick = (e) => {
        e.preventDefault();
        router.push("subscription");
    };

    const copyToClipboard = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(memberCode);
        setShowCopiedText(true);
    };

    const imgPreview = (e) => {
        const { profileImageFile } = getValues();
        var file = profileImageFile[0];

        console.log(file);

        var reader = new FileReader();
        reader.onloadend = () => {
            setProfileImg(reader.result);
        };
        reader.readAsDataURL(file);
    };

    if (!req) {
        return <Loading />;
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-b border-r border-l bg-white w-full md:w-1/2 p-4 -mt-6">
                    <div className="flex justify-between items-center text-2xl">
                        <h1 className="font-bold text-gray-700">
                            Edit Profile
                        </h1>
                        <button
                            type="submit"
                            className="w-20 p-2 text-sm bg-green-500 rounded-full text-white"
                        >
                            <div className="flex justify-around">
                                <div className="flex items-center">
                                    <p>Save</p>
                                    {isLoading && (
                                        <div className="ml-2">
                                            <Spinner />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>
                    </div>
                    {isSaved && (
                        <p className="text-md text-green-600">
                            Settings saved!
                        </p>
                    )}
                </div>
                <div className="w-full md:w-1/2 border-r border-l bg-gray-200">
                    <div className="bg-white px-2 pb-4">
                        <div className="pt-2">
                            <label className="flex items-left w-24 cursor-pointer">
                                <input
                                    type="file"
                                    className="invisible z-30 absolute"
                                    id="myFile"
                                    ref={register}
                                    onChange={imgPreview}
                                    name="profileImageFile"
                                />

                                <ProfilePicture
                                    displayName={userName}
                                    profileImg={profileImg}
                                    isSmall={false}
                                    isEditable={true}
                                />
                            </label>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600">Username</p>
                            <input
                                type="text"
                                className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                                placeholder="Username"
                                name="userName"
                                ref={register({
                                    validate: async (value) =>
                                        await validateUsername(value),
                                })}
                            ></input>
                            {errors.userName && (
                                <p className="text-red-400">
                                    Username is not availible.
                                </p>
                            )}
                            {!errors.userName && (
                                <>
                                    {(() => {
                                        const userName = watch(
                                            "userName",
                                            false
                                        );
                                        const url = window.location.origin;
                                        return (
                                            <p className="text-sm text-gray-500 ml-2">
                                                {url + "/" + userName}
                                            </p>
                                        );
                                    })()}
                                </>
                            )}
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600">Display name</p>
                            <input
                                type="text"
                                className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                                placeholder="DisplayName"
                                ref={register}
                                name="name"
                            ></input>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600">Bio</p>
                            <textarea
                                className="border-gray-400 border-2 rounded-md w-full h-20 p-2"
                                placeholder="Bio"
                                ref={register}
                                rows="2"
                                name="bio"
                            />
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600">Website URL</p>
                            <input
                                type="text"
                                className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                                placeholder="Website URL"
                                ref={register}
                                name="url"
                            ></input>
                        </div>
                    </div>
                    <div className="mt-4 pt-2 bg-white">
                        <p className="text-gray-600 px-2">Subscription</p>
                        <div className="border-gray-400 border-t border-b rounded-md w-full h-10 p-2 mt-2">
                            <button
                                className="text-gray-700 w-full"
                                onClick={onSubscriptionClick}
                            >
                                <div className="flex justify-between pr-3">
                                    <p>Subscription Pricing</p>
                                    <FontAwesomeIcon
                                        className="text-xl text-gray-500"
                                        icon={faChevronRight}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                    {memberCode && (
                        <div className="bg-white px-2">
                            <div className="mt-4 flex items-baseline">
                                <p className="mr-2 text-gray-600">
                                    Member Code:
                                </p>
                                <div className="mr-2">
                                    <label className="text-lg font-bold">
                                        {memberCode}
                                    </label>
                                </div>
                                <button
                                    className="mr-2"
                                    type="button"
                                    onClick={copyToClipboard}
                                >
                                    <FontAwesomeIcon icon={faShareSquare} />
                                </button>
                            </div>
                            {showCopiedText && (
                                <p className="text-md text-green-600">
                                    Copied member code to clipboard!
                                </p>
                            )}
                            <p className="text-gray-600 text-sm">
                                (For existing members already paying for a
                                subscription)
                            </p>
                        </div>
                    )}
                </div>
            </form>
        </Layout>
    );
}
