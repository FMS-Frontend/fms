import { FC } from "react";
import { AdminReport } from "../../../db/types";
import {
  capitalizeWords,
  formatDate,
  formatTime,
  getStatusStyles,
} from "../../../db/helperFunctions";

interface ReportRowProps {
  report: AdminReport;
  index: number;
}

const AdminReportRow: FC<ReportRowProps> = ({ report, index }) => {
  const { updatedAt, comment, status, author } = report;

  return (
    <div
      className={`grid grid-cols-[1fr_1fr_1fr_2fr_0.5fr] py-2 px-2 gap-6 my-2 items-center ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <span className="text-xl">{formatDate(updatedAt)}</span>
      <span className="text-xl">{formatTime(updatedAt)}</span>
      <span className="text-xl">{capitalizeWords(author.name)}</span>
      <span className="text-xl">{comment}</span>
      <div>
        <span
          className={`flex justify-center items-center px-4 py-1 rounded-full text-xl font-medium ${getStatusStyles(
            status
          )}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default AdminReportRow;
