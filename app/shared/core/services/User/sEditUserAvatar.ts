import { phoneValidation, prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { S3Instance } from 'shared/core/libs/AWS';
import { rUpdateUserImage } from 'shared/core/repo/User/rUpdateUserImage';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { rGetUserByUsername } from 'shared/core/repo/User/rGetUser';

export const sEditUserProfile = async (username: string, buffer: Buffer, extension: string) => {
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

  const s3Instance = new S3Instance();
  try {
    const url = await s3Instance.putImage(_username, `avatar.${extension}`, buffer);
    rUpdateUserImage(_username, url);
    return url;
  } catch (e: any) {
    throw new LogError(ErrorVars.E025_UPLOAD_DATA_FAILURE, 'INTEGRATION', {}, e);
  }
};
