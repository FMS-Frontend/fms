import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { FC, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";

/**
 * DateComp component that allows the user to select a date range using a calendar picker.
 * The component displays a date range in the format "From - To" and allows the user to select
 * a custom date range using a date picker.
 *
 * @component
 * @example
 * return <DateComp />;
 *
 * @returns {JSX.Element} The rendered date picker component.
 */

interface SelectionRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

/**
 * DateComp component renders a date range selector that allows users to pick a
 * start and end date. The selected range is displayed in a formatted label and can
 * be expanded or collapsed by clicking on the label.
 *
 * @component
 * @returns {JSX.Element} A component displaying a formatted date range and a date range
 * picker that appears on click.
 *
 * State:
 * - `openDate` (boolean): Controls visibility of the date range picker.
 * - `selectionRange` (SelectionRange): Stores the start and end dates of the selected range.
 *
 * Functions:
 * - `handleSelect`: Updates `selectionRange` with the selected start and end dates.
 * - `toggleDateOpen`: Toggles the visibility of the date picker.
 *
 * @example
 * // Renders the DateComp component
 * <DateComp />
 */

const DateCompAnalyst: FC = () => {
  const [openDate, setOpenDate] = useState<boolean>(false);

  const [selectionRange, setSelectionRange] = useState<SelectionRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    setSelectionRange({
      ...selectionRange,
      startDate: selection.startDate || new Date(),
      endDate: selection.endDate || new Date(),
    });
    console.log(ranges);
  };

  const toggleDateOpen = () => {
    setOpenDate((open) => !open);
  };

  return (
    <div className="flex flex-col ">
      <label className="text-xl">Last Modified</label>
      <div className="relative border bg-gray-50 flex flex-col items-center justify-center p-2 rounded-md">
        <span onClick={toggleDateOpen} className="relative cursor-pointer">
          {`${format(selectionRange.startDate, "dd MMM, yyyy")} - ${format(
            selectionRange.endDate,
            "dd MMM, yyyy"
          )}`}
        </span>
        <div className="absolute top-full left-1 mt-2 z-10">
          {openDate && (
            <DateRangePicker
              className=""
              ranges={[selectionRange]}
              onChange={handleSelect}
              minDate={new Date()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DateCompAnalyst;
