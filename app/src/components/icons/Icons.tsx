import { Icon, useColorModeValue } from '@chakra-ui/react';

export const VanwardLogo = () => {
  let logoColor = useColorModeValue('brand.500', 'brand.500');

  return (
    <Icon viewBox='0 0 600 600' boxSize={12} fill={logoColor} color={logoColor}>
      <svg
        version='1.1'
        viewBox='0 0 512 512'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g>
          <path d='m169.25 177.07h-140.8l48.355-98.703c2.7148-5.5195 6.9297-10.168 12.16-13.41 5.2305-3.2461 11.266-4.9531 17.422-4.9336h33.281z' />
          <path d='m177.49 210.2 60.871 241.78c-2.8438-1.707-208.93-239.79-209.92-241.78z' />
          <path d='m300.09 210.2-44.375 175.36-44.09-175.36z' />
          <path d='m203.23 177.07-29.438-117.05h164.27l-29.582 117.05z' />
          <path d='m334.36 210.2h149.19c-0.99609 1.8477-207.5 240.21-210.49 241.78z' />
          <path d='m483.55 177.07h-140.94l29.582-117.19h33.281c6.1836 0.015625 12.238 1.7539 17.488 5.0195s9.4883 7.9297 12.234 13.469c12.516 25.602 35.129 71.539 48.355 98.703z' />
        </g>
      </svg>
    </Icon>
  );
};
