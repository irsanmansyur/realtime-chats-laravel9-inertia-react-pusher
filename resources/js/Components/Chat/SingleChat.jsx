import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowDown } from "react-icons/bs";
import FormSendMessage from "./FormSendMessage";
import Messages from "./Messages";
import StatusPesan from "./StatusPesan";
function SingleChat({ setOpenChat, setPeople, people, user }) {
    const getMessages = async () => {
        let resp = await axios.get(route("chats.user", people.id));
        setPeople({
            ...people,
            message: resp.data.data[0],
            messages: resp.data,
        });
    };
    const sendMessage = async (data) => {
        let message = {
            id: Math.random() * 1872,
            content: data.content,
            from_user: user,
            to_user: people,
            is_read: 0,
            its_me: true,
            status_pesan: "proses",
            user_id: user.id,
        };

        let newMessagesData = [message, ...(people.messages?.data ?? [])];
        let newPeople = {
            ...people,
            message,
            messages: { ...(people.messages ?? {}), data: newMessagesData },
        };
        setPeople(newPeople);
        let resp = await axios.post(route("chats.sending", people.id), message);
        newMessagesData[0] = message = resp.data.data;
        newPeople = {
            ...people,
            message,
            messages: { ...(people.messages ?? {}), data: newMessagesData },
        };
        setPeople(newPeople);
    };
    useEffect(() => {
        if (!people.messages) getMessages();
        return () => {};
    }, [people.id]);
    useEffect(() => {
        if (people.messages) {
            let newMessageRead = people.messages.data.map((msg) => {
                if (msg.status_pesan != "dibaca" && msg.user_id != user.id) {
                    msg.status_pesan = "dibaca";
                    axios.get(route("chats.reading", msg.id));
                }
                return msg;
            });
        }
        return () => {};
    }, [people.messages]);
    return (
        <div className="flex-1  justify-between flex flex-col h-screen">
            <div className="flex  p-3  border-b-2 shadow  bg-white relative items-center ">
                <div
                    className="border rounded p-1 flex items-center justify-center group hover:bg-gray-200 cursor-pointer "
                    onClick={(e) => {
                        setPeople({});
                        setOpenChat(false);
                    }}
                >
                    <BsArrowDown className="w-5 h-5 rotate-90 transform duration-500 ease-in-out " />
                </div>
                <div className="flex items-center justify-end flex-auto">
                    <div className="flex flex-col leading-tight text-right mr-3">
                        <div className="text-2xl mt-1 flex items-center">
                            <span className="text-gray-700 ">
                                {people.name}
                            </span>
                        </div>
                        <span className="text-lg text-gray-600">
                            Junior Developer
                        </span>
                    </div>
                    <div className="relative">
                        <span className="absolute text-green-500 right-0 bottom-0">
                            <svg width={20} height={20}>
                                <circle
                                    cx={8}
                                    cy={8}
                                    r={8}
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                        <img
                            src={people.thumbnail}
                            className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                        />
                    </div>
                </div>
            </div>
            <Messages setPeople={setPeople} people={people} />
            <FormSendMessage toPeople={people} callback={sendMessage} />
        </div>
    );
}
const ChatMessage = ({ message = {} }) => {
    return (
        <div className="chat-message first:mt-2">
            <div
                className={
                    "flex items-end" + (message.its_me ? " justify-end" : "")
                }
            >
                <div
                    className={
                        "flex flex-col space-y-2 text-xs max-w-xs mx-2" +
                        (message.its_me ? " order-1" : " order-2")
                    }
                >
                    <div
                        className={
                            "isi-pesan flex gap-x-1" +
                            (!message.its_me ? " flex-row-reverse" : "")
                        }
                    >
                        <StatusPesan status={message.status_pesan} />
                        <span
                            className={
                                "px-4 py-2 rounded-lg inline-block rounded-br-none" +
                                (message.its_me
                                    ? " bg-primary text-white "
                                    : " bg-gray-300 text-gray-600")
                            }
                        >
                            {message.content}
                        </span>
                    </div>
                </div>
                <img
                    src={message.from_user.thumbnail}
                    alt="Profile"
                    className={
                        "w-6 h-6 rounded-full" +
                        (message.its_me ? " order-2" : " order-1")
                    }
                />
            </div>
        </div>
    );
};
export default SingleChat;
