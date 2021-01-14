import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubscribeDetails } from "./subscribe-details";
import Signup from "../signup";

export const SignupScreen = ({ user, setShowSignIn }) => {
    const backClick = (e) => {
        e.preventDefault();
        setShowSignIn(false);
    };

    return (
        <div className="px-2 h-screen overflow-hidden">
            <div className="mt-4 flex items-center">
                <button onClick={backClick}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="mr-4 text-xl text-gray-800"
                    />
                </button>
                <h1 className="text-sm">LOGIN TO SUBSCRIBE</h1>
            </div>

            <div className="md:flex md:h-full pb-20 md:items-center">
                <div className="w-full md:w-1/2 md:flex md:justify-end md:mr-10 lg:mr-20">
                    <SubscribeDetails user={user} isSignup={true} />
                </div>

                <div className="w-full h-full md:w-1/2 md:flex md:justify-start">
                    <div className="flex flex-col lg:w-3/4 items-center justify-around">
                        <div className="w-full ">
                            <div className="h-1/2 hidden md:flex justify-center items-baseline">
                                <div>
                                    <h1 className="flex items-center justify-around text-5xl font-thin text-green-500">
                                        train ez
                                    </h1>
                                    <div className="text-sm font-thin">
                                        The easiest way to build a fitness
                                        community!
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <Signup showTitle={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
