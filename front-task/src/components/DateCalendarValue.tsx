import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const DateCalendarValue = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  /*  if (value) {
      console.log('Day:', value.date());
      console.log('Month:', value.month() + 1);
      console.log('Year:', value.year());
    }*/
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
  );
};

export default DateCalendarValue;
