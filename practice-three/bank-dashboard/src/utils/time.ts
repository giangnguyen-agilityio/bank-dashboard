export const convertDateToTimestamp = (dateString: string) => {
  const date = new Date(dateString);
  return date.getTime();
};
