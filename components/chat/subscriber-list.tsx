import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useStream } from "../../hooks/useStream";
const fetcher = (url, query) => axios.post(url, query).then((res) => res.data);

const SubscriberList: React.FC = () => {
    const stream = useStream();
    const [userIds, setUserIds] = useState([]);
    const { data, error } = useSWR(
        userIds.length > 0
            ? [`/api/stream/users/details`, { userIds: userIds }]
            : null,
        fetcher,
        { refreshInterval: 0 }
    );

    useEffect(() => {
        const load = async () => {
            const uids = stream.getFollowers();
            setUserIds(uids);
        };
        load();
    }, [stream]);

    return (
        <div>
            <div className="p-5 border flex justify-start items-center">
                <div className="text-2xl text-gray-900">New Message</div>
            </div>
            <div className="pl-5 border-l border-r h-screen">
                <div className="text-lg text-gray-600">Recent</div>
            </div>
        </div>
    );
};

export default SubscriberList;
