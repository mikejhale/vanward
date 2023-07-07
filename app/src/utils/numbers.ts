export const countBitsSet = (value: number) => {
  let count: number = 0;
  while (value > 0) {
    value &= value - 1;
    count++;
  }
  return count;
};

export const isBitSet = (order: number, value: number) => {
  return (value & (1 << (order - 1))) !== 0;
};
