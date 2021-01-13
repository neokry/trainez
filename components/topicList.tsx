import useStreamTopics from "../hooks/useStreamTopics";
import Link from "next/link";

export default function TopicList({ userId }) {
    const { topicList } = useStreamTopics(userId);

    console.log("topics", topicList);

    if (!topicList || topicList.length === 0) {
        return (
            <div className="w-full flex justify-around text-gray-500 mt-5 text-xl font-semibold">
                <p>Nothing was found</p>
            </div>
        );
    }

    return (
        <div className="mt-5 w-full md:flex md:flex-wrap">
            {topicList.map((topic, idx) => {
                return (
                    <Link
                        key={idx}
                        href={`/topic/${topic.value}?uid=${userId}`}
                    >
                        <button className="w-full md:w-1/2 mt-8 md:mt-6 px-2 outline-none focus:outline-none flex">
                            <div className="bg-white w-full rounded-md p-5 flex justify-around shadow-md border border-gray-200">
                                <p className="font-bold text-lg text-gray-800">
                                    {topic.label}
                                </p>
                            </div>
                        </button>
                    </Link>
                );
            })}
        </div>
    );
}
