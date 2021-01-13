import useStreamTopics from "../hooks/useStreamTopics";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function TopicList({ userId }) {
    const { topicList } = useStreamTopics(userId);

    console.log("topics", topicList);

    if (!topicList) {
        return null;
    }

    if (topicList?.length === 0) {
        return (
            <div className="w-full flex justify-around text-gray-500 mt-5 text-xl font-semibold">
                <p>Nothing was found</p>
            </div>
        );
    }

    return (
        <div className="w-full md:flex md:flex-wrap">
            {topicList.map((topic, idx) => {
                return (
                    <Link
                        key={idx}
                        href={`/topic/${topic.value}?uid=${userId}`}
                    >
                        <button className="w-full outline-none focus:outline-none flex">
                            <div className="bg-white w-full rounded-md p-8 flex justify-between border-b border-gray-200">
                                <p className="font-light text-lg text-gray-900">
                                    {topic.label}
                                </p>
                                <FontAwesomeIcon
                                    className="text-gray-400 text-lg"
                                    icon={faChevronRight}
                                />
                            </div>
                        </button>
                    </Link>
                );
            })}
        </div>
    );
}
