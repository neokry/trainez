import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Signup({ showTitle }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const auth = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("email: " + email + " pass: " + password);
        if (isLogin) {
            auth.signin(email, password);
        } else {
            auth.signup(email, password);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full px-8 lg:w-1/2 text-center"
        >
            {showTitle && <h1 className="font-bold text-2xl">Train EZ</h1>}
            <div className="mt-10 flex flex-col">
                <input
                    className="bg-gray-200 py-2 px-5 rounded-md"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="userEmail"
                />
                <input
                    className="bg-gray-200 py-2 px-5 mt-2 rounded-md"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="userPassword"
                />
                {isLogin ? null : (
                    <input
                        className="bg-gray-200 py-2 px-5 mt-2 rounded-md"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="userName"
                    />
                )}
            </div>
            <button
                type="submit"
                className="rounded-md bg-green-500 text-white font-bold text-xl py-2 mt-5"
            >
                {isLogin ? "Login" : "Sign Up"}
            </button>
            <h3 className="mt-5">
                {isLogin
                    ? "Don't have an account yet?"
                    : "Already have an account?"}
            </h3>
            <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="my-2 text-blue-500"
            >
                {isLogin ? "Sign up for TrainEz.com" : "Login"}
            </button>
        </form>
    );
}
