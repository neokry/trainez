export default function Modal({ children, title, showDismiss, onDismiss }) {
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 px-6 py-4 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-baseline justify-left rounded-t">
                            {showDismiss && (
                                <button
                                    type="button"
                                    className="bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={onDismiss}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-3xl block font-light outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            )}
                            <div>
                                <p>{title}</p>
                            </div>
                        </div>
                        <div className="relative mt-4 flex-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
