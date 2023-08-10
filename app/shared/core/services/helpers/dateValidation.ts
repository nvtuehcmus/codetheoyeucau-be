import { parse, isValid, isDate } from 'date-fns';

export const isValidDOB = (dateString: string) => {
  if (!dateString) {
    return false;
  }

  const dateFormat = 'dd/MM/yyyy';

  if (!isDate(parse(dateString, dateFormat, new Date()))) {
    return false;
  }

  return isValid(parse(dateString, dateFormat, new Date()));
};
