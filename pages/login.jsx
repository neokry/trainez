import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Signup from "../components/signup";
import { useStream } from "../hooks/useStream";

export default function Login() {
    const stream = useStream();
    const router = useRouter();

    useEffect(() => {
        if (stream.currentUser) {
            router.push("/");
        }
    }, [stream.currentUser]);

    return (
        <div className="md:flex md:justify-start">
            <div className="mt-24 md:mt-0 md:w-1/2 flex justify-around">
                <div className="h-40 w-40 md:h-screen md:w-full relative">
                    <Image
                        src="/landingImage.jpg"
                        alt="landing image"
                        layout="fill"
                        objectFit="cover"
                        className="object-top object-cover rounded-full md:rounded-md"
                        loading="eager"
                        priority="true"
                    />
                </div>
            </div>
            <div className="md:mt-24 md:w-1/2 flex justify-around">
                <div className="w-full md:w-5/6 lg:w-2/3 xl:w-1/2">
                    <Signup showTitle={true} />
                </div>
            </div>
        </div>
    );
}
