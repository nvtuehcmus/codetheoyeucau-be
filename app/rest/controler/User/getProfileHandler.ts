import express from 'express';
import { responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { Context } from 'shared/core/context';
import jwt, { JwtPayload } from 'jsonwebtoken';
import process from 'process';
import { sGetUserProfile } from 'shared/core/services/User/sGetUserProfile';

export const getProfileHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  if (!req.headers.authorization) {
    responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
    return;
  }
  const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '');

  const user = await sGetUserProfile((payload as JwtPayload).username);

  responseSuccess(req, res, { data: user });
};
