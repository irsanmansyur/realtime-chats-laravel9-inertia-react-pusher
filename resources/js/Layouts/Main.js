import React from "react";
export default function Main({ auth, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <main>{children}</main>
        </div>
    );
}
