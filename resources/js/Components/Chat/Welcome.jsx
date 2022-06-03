import React, { useState, useEffect } from "react";
export default function Welcome() {
    const [userName, setUserName] = useState("");
    useEffect(() => {}, []);
    return (
        <div className="hidden md:flex w-full h-full items-center justify-center  flex-col">
            <img src={"/assets/robot.gif"} />
            <h1>
                Welcome, <span className="text-primary">{userName}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </div>
    );
}
