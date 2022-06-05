import UserAtom from "@/Utils/Auth/UserAtom";
import React from "react";
import { useRecoilValue } from "recoil";
import StatusPesan from "./StatusPesan";

function ContentMessage({ message = {} }) {
    const user = useRecoilValue(UserAtom);
    let its_me = user.id == message.user_id;
    return (
        <div className="content-message first:mt-2">
            <div className={"flex items-end" + (its_me ? " justify-end" : "")}>
                <div
                    className={
                        "flex flex-col space-y-2 text-xs max-w-xs mx-2" +
                        (its_me ? " order-1" : " order-2")
                    }
                >
                    <div
                        className={
                            "isi-pesan flex gap-x-1" +
                            (!its_me ? " flex-row-reverse" : "")
                        }
                    >
                        <StatusPesan status={message.status_pesan} />
                        <span
                            className={
                                "px-4 py-2 rounded-lg inline-block rounded-br-none" +
                                (its_me
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
                        (its_me ? " order-2" : " order-1")
                    }
                />
            </div>
        </div>
    );
}

export default ContentMessage;
