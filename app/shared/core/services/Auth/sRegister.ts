import { rGetUserByUsername } from 'shared/core/repo/User/rGetUser';
import { phoneValidation, prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { rInsertUser } from 'shared/core/repo/User/rInsertUser';
import { sSendToken } from 'shared/core/services/Sender/sSendToken';

export const sRegister = async (username: string, password: string): Promise<void> => {
  let _username = username;

  if (phoneValidation(username)) {
    _username = prettierPhoneNumber(username);
  }

  const user = await rGetUserByUsername(_username);

  if (user && user.deletedAt) {
    throw new LogError(ErrorVars.E013_USER_IS_DELETED, 'LOGIC');
  }

  if (user && user.active) {
    throw new LogError(ErrorVars.E004_USER_EXISTS, 'LOGIC');
  }

  await sSendToken(_username, 'VERIFY');
  if (!user) {
    await rInsertUser(_username, password);
  }
};
