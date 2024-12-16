import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { FC, useRef, useState, useEffect } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";

interface SelectionRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

const DateCompAdmin: FC = () => {
  const [openDate, setOpenDate] = useState<boolean>(false);

  const [selectionRange, setSelectionRange] = useState<SelectionRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    setSelectionRange({
      ...selectionRange,
      startDate: selection.startDate || new Date(),
      endDate: selection.endDate || new Date(),
    });
  };

  const toggleDateOpen = () => {
    setOpenDate((open) => !open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target as Node)
    ) {
      setOpenDate(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <label className="text-xl">From - To</label>
      <div
        ref={datePickerRef}
        className="relative border bg-gray-50 flex flex-col items-center justify-center p-2 rounded-md"
      >
        <span onClick={toggleDateOpen} className="relative cursor-pointer">
          {`${format(selectionRange.startDate, "dd MMM, yyyy")} - ${format(
            selectionRange.endDate,
            "dd MMM, yyyy"
          )}`}
        </span>
        <div className="absolute top-full mt-2 z-10 border shadow-lg">
          {openDate && (
            <DateRangePicker
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

export default DateCompAdmin;
