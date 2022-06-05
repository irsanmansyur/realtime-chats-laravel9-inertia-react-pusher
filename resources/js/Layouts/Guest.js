import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 px-3">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500 rotate-45 hover:rotate-0 transform duration-500 ease-out" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 mx-2  relative">
                <div className="absolute z-0 inset-0 transition ease-in-out duration-500 shadow bg-gray-50 border-dotted rotate-3 sm:rotate-6 hover:rotate-0 rounded"></div>
                <div className="px-6 py-4 bg-white shadow-md  sm:rounded-lg  relative">
                    {children}
                </div>
            </div>
        </div>
    );
}
