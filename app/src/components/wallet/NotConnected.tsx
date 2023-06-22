import { FC, useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

export const NotConnected: FC = () => {
  return (
    <Box>
      <Text>Connect wallet first</Text>
    </Box>
  );
};
