import { FC, useState } from "react";
import FraudReportTable from "../features/admin/reports/FraudReportsTable";
import AssignReportTable from "../features/admin/reports/AssignReportTable";
import LoggingReportsTable from "../features/admin/reports/LoggingReports";

const AdminReportsTab: FC = () => {
  const [activeTab, setActiveTab] = useState("Assign Report");
  const tabs = ["Assign Report", "Fraud Report", "Logging Report"];

  return (
    <div className="flex flex-col gap-8 ">
      <div className="container">
        <div className="flex justify-between border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex justify-center w-full px-4 py-2 font-medium text-gray-600 transition 
                ${
                  activeTab === tab ? "text-primaryBlue" : "hover:text-blue-500"
                }`}
            >
              {tab}
              <span
                className={`absolute flex justify-center  bottom-0 left-0 h-1 w-full bg-primaryBlue transition-all duration-300 
                  ${
                    activeTab === tab ? "scale-x-100" : "scale-x-0"
                  } origin-left`}
              ></span>
            </button>
          ))}
        </div>
        <div className="mt-12">
          {activeTab === "Assign Report" && <AssignReportTable />}
          {activeTab === "Fraud Report" && <FraudReportTable />}
          {activeTab === "Logging Report" && <LoggingReportsTable />}
        </div>
      </div>
    </div>
  );
};

export default AdminReportsTab;
