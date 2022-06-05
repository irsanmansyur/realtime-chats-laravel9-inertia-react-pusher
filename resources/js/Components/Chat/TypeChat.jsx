import React, { useState, useEffect } from "react";
import { MdOutlineMessage, MdMessage } from "react-icons/md";
import { TbMessage2Share } from "react-icons/tb";
function TypeChat({ message, user, people: { is_typing } }) {
    if (is_typing === true) {
        return <span className="text-gray-400">sedang mengetik...</span>;
    }
    if (!message)
        return <span className="text-primary">Ketuk Untuk memulai chat</span>;

    let text =
        message.content_singkat ??
        message.content.slice(0, 40) +
            (message.content.length > 40 ? "..." : "");
    if (message.user_id == user.id)
        return <ChatSendiri message={{ ...message, text }} />;
    return <ChatLain message={{ ...message, text }} />;
}

const ChatSendiri = ({ message }) => {
    return (
        <ContainerTypeChat
            className={
                !message.telah_dibaca ? " text-gray-900" : " text-gray-500"
            }
            icon={<TbMessage2Share className="" />}
            text={message.text}
        />
    );
};

const ChatLain = ({ message }) => {
    return (
        <ContainerTypeChat
            text={message.text}
            icon={message.telah_dibaca ? <MdOutlineMessage /> : <MdMessage />}
            className={
                message.telah_dibaca ? " text-gray-600" : " text-primary"
            }
        />
    );
};
const ContainerTypeChat = ({ icon, text, className }) => {
    return (
        <div className="text-gray-900 flex items-start gap-2 ">
            <span className="mt-[5px]">{icon}</span>
            {text}
        </div>
    );
};
export default TypeChat;
