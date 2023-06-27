import { Icon } from '@chakra-ui/react';
import { TiLockClosed, TiLockOpen } from 'react-icons/ti';

type EnrollmentStatusProps = {
  enrolleeCount: number;
  maxEnrollees: number;
  endDate: number;
};

const EnrollmentStatus = (props: EnrollmentStatusProps) => {
  let isOpen = true;
  if (props.maxEnrollees > 0) {
    // if enrollees = max set as closed
    if (props.enrolleeCount >= props.maxEnrollees) {
      isOpen = false;
    }
  } else if (props.endDate > 0) {
    // check if props.enddate is in the past
    if (props.endDate < Date.now()) {
      isOpen = false;
    }
  }

  return isOpen ? (
    <Icon
      ml={2}
      color='green.500'
      boxSize={8}
      aria-label='Open'
      as={TiLockOpen}
      title='Enrollment open'
    />
  ) : (
    <Icon
      ml={2}
      color='red.500'
      aria-label='closed'
      boxSize={8}
      as={TiLockClosed}
      title='Enrollment closed'
    />
  );
};

export default EnrollmentStatus;
