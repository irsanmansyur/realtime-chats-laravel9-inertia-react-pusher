import UserAtom from "@/Utils/Auth/UserAtom";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import ContentMessage from "./ContentMessage";

function Messages({ people, setPeople }) {
    const user = useRecoilValue(UserAtom);

    const messagesRef = useRef();
    const loadMore = async () => {
        let messages_id = people.messages.data.map((msg) => msg.id);
        let resp = await axios.post(route("chats.user.more", people.id), {
            messages_id,
        });
        let newPeople = {
            ...people,
            messages: {
                ...resp.data,
                data: [...people.messages.data, ...resp.data.data],
            },
        };
        setPeople(newPeople);
    };
    const onScroll = () => {
        if (messagesRef.current) {
            const { scrollTop, scrollHeight, clientHeight } =
                messagesRef.current;
            if (
                clientHeight == scrollHeight + scrollTop &&
                people.messages?.links.next
            ) {
                loadMore();
            }
        }
    };
    return (
        <div
            id="messages"
            onScroll={onScroll}
            ref={messagesRef}
            className="flex  space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-col-reverse"
        >
            {people.messages &&
                people.messages.data.map((message) => (
                    <ContentMessage message={message} key={message.id} />
                ))}
        </div>
    );
}

export default Messages;
