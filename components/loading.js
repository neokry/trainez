import { motion } from "framer-motion";

export default function Loading() {
    console.log("loading");
    return (
        <div className="h-screen w-screen flex items-center justify-around">
            <motion.div
                animate={{ scale: 1.5 }}
                transition={{ duration: 3 }}
                className="flex items-center justify-around text-4xl font-thin text-green-500"
            >
                <div>train ez</div>
            </motion.div>
        </div>
    );
}
