import Link from "next/link";

export default function LandingPage() {
    return (
        <div>
            <div className="w-full px-4 py-5 mx-auto md:px-24 lg:px-8 bg-gray-200">
                <div className="relative flex items-center justify-between max-w-6xl mx-auto">
                    <div className="flex items-center">
                        <a
                            href="/"
                            aria-label="Company"
                            title="Company"
                            className="inline-flex items-center mr-8"
                        >
                            <div className="text-2xl font-thin text-black">
                                <div>train ez</div>
                            </div>
                        </a>
                        <ul className="flex items-center hidden space-x-8 lg:flex">
                            <li></li>
                            <li>
                                <a
                                    href="/"
                                    aria-label="Our product"
                                    title="Our product"
                                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-gray-900"
                                >
                                    Trainers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    aria-label="Product pricing"
                                    title="Product pricing"
                                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-gray-900"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    aria-label="Our product"
                                    title="Our product"
                                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-gray-900"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    aria-label="About us"
                                    title="About us"
                                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-gray-900"
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <ul className="flex items-center hidden space-x-8 lg:flex">
                        <li>
                            <Link href="/login">
                                <a
                                    aria-label="Sign in"
                                    title="Sign in"
                                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-gray-900"
                                >
                                    Login
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/login">
                                <a
                                    aria-label="Sign up"
                                    title="Sign up"
                                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-700 hover:bg-green-700 focus:shadow-outline focus:outline-none"
                                >
                                    Signup
                                </a>
                            </Link>
                        </li>
                    </ul>
                    <div className="lg:hidden">
                        <button
                            aria-label="Open Menu"
                            title="Open Menu"
                            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="w-5 text-gray-600"
                            >
                                <path
                                    fill="currentColor"
                                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                                ></path>
                                <path
                                    fill="currentColor"
                                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                                ></path>
                                <path
                                    fill="currentColor"
                                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full px-4 mx-auto lg:pt-16 md:px-8 bg-gray-200">
                <div className="flex flex-col justify-between max-w-6xl mx-auto lg:flex-row">
                    <div className="pt-16 mb-16 lg:mb-0 lg:pt-32 lg:max-w-lg lg:pr-5">
                        <div className="max-w-xl mb-6">
                            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                                The easiest way for trainers to build a
                                community.
                            </h2>
                            <p className="text-base text-gray-700 md:text-lg">
                                Simply post your exclusive content and make
                                money from subscriptions or generate new leads.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Link href="/login">
                                <a
                                    className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-700 hover:bg-green-700 focus:shadow-outline focus:outline-none"
                                    draggable="false"
                                >
                                    Try it free today!
                                </a>
                            </Link>
                            <a
                                href="/"
                                aria-label=""
                                className="inline-flex items-center font-semibold transition-colors duration-200 text-gray-700 hover:text-gray-700"
                                draggable="false"
                            >
                                Learn more
                            </a>
                        </div>
                    </div>
                    <div>
                        <img
                            src="/phoneMock.png"
                            alt=""
                            className="object-cover object-top w-full h-64 mx-auto lg:h-auto xl:mr-24 md:max-w-sm"
                            draggable="false"
                        />
                    </div>
                </div>
            </div>
            <div className="px-4 py-16 mx-auto w-full md:px-24 lg:px-8 lg:py-20 bg-white">
                <div className="grid gap-10 lg:grid-cols-2 max-w-6xl mx-auto">
                    <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100">
                            <svg
                                viewBox="0 0 24 24"
                                className="text-green-600 w-7 h-7"
                            >
                                <polyline
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeMiterlimit="10"
                                    points=" 8,5 8,1 16,1 16,5"
                                    strokeLinejoin="round"
                                ></polyline>
                                <polyline
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeMiterlimit="10"
                                    points="9,15 1,15 1,5 23,5 23,15 15,15"
                                    strokeLinejoin="round"
                                ></polyline>
                                <polyline
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeMiterlimit="10"
                                    points="22,18 22,23 2,23 2,18"
                                    strokeLinejoin="round"
                                ></polyline>
                                <rect
                                    x="9"
                                    y="13"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeMiterlimit="10"
                                    width="6"
                                    height="4"
                                    strokeLinejoin="round"
                                ></rect>
                            </svg>
                        </div>
                        <div className="max-w-xl mb-6">
                            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                                Training Simplified
                            </h2>
                            <p className="text-base text-gray-700 md:text-lg">
                                You have amazing content. Your students love it.
                                But, you don’t want to lose the people who
                                aren’t ready to commit. With TrainEZ you can
                                create a page for your premium training and make
                                money with an auto-renewing subscription or
                                drive leads into your sales funnel by offering a
                                free trial. We handle all of the billing and
                                customer service, so you can focus on making
                                great content that makes more money!
                            </p>
                        </div>
                        <div>
                            <Link href="/login">
                                <a
                                    aria-label=""
                                    className="inline-flex items-center font-semibold transition-colors duration-200 text-green-600 hover:text-green-600"
                                >
                                    Sign up today for Free!
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 12 12"
                                        className="inline-block w-3 ml-2"
                                    >
                                        <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path>
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center -mx-4 lg:pl-8">
                        <div className="flex flex-col items-end px-3">
                            <img
                                src="/workout1.jpg"
                                alt=""
                                className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                            />
                            <img
                                src="/workout2.jpg"
                                alt=""
                                className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                            />
                        </div>
                        <div className="px-3">
                            <img
                                src="/workout3.jpg"
                                alt=""
                                className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 py-16 mx-auto bg-white w-full md:px-24 lg:px-8 lg:py-20">
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-xl md:mb-12">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        No Contracts, No Coding.
                    </h2>
                    <p className="text-base text-gray-700 md:text-lg">
                        Easily build a training site that looks professional and
                        works for you.
                    </p>
                </div>
                <div className="grid max-w-5xl gap-8 row-gap-10 mx-auto lg:grid-cols-2">
                    <div className="max-w-md sm:mx-auto sm:text-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 sm:mx-auto sm:w-24 sm:h-24">
                            <svg
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                                className="w-12 h-12 text-green-600 sm:w-16 sm:h-16"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                ></polygon>
                            </svg>
                        </div>
                        <h6 className="mb-3 text-xl font-bold leading-5 text-gray-900">
                            Beginner Friendly Training Platform.
                        </h6>
                        <p className="mb-3 text-sm text-gray-700">
                            Our platform is easy to use, requires no coding or
                            developer skills and doesn't require any maintenance
                            from you once built. Just post your content then sit
                            back and watch the leads roll in!
                        </p>
                        <a
                            href="/"
                            aria-label=""
                            className="inline-flex items-center font-semibold text-green-600 transition-colors duration-200 hover:text-green-600"
                        >
                            Learn more
                        </a>
                    </div>
                    <div className="max-w-md sm:mx-auto sm:text-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 sm:mx-auto sm:w-24 sm:h-24">
                            <svg
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                                className="w-12 h-12 text-green-600 sm:w-16 sm:h-16"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                ></polygon>
                            </svg>
                        </div>
                        <h6 className="mb-3 text-xl font-bold leading-5 text-gray-900">
                            Post Your Exclusive Content.
                        </h6>
                        <p className="mb-3 text-sm text-gray-700">
                            Training materials are difficult to make, but
                            they're also valuable assets that can be sold over
                            and over again on our platform or posted as an
                            online course with monthly subscription fees or
                            single-purchase products like ebooks or video
                            downloads.
                        </p>
                        <a
                            href="/"
                            aria-label=""
                            className="inline-flex items-center font-semibold text-green-600 transition-colors duration-200 hover:text-green-600"
                        >
                            Learn more
                        </a>
                    </div>
                </div>
                <div className="grid max-w-5xl gap-8 row-gap-10 mx-auto lg:grid-cols-2 mt-16">
                    <div className="max-w-md sm:mx-auto sm:text-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 sm:mx-auto sm:w-24 sm:h-24">
                            <svg
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                                className="w-12 h-12 text-green-600 sm:w-16 sm:h-16"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                ></polygon>
                            </svg>
                        </div>
                        <h6 className="mb-3 text-xl font-bold leading-5 text-gray-900">
                            Connect With Your Biggest Fans.
                        </h6>
                        <p className="mb-3 text-sm text-gray-700">
                            A private community lets you find out who your
                            biggest supporters are so you can focus your time
                            and energy on them. Get feedback and find out how to
                            improve your content.
                        </p>
                        <a
                            href="/"
                            aria-label=""
                            className="inline-flex items-center font-semibold text-green-600 transition-colors duration-200 hover:text-green-600"
                        >
                            Learn more
                        </a>
                    </div>
                    <div className="max-w-md sm:mx-auto sm:text-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 sm:mx-auto sm:w-24 sm:h-24">
                            <svg
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                                className="w-12 h-12 text-green-600 sm:w-16 sm:h-16"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                ></polygon>
                            </svg>
                        </div>
                        <h6 className="mb-3 text-xl font-bold leading-5 text-gray-900">
                            Stop Worrying About Payments
                        </h6>
                        <p className="mb-3 text-sm text-gray-700">
                            We handle billing, chargebacks, and customer support
                            so you don't have to. We partnered with Stripe to
                            bring you quick secured and automated billing.
                        </p>
                        <a
                            href="/"
                            aria-label=""
                            className="inline-flex items-center font-semibold text-green-600 transition-colors duration-200 hover:text-green-600"
                        >
                            Learn more
                        </a>
                    </div>
                </div>
            </div>

            <div className="px-4 py-16 mx-auto md:px-24 lg:px-8 lg:py-20 w-full bg-white">
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    <div>
                        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-green-600">
                            Brand new
                        </p>
                    </div>
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        Build a powerful community.
                    </h2>
                    <p className="text-base text-gray-700 md:text-lg">
                        TrainEZ provides the easiest way for trainers to build a
                        community and generate new leads or subscriptions.
                        Simply post your exclusive content and make money from
                        it.
                    </p>
                </div>
                <div className="grid max-w-md gap-10 row-gap-5 sm:row-gap-10 lg:max-w-screen-md lg:grid-cols-2 sm:mx-auto">
                    <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm">
                        <div className="mb-6">
                            <div className="flex items-center justify-between pb-6 mb-6 border-b">
                                <div>
                                    <p className="text-sm font-bold tracking-wider uppercase">
                                        Personal
                                    </p>
                                    <p className="text-5xl font-extrabold">
                                        Free
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-blue-gray-50">
                                    <svg
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        className="w-10 h-10 text-gray-700"
                                    >
                                        <path
                                            d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                                            fill="none"
                                            stroke="currentColor"
                                        ></path>
                                        <path
                                            d="M15,23H9v-5H7v-6 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                                            fill="none"
                                            stroke="currentColor"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <p className="mb-2 font-bold tracking-wide">
                                    Features
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <div className="mr-2">
                                            <svg
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                className="w-4 h-4 text-deep-purple-accent-400"
                                            >
                                                <polyline
                                                    fill="none"
                                                    stroke="currentColor"
                                                    points="6,12 10,16 18,8"
                                                ></polyline>
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    fill="none"
                                                    r="11"
                                                    stroke="currentColor"
                                                ></circle>
                                            </svg>
                                        </div>
                                        <p className="font-medium text-gray-700">
                                            90% Commissions On All Income
                                        </p>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="mr-2">
                                            <svg
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                className="w-4 h-4 text-deep-purple-accent-400"
                                            >
                                                <polyline
                                                    fill="none"
                                                    stroke="currentColor"
                                                    points="6,12 10,16 18,8"
                                                ></polyline>
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    fill="none"
                                                    r="11"
                                                    stroke="currentColor"
                                                ></circle>
                                            </svg>
                                        </div>
                                        <p className="font-medium text-gray-700">
                                            5% Commissions On All Refferals
                                        </p>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="mr-2">
                                            <svg
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                className="w-4 h-4 text-deep-purple-accent-400"
                                            >
                                                <polyline
                                                    fill="none"
                                                    stroke="currentColor"
                                                    points="6,12 10,16 18,8"
                                                ></polyline>
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    fill="none"
                                                    r="11"
                                                    stroke="currentColor"
                                                ></circle>
                                            </svg>
                                        </div>
                                        <p className="font-medium text-gray-700">
                                            Weekly Payouts
                                        </p>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="mr-2">
                                            <svg
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                className="w-4 h-4 text-deep-purple-accent-400"
                                            >
                                                <polyline
                                                    fill="none"
                                                    stroke="currentColor"
                                                    points="6,12 10,16 18,8"
                                                ></polyline>
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    fill="none"
                                                    r="11"
                                                    stroke="currentColor"
                                                ></circle>
                                            </svg>
                                        </div>
                                        <p className="font-medium text-gray-700">
                                            Direct Messaging (Soon)
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <Link href="/login">
                                <a className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white transition duration-200 bg-green-700 rounded shadow-md hover:bg-green-800 focus:shadow-outline focus:outline-none">
                                    Start for free
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm">
                        <div className="mb-6">
                            <div className="flex items-center justify-between pb-6 mb-6 border-b">
                                <div>
                                    <p className="text-sm font-bold tracking-wider uppercase">
                                        Professional
                                    </p>
                                    <p className="text-5xl font-extrabold">
                                        $50
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50">
                                    <svg
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        className="w-10 h-10 text-deep-purple-accent-400"
                                    >
                                        <path
                                            d="M4,7L4,7 C2.895,7,2,6.105,2,5v0c0-1.105,0.895-2,2-2h0c1.105,0,2,0.895,2,2v0C6,6.105,5.105,7,4,7z"
                                            fill="none"
                                            stroke="currentColor"
                                        ></path>
                                        <path
                                            d="M6,21H3v-4 l-2,0v-5c0-1.105,0.895-2,2-2h1"
                                            fill="none"
                                            stroke="currentColor"
                                        ></path>
                                        <path
                                            d="M20,7L20,7 c1.105,0,2-0.895,2-2v0c0-1.105-0.895-2-2-2h0c-1.105,0-2,0.895-2,2v0C18,6.105,18.895,7,20,7z"
                                            fill="none"
                                            stroke="currentColor"
                                        ></path>
                                        <path
                                            d="M18,21h3v-4 l2,0v-5c0-1.105-0.895-2-2-2h-1"
                                            fill="none"
                                            stroke="currentColor"
                                        ></path>
                                        <path
                                            d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                                            fill="none"
                                            stroke="currentColor"
                                        ></path>
                                        <path
                                            d="M15,23H9v-6H7v-5 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                                            fill="none"
                                            stroke="currentColor"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <p className="mb-2 font-bold tracking-wide">
                                    Features
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <div className="mr-2">
                                            <svg
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                className="w-4 h-4 text-deep-purple-accent-400"
                                            >
                                                <polyline
                                                    fill="none"
                                                    stroke="currentColor"
                                                    points="6,12 10,16 18,8"
                                                ></polyline>
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    fill="none"
                                                    r="11"
                                                    stroke="currentColor"
                                                ></circle>
                                            </svg>
                                        </div>
                                        <p className="font-medium text-gray-700">
                                            95% Commission On All Income
                                        </p>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="mr-2">
                                            <svg
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                className="w-4 h-4 text-deep-purple-accent-400"
                                            >
                                                <polyline
                                                    fill="none"
                                                    stroke="currentColor"
                                                    points="6,12 10,16 18,8"
                                                ></polyline>
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    fill="none"
                                                    r="11"
                                                    stroke="currentColor"
                                                ></circle>
                                            </svg>
                                        </div>
                                        <p className="font-medium text-gray-700">
                                            Best In Class Program Builder
                                        </p>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="mr-2">
                                            <svg
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                className="w-4 h-4 text-deep-purple-accent-400"
                                            >
                                                <polyline
                                                    fill="none"
                                                    stroke="currentColor"
                                                    points="6,12 10,16 18,8"
                                                ></polyline>
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    fill="none"
                                                    r="11"
                                                    stroke="currentColor"
                                                ></circle>
                                            </svg>
                                        </div>
                                        <p className="font-medium text-gray-700">
                                            Program Mobile App for Clients
                                        </p>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="mr-2">
                                            <svg
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                className="w-4 h-4 text-deep-purple-accent-400"
                                            >
                                                <polyline
                                                    fill="none"
                                                    stroke="currentColor"
                                                    points="6,12 10,16 18,8"
                                                ></polyline>
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    fill="none"
                                                    r="11"
                                                    stroke="currentColor"
                                                ></circle>
                                            </svg>
                                        </div>
                                        <p className="font-medium text-gray-700">
                                            24/7 support
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <a
                                href="/"
                                className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-500 hover:bg-gray-500 focus:shadow-outline focus:outline-none"
                            >
                                Coming Soon
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 px-4 pt-16 mx-auto w-full border-opacity-10 md:px-24 lg:px-8">
                <div className="max-w-6xl mx-auto grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <a
                            href="/"
                            aria-label="Go home"
                            title="Company"
                            className="inline-flex items-center"
                        >
                            <div className="text-2xl font-thin text-black">
                                <div>train ez</div>
                            </div>
                        </a>
                        <div className="mt-6 lg:max-w-sm">
                            <p className="text-sm text-gray-900">
                                The easiest way for trainers to build a
                                community. Simply post your exclusive content
                                and make money from subscriptions or generate
                                new leads.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <p className="text-base font-bold tracking-wide text-gray-900">
                            Contacts
                        </p>
                        <div className="flex">
                            <p className="mr-1 text-gray-900">Email:</p>
                            <a
                                href="mailto:info@lorem.mail"
                                aria-label="Our email"
                                title="Our email"
                                className="transition-colors duration-300 text-green-600 hover:text-deep-purple-800"
                            >
                                patrickgenevich@gmail.com
                            </a>
                        </div>
                    </div>
                    <div>
                        <span className="text-base font-bold tracking-wide text-gray-900">
                            Social
                        </span>
                        <div className="flex items-center mt-1 space-x-3">
                            <a
                                href="/"
                                className="text-gray-700 transition-colors duration-300 hover:text-green-600"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5"
                                >
                                    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z"></path>
                                </svg>
                            </a>
                            <a
                                href="/"
                                className="text-gray-700 transition-colors duration-300 hover:text-green-600"
                            >
                                <svg
                                    viewBox="0 0 30 30"
                                    fill="currentColor"
                                    className="h-6"
                                >
                                    <circle cx="15" cy="15" r="4"></circle>
                                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path>
                                </svg>
                            </a>
                            <a
                                href="/"
                                className="text-gray-700 transition-colors duration-300 hover:text-green-600"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5"
                                >
                                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
                    <p className="text-sm text-gray-700">
                        © Copyright 2021. All rights reserved.
                    </p>
                    <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                        <li>
                            <a
                                href="/"
                                className="text-sm text-gray-700 transition-colors duration-300 hover:text-green-600"
                            >
                                F.A.Q
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                className="text-sm text-gray-700 transition-colors duration-300 hover:text-green-600"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                className="text-sm text-gray-700 transition-colors duration-300 hover:text-green-600"
                            >
                                Terms &amp; Conditions
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
