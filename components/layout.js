import Header from "./header";
import Footer from "./footer";
import Menu from "./menu";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStream } from "../hooks/useStream";

function Layout(props) {
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState(false);
    const stream = useStream();

    useEffect(() => {
        stream.getCurrentUser();
    }, []);

    useEffect(() => {
        const user = stream.currentUser.data;
        setUser(user);
    }, [stream.currentUser]);

    const menuClick = (e) => {
        e.preventDefault();
        if (user) setShowMenu(!showMenu);
    };

    const backdropClick = (e) => {
        if (e.target.classList.contains("backdrop")) setShowMenu(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header menuClick={menuClick} />
            <main className="flex-1 w-full max-w-6xl p-4 mx-auto mt-16">
                {props.children}
                <AnimatePresence>
                    {showMenu && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={backdropClick}
                            className="fixed h-screen w-screen top-0 left-0 z-10 bg-gray-900 bg-opacity-50 backdrop"
                        >
                            <Menu user={user} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default Layout;
