import Spinner from "./spinner";

function Banner ({body, spinner, onClose, showClose}:any) {
    return (
        <div tabIndex={-1} className="top-0 bg-white start-0 z-50 flex justify-between item-center w-full p-[12px] border-b border-gray-200 ">
    <div className="flex mx-[20px]">
        {spinner &&<div className="mr-[8px] scale-[0.7]"><Spinner/></div>}
        <p className="text-sm my-auto font-normal text-gray-500">
            <span>{body}</span>
        </p>
    </div>
    {showClose && <div className="flex">
        <button onClick={onClose} type="button" className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close banner</span>
        </button>
    </div>}
</div>

    )
}
export default Banner;