import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { CgSpinner } from "react-icons/Cg";
function StatusPesan({ status }) {
    return (
        <div className="StatusPesan flex items-center justify-center transform transition ease-in-out duration-500">
            {status == "proses" ? (
                <CgSpinner className="animate-spin w-5 h-5" />
            ) : status == "terkirim" ? (
                <BsCheck className={`w-5 h-5`} />
            ) : (
                <BsCheckAll className={`w-5 h-5`} />
            )}
        </div>
    );
}

export default StatusPesan;
