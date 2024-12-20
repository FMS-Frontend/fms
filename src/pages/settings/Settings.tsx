import { FC } from "react";
import { useAppContext } from "../../context/AppContext";
import SuperSettingsPage from "./SuperSettings";
import AdminSettingsPage from "./AdminSettingsPage";

const Settings: FC = () => {
  const { role } = useAppContext();

  return (
    <>
      {role === "Super User" && <SuperSettingsPage />}
      {role === "Admin" && <AdminSettingsPage />}
    </>
  );
};

export default Settings;
