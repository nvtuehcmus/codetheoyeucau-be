export const getCurrentUTC = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }));

export const isToday = (dateToCheck: Date) => {
  const currentDate = new Date();

  return dateToCheck.getFullYear() === currentDate.getFullYear() && dateToCheck.getMonth() === currentDate.getMonth() && dateToCheck.getDate() === currentDate.getDate();
};

export const isDistanceGatherThan = (dateToCheck: Date, distance: number) => {
  const currentDate = new Date();
  const differenceInMillis = Math.abs(currentDate.getTime() - dateToCheck.getTime());

  return differenceInMillis > distance;
};
