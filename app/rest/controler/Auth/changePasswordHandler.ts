import express from 'express';
import { responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { Context } from 'shared/core/context';
import { sChangePassword } from 'shared/core/services/Auth/sChangePassword';
import jwt, { JwtPayload } from 'jsonwebtoken';
import process from 'process';

type ChangePasswordType = {
  username: string;
  oldPassword: string;
  newPassword: string;
};
export const changePasswordHandler = async (ctx: Context, req: express.Request<any, any, ChangePasswordType>, res: express.Response) => {
  if (!req.headers.authorization) {
    responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
    return;
  }
  const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '');

  if (!req.body.oldPassword || !req.body.newPassword) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.oldPassword.trim() || !req.body.newPassword.trim()) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  await sChangePassword((payload as JwtPayload).username, req.body.oldPassword, req.body.newPassword);

  responseSuccess(req, res, {}, true);
};
