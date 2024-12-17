import { FC } from "react";
import { useAppContext } from "../context/AppContext";
import SuperSettingsPage from "./SuperSettings";
import AdminSettingsPage from "./AdminSettingsPage";

const SettingsPage: FC = () => {
  const { role } = useAppContext();
  console.log(role);

  return (
    <>
      {role === "Super User" && <SuperSettingsPage />}
      {role === "Admin" && <AdminSettingsPage />}
    </>
  );
};

export default SettingsPage;
