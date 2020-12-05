import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { connect } from "getstream";
import { useStream } from "../../../hooks/useStream";

export default function Profile() {
    const [stream, setStream] = useState(false);
    useEffect(() => {
        setStream(localStorage.getItem("stream"));
    });

    if (!stream) return <div>Loading..</div>;

    const client = connect("et996ub2qf5f", stream, "102445");

    client.currentUser
        .get()
        .catch((err) => {
            console.log("Error getting user");
        })
        .then((user) => {
            console.log(user);
        });

    const handleClick = (e) => {
        e.preventDefault();
        auth.signout();
    };

    const handleSubmit = (e) => {
        client.currentUser.update({
            name: "Patrick",
        });
        e.preventDefault();
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
                    ></input>
                </div>
                <div className="mt-4">
                    <p>Display name</p>
                    <input
                        type="text"
                        className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                        placeholder="Username"
                    ></input>
                </div>
                <div className="mt-4">
                    <p>Bio</p>
                    <input
                        type="text"
                        className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                        placeholder="Username"
                    ></input>
                </div>
                <div className="mt-4">
                    <p>Website URL</p>
                    <input
                        type="text"
                        className="border-gray-400 border-2 rounded-md w-full h-10 p-2"
                        placeholder="Username"
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
