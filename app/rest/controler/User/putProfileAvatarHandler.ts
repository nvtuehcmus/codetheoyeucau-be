import express from 'express';
import { responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { Context } from 'shared/core/context';
import { getTokenPayload } from 'shared/helpers';
import { sEditUserProfile } from 'shared/core/services/User/sEditUserAvatar';
import { JwtPayload } from 'jsonwebtoken';

export const putProfileAvatarHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  if (!req.headers.authorization) {
    responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
    return;
  }
  const payload = getTokenPayload(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '');

  if (!req.file) {
    throw new LogError(ErrorVars.E025_UPLOAD_DATA_FAILURE, 'INTEGRATION');
  }

  const extension = req.file.mimetype.split('/')[1];

  await sEditUserProfile((payload as JwtPayload).username, req.file.buffer, extension);

  responseSuccess(req, res, {}, true);
};
