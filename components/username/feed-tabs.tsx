import { useState } from "react";
import TopicList from "../topicList";
import UserFeed from "../userFeed";

export const FeedTabs = ({ userId }) => {
    const [currentTab, setCurrentTab] = useState("all");
    const selectedStyle =
        "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-semibold focus:outline-none";
    const unselectedStyle =
        "bg-white inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold focus:outline-none";

    return (
        <>
            <div className="mt-10">
                <ul className="list-reset flex border-b">
                    <li
                        className={
                            currentTab === "all" ? "-mb-px mr-1" : "mr-1"
                        }
                    >
                        <button
                            onClick={() => setCurrentTab("all")}
                            className={
                                currentTab === "all"
                                    ? selectedStyle
                                    : unselectedStyle
                            }
                        >
                            All Posts
                        </button>
                    </li>
                    <li
                        className={
                            currentTab === "topic" ? "-mb-px mr-1" : "mr-1"
                        }
                    >
                        <button
                            onClick={() => setCurrentTab("topic")}
                            className={
                                currentTab === "topic"
                                    ? selectedStyle
                                    : unselectedStyle
                            }
                        >
                            Topics
                        </button>
                    </li>
                </ul>
            </div>
            {(() => {
                switch (currentTab) {
                    case "all":
                        return <UserFeed userId={userId} />;
                    case "topic":
                        return <TopicList userId={userId} />;
                }
            })()}
        </>
    );
};
