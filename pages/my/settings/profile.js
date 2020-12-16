import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import { useStream } from "../../../hooks/useStream";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import Loading from "../../../components/loading";
import ProfilePicture from "../../../components/profilePicture";
import { useFirebase } from "../../../hooks/useFirebase";

export default function Profile() {
    const stream = useStream();
    const fire = useFirebase();
    const { register, handleSubmit, reset, getValues, errors } = useForm();
    const [profileImg, setProfileImg] = useState(false);
    const [userName, setUserName] = useState("");
    const req = useRequireAuth();

    useEffect(() => {
        stream.getCurrentUser();
    }, []);

    useEffect(() => {
        if (stream.currentUser?.data !== null) {
            const user = stream.currentUser?.data;
            reset(user);
            if (user?.name) setUserName(user.name);
            if (user?.profileImage) setProfileImg(user.profileImage);
        }
    }, [stream.currentUser]);

    const validateUsername = async (username) => {
        console.log(stream.currentUser.id);
        return await fire.isUsernameAvailible(stream.currentUser.id, username);
    };

    const onSubmit = (data) => {
        stream.updateUser(data);
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
            <div>
                <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                    Edit Profile
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2">
                <label className="flex items-left w-24 mt-4">
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
                <div className="mt-4">
                    <p>Username</p>
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
                </div>
                <div className="mt-4">
                    <p>Display name</p>
                    <input
                        type="text"
                        className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                        placeholder="DisplayName"
                        ref={register}
                        name="name"
                    ></input>
                </div>
                <div className="mt-4">
                    <p>Bio</p>
                    <textarea
                        className="border-gray-400 border-2 rounded-md w-full h-20 p-2"
                        placeholder="Bio"
                        ref={register}
                        rows="2"
                        name="bio"
                    />
                </div>
                <div className="mt-4">
                    <p>Website URL</p>
                    <input
                        type="text"
                        className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                        placeholder="Website URL"
                        ref={register}
                        name="url"
                    ></input>
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-green-500 rounded-md text-white shadow-sm mt-4"
                >
                    Save
                </button>
            </form>
        </Layout>
    );
}
