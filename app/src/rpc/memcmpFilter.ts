export const getFilter = (offset: number, value: string) => {
  return [
    {
      memcmp: {
        offset: offset,
        bytes: value,
      },
    },
  ];
};
