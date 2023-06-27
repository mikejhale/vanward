import { useState } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

const DatePicker = (props: any) => {
  let startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  const [endDate, setEndDate] = useState(startDate);

  props.selectDate(endDate.getTime() / 1000);

  return (
    <SingleDatepicker
      name='date-input'
      date={endDate}
      onDateChange={setEndDate}
      minDate={new Date()}
      propsConfigs={{
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            //background: 'red',
            _hover: {
              background: 'brand.400',
            },
          },
          selectedBtnProps: {
            background: 'brand.800',
            color: 'gray.200',
          },
        },
        inputProps: {
          size: 'md',
          color: useColorModeValue('gray.800', 'gray.200'),
        },
        popoverCompProps: {
          popoverContentProps: {
            background: useColorModeValue('white', 'navy.800'),
          },
        },
      }}
    />
  );
};

export default DatePicker;
