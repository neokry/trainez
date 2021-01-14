import { SubscribeControl } from "./subscribe-control";
import { SubscribeDetails } from "./subscribe-details";

export const SubscribeModal = ({
    setShowSubscribeModal,
    setIsFollowing,
    user,
    hasPaymentMethods,
    subPrice,
}) => {
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between rounded-t">
                            <button
                                type="button"
                                className="p-1 ml-auto bg-transparent border-0 fixed z-50 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowSubscribeModal(false);
                                }}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-3xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <SubscribeDetails user={user} isSignup={false} />
                            <SubscribeControl
                                setShowSubscribeModal={setShowSubscribeModal}
                                setIsFollowing={setIsFollowing}
                                user={user}
                                hasPaymentMethods={hasPaymentMethods}
                                subPrice={subPrice}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};
