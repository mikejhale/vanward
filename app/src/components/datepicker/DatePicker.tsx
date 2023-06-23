import { useState, useEffect } from 'react';
import { useColorModeValue, useColorMode } from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

/*
const darkPropsConfig = {
  dateNavBtnProps: {
    colorScheme: 'brand',
    variant: 'outline',
  },
  dayOfMonthBtnProps: {
    defaultBtnProps: {
      borderColor: 'brand.300',
      _hover: {
        background: 'brand.400',
      },
    },
    selectedBtnProps: {
      background: 'brand.200',
      color: 'brand.500',
    },
    todayBtnProps: {
      background: 'brand.400',
    },
  },
  inputProps: {
    size: 'sm',
    color: 'greeen',
  },
  popoverCompProps: {
    popoverContentProps: {
      background: 'gray.700',
      color: 'white',
    },
  },
};

const lightPropsConfig = {
  dateNavBtnProps: {
    colorScheme: 'brand',
    variant: 'outline',
  },
  dayOfMonthBtnProps: {
    defaultBtnProps: {
      borderColor: 'red',
      _hover: {
        background: 'purple',
      },
    },
    selectedBtnProps: {
      background: 'white',
      color: 'yellow',
    },
    todayBtnProps: {
      background: 'teal',
    },
  },
  inputProps: {
    size: 'sm',
    color: 'red',
  },
  popoverCompProps: {
    popoverContentProps: {
      background: 'gray.700',
      color: 'white',
    },
  },
};
*/
const DatePicker = (props: any) => {
  const [dateColorMode, setDateColorMode] = useState(null);
  const { colorMode } = useColorMode();

  let startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  const [endDate, setEndDate] = useState(startDate);

  props.selectDate(Date.parse(endDate) / 1000);

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
