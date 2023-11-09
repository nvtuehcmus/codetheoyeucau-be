import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import * as process from 'process';
import { userValidation } from 'shared/core/services/helpers/userValidation';

export const sLogin = async (username: string, password: string): Promise<string> => {
  const user = await userValidation(username);

  if (!bcrypt.compareSync(password, user.password)) {
    throw new LogError(ErrorVars.E003_PASSWORD_NOT_CORRECT, 'LOGIC');
  }

  if (user.isBlocked) {
    throw new LogError(ErrorVars.E012_USER_IS_BLOCKED, 'LOGIC');
  }

  if (user.deletedAt) {
    throw new LogError(ErrorVars.E013_USER_IS_DELETED, 'LOGIC');
  }

  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      dob: user.dob,
      gender: user.gender,
      email: user.email,
      address: user.address,
      avatarUrl: user.avatarUrl
    },
    process.env.SECRET_TOKEN ?? ' '
  );
};
