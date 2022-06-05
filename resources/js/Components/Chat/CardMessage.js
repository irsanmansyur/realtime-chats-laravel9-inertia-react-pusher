import React from "react";
import TypeChat from "./TypeChat";

function CardMessage({
    user,
    people,
    setOpenChat,
    toPeople,
    setToPeople,
    setPeoples,
}) {
    return (
        <div
            className={
                "card-chat rounded-[12px] cursor-pointer duration-300 ease-in-out transform bg-gray-300 group " +
                (people.id == toPeople.id ? " active" : "")
            }
            onClick={(e) => {
                let newPeople = {
                    ...people,
                };
                if (newPeople.message)
                    newPeople.message = {
                        ...newPeople.message,
                        telah_dibaca: true,
                    };
                setToPeople(newPeople);
                setOpenChat(true);
            }}
        >
            <div className="profile flex justify-between items-center p-3">
                <div className="flex gap-4 items-center">
                    <div className="container-image">
                        <img
                            src={people.thumbnail}
                            className="w-[40px] h-[40px] rounded-full bg-white group-hover:p-1 transform ease-in-out duration-300"
                        />
                    </div>
                    <div>
                        <span className="block  group-hover:font-bold ">
                            {people.name}
                        </span>
                        <TypeChat
                            user={user}
                            message={people.message}
                            people={people}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardMessage;
