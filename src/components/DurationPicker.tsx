import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import theme from "@/theme/theme";
import SkeletonTextField from "@/components/SkeletonTextField";

type DurationPickerProps = {
  selectedStartDate: string | null;
  selectedEndDate: string | null;
  onStartDateSelectionChange: (stringDateValue: string | null) => void;
  onEndDateSelectionChange: (stringDateValue: string | null) => void;
  isLoading?: boolean;
};

const DurationPicker = ({
  selectedStartDate,
  selectedEndDate,
  onStartDateSelectionChange,
  onEndDateSelectionChange,
  isLoading = false,
}: DurationPickerProps) => {
  const handleStartDateChange = (startDate: Dayjs | null) => {
    const dateString = startDate ? dayjs(startDate).format("YYYY-MM-DD") : null;
    onStartDateSelectionChange(dateString);
  };

  const handleEndDateChange = (endDate: Dayjs | null) => {
    const dateString = endDate ? dayjs(endDate).format("YYYY-MM-DD") : null;
    onEndDateSelectionChange(dateString);
  };

  return (
    <Box display="flex" gap={2}>
      {isLoading ? (
        <>
          <SkeletonTextField />
          <SkeletonTextField />
        </>
      ) : (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="시작"
            name="startDate"
            sx={{
              flex: 1,
              "& .MuiInputBase-root": { p: 1 },
              "& .MuiIconButton-root:hover": {
                color: theme.palette.primary.main,
                backgroundColor: "transparent",
              },
            }}
            value={selectedStartDate ? dayjs(selectedStartDate) : null}
            onChange={(date) => handleStartDateChange(date)}
            slotProps={{
              textField: { size: "small" },
            }}
          />
          <DatePicker
            label="마감"
            name="endDate"
            sx={{
              flex: 1,
              "& .MuiInputBase-root": { p: 1 },
              "& .MuiIconButton-root:hover": {
                color: theme.palette.primary.main,
                backgroundColor: "transparent",
              },
            }}
            value={selectedEndDate ? dayjs(selectedEndDate) : null}
            onChange={(date) => handleEndDateChange(date)}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
      )}
    </Box>
  );
};

export default DurationPicker;
