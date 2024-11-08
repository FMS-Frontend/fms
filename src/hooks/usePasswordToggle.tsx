import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type UsePasswordToggleReturnType = [string, JSX.Element];

const usePasswordToggle = (): UsePasswordToggleReturnType => {
  const [visible, setVisible] = useState<boolean>(false);

  const Icon = visible ? (
    <FaRegEyeSlash onClick={() => setVisible((visible) => !visible)} />
  ) : (
    <FaRegEye onClick={() => setVisible((visible) => !visible)} />
  );

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default usePasswordToggle;
