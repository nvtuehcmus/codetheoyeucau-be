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
  avatar_url: string,
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

  await rUpdateUserProfile(_username, last_name, first_name, address, email, avatar_url, dob);
};
