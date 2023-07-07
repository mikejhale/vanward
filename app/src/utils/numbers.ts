export const countBitsSet = (value: number) => {
  console.log('value', value);
  let count: number = 0;
  while (value > 0) {
    value &= value - 1;
    count++;
  }
  return count;
};

export const isBitSet = (order: number, value: number) => {
  const isSet = (value & (1 << (order - 1))) !== 0;
  return isSet;
};
