import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import bcrypt from 'bcrypt';
import { rUpdateUserPassword } from 'shared/core/repo/Auth/rUpdateUserPassword';
import { userValidation } from 'shared/core/services/helpers/userValidation';

export const sChangePassword = async (username: string, oldPassword: string, newPassword: string): Promise<void> => {
  const user = await userValidation(username);

  if (!bcrypt.compareSync(oldPassword, user.password)) {
    throw new LogError(ErrorVars.E003_PASSWORD_NOT_CORRECT, 'LOGIC');
  }

  await rUpdateUserPassword(user.username, newPassword);
};
