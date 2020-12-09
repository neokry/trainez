import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBell,
    faPlusSquare,
    faUserCircle,
    faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

function Header({ menuClick }) {
    return (
        <header className="bg-green-400 fixed w-full z-20 text-2xl">
            <div className="flex flex-wrap items-center justify-between max-w-6xl p-2 mx-auto md:flex-no-wrap">
                <Link href="/">
                    <a className="block text-white">
                        <FontAwesomeIcon icon={faHome} />
                    </a>
                </Link>

                <Link href="/my/notifications">
                    <a className="block text-white">
                        <FontAwesomeIcon icon={faBell} />
                    </a>
                </Link>

                <Link href="/posts/create">
                    <a className="block text-white">
                        <FontAwesomeIcon icon={faPlusSquare} />
                    </a>
                </Link>

                <Link href="/my/chats">
                    <a className="block text-white">
                        <FontAwesomeIcon icon={faCommentDots} />
                    </a>
                </Link>

                <button className="block text-white" onClick={menuClick}>
                    <FontAwesomeIcon icon={faUserCircle} />
                </button>
            </div>
        </header>
    );
}

export default Header;
