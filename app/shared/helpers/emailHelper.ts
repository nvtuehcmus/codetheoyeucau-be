import { emailRegex } from './regex';

export const emailValidation = (email: string) => {
  const testInstance = new RegExp(emailRegex);
  return testInstance.test(email);
};
