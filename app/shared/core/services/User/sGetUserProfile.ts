import { phoneValidation, prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { rGetUserByUsername } from 'shared/core/repo/User/rGetUser';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { USER_PROFILE } from 'shared/types/modal';

export const sGetUserProfile = async (username: string): Promise<USER_PROFILE> => {
  let _username = username;

  if (phoneValidation(username)) {
    _username = prettierPhoneNumber(username);
  }

  const user = await rGetUserByUsername(_username);

  if (!user) {
    throw new LogError(ErrorVars.E002_USER_NOT_EXISTS, 'LOGIC');
  }
  if (user.isBlocked) {
    throw new LogError(ErrorVars.E012_USER_IS_BLOCKED, 'LOGIC');
  }
  if (user.deletedAt) {
    throw new LogError(ErrorVars.E013_USER_IS_DELETED, 'LOGIC');
  }
  if (!user.active) {
    throw new LogError(ErrorVars.E005_USER_PENDING, 'LOGIC');
  }

  const { password, active, isBlocked, deletedAt, ..._user } = user;

  return _user;
};
