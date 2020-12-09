import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import { useStream } from "../../../hooks/useStream";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";

export default function Profile() {
    const stream = useStream();
    const auth = useAuth();
    const { register, handleSubmit, reset, getValues, setValue } = useForm();
    const [profileImg, setProfileImg] = useState(false);

    useEffect(() => {
        stream.getCurrentUser();
    }, []);

    useEffect(() => {
        const user = stream.currentUser.data;
        reset(user);
        if (user?.profileImage) setProfileImg(user.profileImage);
    }, [stream.currentUser]);

    const onClick = (e) => {
        e.preventDefault();
        auth.signout();
    };

    const onSubmit = (data) => {
        stream.updateUser(data);
    };

    const imgPreview = (e) => {
        const { profileImageFile } = getValues();
        var file = profileImageFile[0];
        var reader = new FileReader();
        reader.onloadend = () => {
            setProfileImg(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Layout>
            <div>
                <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                    Edit Profile
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2">
                <label className="border-2 rounded-full w-20 h-20 flex justify-around items-center mt-4 bg-gray-400">
                    <input
                        type="file"
                        className="invisible z-30 absolute"
                        id="myFile"
                        ref={register}
                        onChange={imgPreview}
                        name="profileImageFile"
                    />

                    <img
                        src="/camera.png"
                        className="text-white w-5 h-5 z-20 absolute"
                    ></img>

                    {profileImg ? (
                        <img
                            src={profileImg}
                            name="profileImage"
                            alt="profile image"
                            className="rounded-full"
                        />
                    ) : (
                        <p className="text-4xl font-bold text-green-400 z-10 absolute">
                            PG
                        </p>
                    )}
                </label>
                <div className="mt-4">
                    <p>Username</p>
                    <input
                        type="text"
                        className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                        placeholder="Username"
                        name="userName"
                        ref={register}
                    ></input>
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

            <button onClick={onClick}>Sign Out</button>
        </Layout>
    );
}
