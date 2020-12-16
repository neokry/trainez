import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function Signup({ showTitle }) {
    const [isLogin, setIsLogin] = useState(true);
    const { register, handleSubmit, errors } = useForm();
    const auth = useAuth();

    const onSubmit = (data) => {
        console.log(
            "email: " +
                data.email +
                " pass: " +
                data.password +
                " name: " +
                data.name
        );
        if (isLogin) {
            auth.signin(data.email, data.password);
        } else {
            auth.signup(data.email, data.password, data.name);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full px-8 lg:w-1/2 text-center"
        >
            {showTitle && <h1 className="font-bold text-2xl">Train EZ</h1>}
            <div className="mt-10 flex flex-col">
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
                    className="bg-gray-200 py-2 px-5 mt-2 rounded-md"
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
