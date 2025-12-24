import React from "react";
import { Link } from "react-router-dom";

const TableApproval = ({ event_id, title }) => {
  return (
    <div className="border-b py-6 px-6 grid grid-cols-[200px_1fr_200px] items-center">
      <div className="text-sm text-gray-700">{event_id}</div>

      <div className="text-center text-sm">{title}</div>

      <div className="text-right">
        <Link
          to={`/approval_detail_adm/${event_id}`}
          className="px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default TableApproval;
