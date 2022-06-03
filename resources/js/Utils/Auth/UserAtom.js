import { atom } from "recoil";

const UserAtom = atom({
    key: "userAtom", // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
});

export default UserAtom;
