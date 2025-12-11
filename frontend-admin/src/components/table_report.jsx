import React from "react";
import { Link } from "react-router-dom";

const TableReport = ({ reportId, reportDate, reporterName }) => {
  return (
    <div className="border-b py-6 px-6 grid grid-cols-[200px_1fr_200px] items-center">

      <div className="text-sm text-gray-700">{reportDate}</div>

      <div className="text-center text-sm">{reporterName}</div>

      <div className="text-right">
        <Link
          to={`/report_detail/${reportId}`}
          className="px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
          See Details
        </Link>
      </div>

    </div>
  );
};

export default TableReport;
