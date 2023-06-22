import { useState } from 'react';
import {
  Calendar,
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
  CalendarDate,
} from '@uselessdev/datepicker';

const DatePicker = (props: any) => {
  const [date, setDate] = useState<CalendarDate>();

  const handleSelectDate = (date: CalendarDate) => setDate(date);
  return (
    <Calendar
      value={{ start: date }}
      onSelectDate={handleSelectDate}
      singleDateSelection
    >
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths>
        <CalendarMonth>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarDays />
        </CalendarMonth>
      </CalendarMonths>
    </Calendar>
  );
};

export default DatePicker;
