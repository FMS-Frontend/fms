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

interface DateCompProps {
  onDateChange?: (dateRange: { startDate: Date; endDate: Date }) => void;
}

const DateComp: FC<DateCompProps> = ({ onDateChange }) => {
  const [openDate, setOpenDate] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();
  const [selectionRange, setSelectionRange] = useState<SelectionRange>({
    // startDate: new Date(),
    // endDate: new Date(),
    startDate: new Date(currentYear, 0, 1), 
    endDate: new Date(currentYear, 11, 31),
    key: "selection",
  });

  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    const updatedRange = {
      startDate: selection.startDate || new Date(),
      endDate: selection.endDate || new Date(),
      key: "selection",
    };
    setSelectionRange(updatedRange);

    if (onDateChange) {
      onDateChange({ startDate: updatedRange.startDate, endDate: updatedRange.endDate });
    }
  };

  const toggleDateOpen = () => {
    setOpenDate((open) => !open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
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
        <div className="absolute top-full left-1 mt-2 z-10 border shadow-lg">
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

export default DateComp;
