import { phoneRegex } from './regex';

export const phoneValidation = (phoneNumber: string): boolean => {
  const testInstance = new RegExp(phoneRegex);
  return testInstance.test(phoneNumber);
};

export const prettierPhoneNumber = (phoneNumber: string) => {
  const cleanedNumber = phoneNumber.replace(/\D+/g, '');
  return cleanedNumber.replace(/^0/, '84');
};
