import { prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { rActiveStatus } from 'shared/core/repo/Auth/rActiveUser';
import { sVerifyOTP } from 'shared/core/services/Sender/sVerifyOTP';

export const sVerifyUserAccount = async (phoneNumber: string, token: string): Promise<void> => {
  const _phoneNumber = prettierPhoneNumber(phoneNumber);
  await sVerifyOTP(_phoneNumber, token, 'VERIFY');

  await rActiveStatus(_phoneNumber);
};
