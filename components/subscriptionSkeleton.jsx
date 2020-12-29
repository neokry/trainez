import Skeleton from "./skeleton";

export default function SubscriptionSkeleton() {
    return (
        <div className="mt-5">
            <div className="md:w-1/2">
                <div className="border border-gray-300 rounded-md p-5 flex items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="w-3/4 mt-4">
                        <div className="p-3 py-0">
                            <Skeleton />
                        </div>
                        <div className="p-3 w-1/2">
                            <Skeleton />
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 mt-2">
                <div className="border border-gray-300 rounded-md p-5 flex items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="w-3/4 mt-4">
                        <div className="p-3 py-0">
                            <Skeleton />
                        </div>
                        <div className="p-3 w-1/2">
                            <Skeleton />
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 mt-2">
                <div className="border border-gray-300 rounded-md p-5 flex items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="w-3/4 mt-4">
                        <div className="p-3 py-0">
                            <Skeleton />
                        </div>
                        <div className="p-3 w-1/2">
                            <Skeleton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
