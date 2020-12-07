import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { connect } from "getstream";
import { useStream } from "../../../hooks/useStream";

export default function Profile() {
    const stream = useStream();
    stream.getUser();

    const [userName, setUserName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        const user = stream.user.data;
        console.log(user);
        if (user?.userName) setUserName(user.userName);
        if (user?.name) setDisplayName(user.name);
        if (user?.bio) setBio(user.bio);
        if (user?.url) setUrl(user.url);
    }, stream.user.data);

    const handleClick = (e) => {
        e.preventDefault();
        auth.signout();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        stream.updateUser({
            userName: userName,
            name: displayName,
            bio: bio,
            url: url,
        });
    };

    return (
        <Layout>
            <div>
                <h1 className="font-bold border-b-2 text-2xl text-gray-700">
                    Edit Profile
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <label className="border-2 rounded-full w-20 h-20 flex justify-around items-center mt-4 bg-gray-400">
                    <input
                        type="file"
                        className="invisible z-30 absolute"
                        id="myFile"
                    />
                    <FontAwesomeIcon
                        icon={faCamera}
                        className="text-white z-20 absolute"
                    ></FontAwesomeIcon>
                    <p className="text-4xl font-bold text-green-400 z-10 absolute">
                        PG
                    </p>
                </label>
                <div className="mt-4">
                    <p>Username</p>
                    <input
                        type="text"
                        className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    ></input>
                </div>
                <div className="mt-4">
                    <p>Display name</p>
                    <input
                        type="text"
                        className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                        placeholder="Username"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    ></input>
                </div>
                <div className="mt-4">
                    <p>Bio</p>
                    <input
                        type="text"
                        className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    ></input>
                </div>
                <div className="mt-4">
                    <p>Website URL</p>
                    <input
                        type="text"
                        className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                        placeholder="Website URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    ></input>
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-green-500 rounded-md text-white shadow-sm mt-4"
                >
                    Save
                </button>
            </form>

            <button onClick={handleClick}>Sign Out</button>
        </Layout>
    );
}
