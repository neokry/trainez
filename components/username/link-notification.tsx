import { motion } from "framer-motion";

export const LinkNotification = () => {
    return (
        <motion.div
            initial={{ y: "100vw" }}
            animate={{ y: 0 }}
            exit={{ y: "100vw" }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            className="flex h-20 fixed items-end justify-around bottom-0 inset-x-0 z-40"
        >
            <div className="m-auto">
                <div className="bg-green-400 rounded-lg border-gray-300 border p-3 shadow-lg">
                    <div className="flex flex-row">
                        <div className="px-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 1792 1792"
                                fill="#FFFFFF"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
                            </svg>
                        </div>
                        <div className="ml-2 mr-6">
                            <span className="block text-white">
                                Link to profile was copied to clipboard
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
