import { FC, useState } from "react";
import Profile from "./super-settings/Profile";

const SuperSettingsPage: FC = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const tabs = ["Profile"];

  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="font-bold text-4xl mb-16">Settings</h1>

      <div className="container">
        <div className="flex gap-20 border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 font-medium text-gray-600 transition 
                ${
                  activeTab === tab ? "text-primaryBlue" : "hover:text-blue-500"
                }`}
            >
              {tab}
              <span
                className={`absolute bottom-0 left-0 h-1 w-full bg-primaryBlue transition-all duration-300 
                  ${
                    activeTab === tab ? "scale-x-100" : "scale-x-0"
                  } origin-left`}
              ></span>
            </button>
          ))}
        </div>
        <div className="mt-8">{activeTab === "Profile" && <Profile />}</div>
      </div>
    </div>
  );
};

export default SuperSettingsPage;
