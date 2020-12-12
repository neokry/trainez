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

function Header({ menuClick, user }) {
    return (
        <header className="border-b-2 bg-white fixed w-full z-30 text-2xl">
            <div className="flex flex-wrap items-center justify-between max-w-6xl p-2 mx-auto md:flex-no-wrap">
                <Link href="/">
                    <a className="block text-black">
                        <FontAwesomeIcon icon={faHome} />
                    </a>
                </Link>

                {user && (
                    <Link href="/my/notifications">
                        <a className="block text-black">
                            <FontAwesomeIcon icon={faBell} />
                        </a>
                    </Link>
                )}

                {user && (
                    <Link href="/posts/create">
                        <a className="block text-black">
                            <FontAwesomeIcon icon={faPlusSquare} />
                        </a>
                    </Link>
                )}

                {user && (
                    <Link href="/my/chats">
                        <a className="block text-black">
                            <FontAwesomeIcon icon={faCommentDots} />
                        </a>
                    </Link>
                )}

                <button className="block text-black" onClick={menuClick}>
                    <FontAwesomeIcon icon={faUserCircle} />
                </button>
            </div>
        </header>
    );
}

export default Header;
