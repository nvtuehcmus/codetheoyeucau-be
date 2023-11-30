import express from 'express';
import { Context, responseError, responseSuccess } from 'shared/core/context';
import process from 'process';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { sPutRegisterRequest } from 'shared/core/services/Requests/sPutRegisterRequest';

export const putRegisterRequestHandler = async (ctx: Context, req: express.Request<{ request_id?: string }>, res: express.Response) => {
  if (!req.headers.authorization) {
    responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
    return;
  }
  const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '');

  await sPutRegisterRequest((payload as JwtPayload).username, req.params.request_id ?? '');

  responseSuccess(req, res, {}, true);
};
