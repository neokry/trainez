const { createContext } = require("react");
import useSWR from "swr";

const streamContext = createContext();
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function provideStream({ children }) {
    const stream = useProvideStream();
    return (
        <streamContext.Provider value={stream}>
            {children}
        </streamContext.Provider>
    );
}

export const useStream = () => {
    return useContext(streamContext);
};

function useProvideStream() {
    const getToken = (userId) => {
        const { data, error } = useSWR("/api/stream/", fetcher);
    };
}
