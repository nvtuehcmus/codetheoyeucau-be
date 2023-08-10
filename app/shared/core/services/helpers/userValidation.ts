import { emailValidation } from 'shared/helpers/emailHelper';
import { prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { rGetUserByUsername } from 'shared/core/repo/User/rGetUser';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { USERS } from 'shared/types/modal';

export const userValidation = async (username: string): Promise<USERS> => {
  if (!emailValidation(username)) {
    username = prettierPhoneNumber(username);
  }

  const user = await rGetUserByUsername(username);

  if (!user) {
    throw new LogError(ErrorVars.E002_USER_NOT_EXISTS, 'LOGIC');
  }
  if (!user.active) {
    throw new LogError(ErrorVars.E005_USER_PENDING, 'LOGIC');
  }
  if (user.deletedAt) {
    throw new LogError(ErrorVars.E013_USER_IS_DELETED, 'LOGIC');
  }

  return user;
};
