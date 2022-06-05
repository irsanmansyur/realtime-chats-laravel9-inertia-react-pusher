import CardMessage from "@/Components/Chat/CardMessage";
import SingleChat from "@/Components/Chat/SingleChat";
import TypeChat from "@/Components/Chat/TypeChat";
import Welcome from "@/Components/Chat/Welcome";
import Main from "@/Layouts/Main";
import UserAtom from "@/Utils/Auth/UserAtom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const HomePage = ({ auth: { user }, peoples: ppl, ...props }) => {
    const setUser = useSetRecoilState(UserAtom);
    const [newMessage, setNewMessage] = useState(undefined);
    const [messageRead, setMessageRead] = useState(undefined);
    const [latestTyping, setLatestTyping] = useState(undefined);
    const [peoples, setPeoples] = useState(ppl);
    const [toPeople, setToPeople] = useState({});
    const [openChat, setOpenChat] = useState(false);
    const isSendingMessageToPeople = (message) => {
        let penerima = { ...toPeople, message };
        let peoplesDataNew = peoples.data.map((p) => {
            if (p.id == penerima.id) return penerima;
            return p;
        });
        setPeoples({ ...peoples, data: peoplesDataNew });
    };
    useEffect(() => {
        if (toPeople.id) {
            let peoplesDataNew = peoples.data.map((p) => {
                if (toPeople.id == p.id) return toPeople;
                return p;
            });
            setPeoples({ ...peoples, data: peoplesDataNew });
        }
        return () => {};
    }, [toPeople]);
    const updateMessagePeople = (message) => {
        let FromUser = message.from_user;
        let dataPengirimSebelumnya =
            peoples.data.find((p) => p.id == message.user_id) ?? FromUser;

        // periksa jika  ada user yang sementara dibuka
        if (toPeople && toPeople.id == dataPengirimSebelumnya.id) {
            message.status_pesan = "dibaca";
            // axios.get(route("chats.reading", message.id));
        }

        // update single message
        dataPengirimSebelumnya.message = message;

        // update messages
        const newPeople = updateMessagesPeople(dataPengirimSebelumnya, message);

        // update peoples data
        setPeoples((ppls) => {
            return {
                ...ppls,
                data: [
                    newPeople,
                    ...ppls.data.filter((p) => p.id != newPeople.id),
                ],
            };
        });
    };
    const updateMessagesPeople = (peopleUpdate, newMessage) => {
        if (peopleUpdate.messages && peopleUpdate.messages.data) {
            if (toPeople && toPeople.id == peopleUpdate.id) {
                // send to api update message to read
                axios.get(route("chats.reading", newMessage.id));
            }
            peopleUpdate.messages.data = [
                newMessage,
                ...peopleUpdate.messages.data,
            ];
        }
        return peopleUpdate;
    };
    useEffect(() => {
        newMessage && updateMessagePeople(newMessage);
        return () => {};
    }, [newMessage]);
    useEffect(() => {
        if (latestTyping) {
            let newDataPeoples = peoples.data.map((p) => {
                if (p.id == latestTyping.from.id) p.is_typing = true;
                return p;
            });
            setPeoples({
                ...peoples,
                data: newDataPeoples,
            });

            // hapus sedang mengetik ketika delai 5 detik
            setTimeout(function () {
                let newDataPeoples = peoples.data.map((p) => {
                    if (p.id == latestTyping.from.id) p.is_typing = false;
                    return p;
                });
                setPeoples({
                    ...peoples,
                    data: newDataPeoples,
                });
            }, 5000);
        }

        return () => {
            setLatestTyping(undefined);
        };
    }, [latestTyping]);

    useEffect(() => {
        if (messageRead) {
            //dapatkan data orang yg membaca pesan kita
            let newPeople = peoples.data.find((p) => p.id == messageRead.to);

            //cek dulu apakah dia punya pesannya sudah di load sebelumnya
            if (!newPeople.messages) return;

            //update pesannya
            let newPeopleMessagesData = newPeople.messages.data.map((msg) => {
                if (msg.id == messageRead.id) msg.status_pesan = "dibaca";
                return msg;
            });
            newPeople.messages.data = newPeopleMessagesData;

            setPeoples({
                ...peoples,
                data: peoples.data.map((ppl) => {
                    if (ppl.id == newPeople.id) return newPeople;
                    return ppl;
                }),
            });
        }
        return () => {
            setMessageRead(undefined);
        };
    }, [messageRead]);
    useEffect(() => {
        setUser(user);
        window.ChannnelChats = window.Echo.private("message." + user.id);
        window.ChannnelChats.listen("SendMessageToUser", (pesan) => {
            setNewMessage(pesan.message);
        });
        window.ChannnelChats.listen("IsPeoplesTypingMessage", (isTyping) => {
            setLatestTyping(isTyping);
        });
        window.ChannnelChats.listen("MessageRead", (resp) => {
            setMessageRead(resp.message);
        });
        return () => {
            setNewMessage(undefined);
            setLatestTyping(undefined);
            setMessageRead(undefined);
        };
    }, []);
    return (
        <div className="Homepage md:flex w-full flex-row">
            <div
                className={
                    "List-people min-h-[33%] overflow-y-auto h-screen " +
                    (!openChat ? "" : "hidden md:inline")
                }
            >
                <div className="profile flex justify-between items-center bg-sky-500 p-3">
                    <div className="flex gap-4 items-center">
                        <div className="container-image">
                            <img
                                src={user.thumbnail}
                                alt=""
                                className="w-[58px] h-[58px] rounded-full bg-white"
                            />
                        </div>
                        <div>
                            <span className="block">{user.name}</span>
                            <span className="text-gray-700">
                                Sedang Tidak ingin cerita
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    {peoples.data.map((people) => {
                        return (
                            <CardMessage
                                key={people.id}
                                people={people}
                                user={user}
                                setOpenChat={setOpenChat}
                                toPeople={toPeople}
                                setToPeople={setToPeople}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="single-chat  md:flex flex-auto bg-[#fdfdfd]">
                {openChat ? (
                    <SingleChat
                        people={toPeople}
                        user={user}
                        setPeople={setToPeople}
                        setOpenChat={setOpenChat}
                        isSendingMessage={isSendingMessageToPeople}
                    />
                ) : (
                    <Welcome />
                )}
            </div>
        </div>
    );
};

HomePage.layout = (page) => (
    <Main children={page} title="Aplikasi Chat Realtime" />
);
export default HomePage;
