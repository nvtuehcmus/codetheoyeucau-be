import { phoneValidation, prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { rGetUserByUsername } from 'shared/core/repo/User/rGetUser';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { rUpdateUserProfile } from 'shared/core/repo/User/rUpdateUserProfile';
import { validationField } from 'shared/helpers';

export const sEditUserProfile = async (username: string, last_name: string, first_name: string, gender: 'MALE' | 'FEMALE', address: string, email: string, dob: string, tags: string[] | undefined, school: string): Promise<void> => {
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

  if (!user.verified) {
    const payload = {
      last_name,
      first_name,
      gender,
      address,
      email,
      dob,
      tags,
      school
    };

    const validate = validationField(payload, ['last_name', 'first_name', 'gender', 'address', 'email', 'dob', 'tags', 'school']);

    if (validate.length > 0) {
      throw new LogError(ErrorVars.E035_REQUIRE_VERIFY_INFORMATION, 'LOGIC');
    }
  }

  await rUpdateUserProfile(_username, last_name, first_name, gender, address, email, dob, tags, school);
};
