import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Spinner from "./spinner";

export default function Signup({ showTitle }) {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            if (isLogin) {
                await auth.signin(data.email, data.password);
            } else {
                await auth.signup(data.email, data.password, data.name);
            }
        } catch (err) {
            switch (err.code) {
                case "auth/wrong-password":
                case "auth/user-not-found":
                    setError("Wrong email or password");
                    break;
                case "auth/email-already-in-use":
                    setError("This email is already registered");
                    break;
                default:
                    setError("An unexpected error has occured");
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col px-8 text-center"
        >
            {showTitle && (
                <>
                    <div className="flex items-center justify-around text-4xl md:text-5xl font-thin text-green-500">
                        <div>train ez</div>
                    </div>
                    <div className="text-sm font-thin">
                        The easiest way to build a fitness community!
                    </div>
                </>
            )}
            <div className="mt-10 md:mt-8 flex flex-col">
                <input
                    className="bg-gray-200 py-2 px-5 rounded-md"
                    placeholder="E-mail"
                    ref={register({
                        required: "The email field is required",
                    })}
                    name="email"
                    type="email"
                />
                <div className="flex items-start text-red-400">
                    <ErrorMessage errors={errors} name="email" />
                </div>

                <input
                    className="bg-gray-200 py-2 px-5 mt-4 rounded-md"
                    placeholder="Password"
                    type="password"
                    ref={register({
                        required: "The password field is required",
                    })}
                    name="password"
                />
                <div className="flex items-start text-red-400">
                    <ErrorMessage errors={errors} name="password" />
                </div>

                {!isLogin && (
                    <>
                        <input
                            className="bg-gray-200 py-2 px-5 mt-2 rounded-md"
                            placeholder="Name"
                            type="text"
                            ref={register({
                                required: "The name field is required",
                            })}
                            name="name"
                        />
                        <div className="flex items-start text-red-400">
                            <ErrorMessage errors={errors} name="name" />
                        </div>
                    </>
                )}
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <button
                type="submit"
                className="rounded-md bg-green-500 text-white font-bold text-xl py-2 mt-8"
            >
                <div className="flex justify-around">
                    <div className="flex items-center">
                        <p>{isLogin ? "Login" : "Sign Up"}</p>
                        {isLoading && (
                            <div className="ml-2">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
            </button>
            <h3 className="mt-5">
                {isLogin
                    ? "Don't have an account yet?"
                    : "Already have an account?"}
            </h3>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(!isLogin);
                }}
                className="my-2 text-blue-500"
            >
                {isLogin ? "Sign up for TrainEz.com" : "Login"}
            </button>
        </form>
    );
}
