import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import theme from "@/theme/theme";

dayjs.extend(utc);

type DurationPickerProps = {
  isReadOnly: boolean;
  selectedStartDate: string | null;
  selectedEndDate: string | null;
  onStartDateSelectionChange: (stringDateValue: string | null) => void;
  onEndDateSelectionChange: (stringDateValue: string | null) => void;
};

const DurationPicker = ({
  isReadOnly,
  selectedStartDate,
  selectedEndDate,
  onStartDateSelectionChange,
  onEndDateSelectionChange,
}: DurationPickerProps) => {
  const handleStartDateChange = (startDate: Dayjs | null) => {
    const dateString = startDate ? startDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : null;
    onStartDateSelectionChange(dateString);
    if (
      selectedEndDate &&
      startDate &&
      dayjs(selectedEndDate).isBefore(startDate)
    ) {
      onEndDateSelectionChange(null);
    }
  };
  
  const handleEndDateChange = (endDate: Dayjs | null) => {
    const dateString = endDate ? endDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : null;
    onEndDateSelectionChange(dateString);
  };  

  return (
    <Box display="flex" gap={2}>
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
          format="YYYY/MM/DD"
          value={selectedStartDate ? dayjs(selectedStartDate) : null}
          onChange={handleStartDateChange}
          slotProps={{
            textField: { size: "small" },
          }}
          readOnly={isReadOnly}
        />
        <DatePicker
          label="종료"
          name="endDate"
          sx={{
            flex: 1,
            "& .MuiInputBase-root": { p: 1 },
            "& .MuiIconButton-root:hover": {
              color: theme.palette.primary.main,
              backgroundColor: "transparent",
            },
          }}
          format="YYYY/MM/DD"
          minDate={selectedStartDate ? dayjs(selectedStartDate) : undefined}
          value={selectedEndDate ? dayjs(selectedEndDate) : null}
          onChange={handleEndDateChange}
          slotProps={{ textField: { size: "small" } }}
          readOnly={isReadOnly}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DurationPicker;
