export default function MyMessage({ message }) {
    return (
        <div className="ml-2 mt-2 w-full">
            <div className="flex flex-col items-end">
                <div className="ml-2">
                    <div className="bg-blue-400 p-2 px-3 mr-4 ml-12 rounded-md text-white">
                        {message.text}
                    </div>
                </div>
                <div
                    style={{ fontSize: "0.6rem" }}
                    className="text-gray-500 mt-1 mr-4"
                >
                    {message.time?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </div>
        </div>
    );
}
