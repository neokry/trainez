import Image from "next/image";
import Signup from "../components/signup";

export default function SignInPage() {
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
