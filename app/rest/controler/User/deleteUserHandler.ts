import { Context, responseError, responseSuccess } from 'shared/core/context';
import express from 'express';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import jwt, { JwtPayload } from 'jsonwebtoken';
import process from 'process';
import { sDeleteUser } from 'shared/core/services/User/sDeleteUser';
import { getTokenPayload } from 'shared/helpers';

export const deleteUserHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  if (!req.headers.authorization) {
    responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
    return;
  }

  const payload = getTokenPayload(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '');

  await sDeleteUser((payload as JwtPayload).username);
  responseSuccess(req, res, {});
};
