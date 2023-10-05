import { phoneValidation, prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { rGetUserByUsername } from 'shared/core/repo/User/rGetUser';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { rDeleteUser } from 'shared/core/repo/User/rDeleteUser';
import { rUpdateUserProfile } from 'shared/core/repo/User/rUpdateUserProfile';

export const sEditUserProfile = async (
  username: string,
  last_name: string,
  first_name: string,
  address: string,
  email: string,
  avatarImg: Buffer,
  dob: string
): Promise<void> => {
  let _username = username;

  if (phoneValidation(username)) {
    _username = prettierPhoneNumber(username);
  }

  const user = await rGetUserByUsername(_username);

  if (!user) {
    throw new LogError(ErrorVars.E002_USER_NOT_EXISTS, 'LOGIC');
  }
  if (!user.active) {
    throw new LogError(ErrorVars.E005_USER_PENDING, 'LOGIC');
  }
  if (user.deletedAt) {
    throw new LogError(ErrorVars.E013_USER_IS_DELETED, 'LOGIC');
  }
  if (user.isBlocked) {
    throw new LogError(ErrorVars.E012_USER_IS_BLOCKED, 'LOGIC');
  }

  await rUpdateUserProfile(_username, last_name, first_name, address, email, avatarImg, dob);
};
