import { FC } from "react";
import DateComp from "../../../ui/utils/DateComp";

const Logging: FC = () => {
  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 sm:gap-x-4 gap-x-5 gap-y-8 max-w-4xl">
        <DateComp />
      </div>
    </div>
  );
};

export default Logging;
