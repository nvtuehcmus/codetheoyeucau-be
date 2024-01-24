import { Context, responseError, responseSuccess } from 'shared/core/context';
import express from 'express';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { getTokenPayload } from 'shared/helpers';
import process from 'process';
import { sListNotice } from 'shared/core/services/Notification/sListNotice';
import { JwtPayload } from 'jsonwebtoken';

export const listNotificationHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  if (!req.headers.authorization) {
    responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
    return;
  }

  const payload = getTokenPayload(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '');

  const notices = await sListNotice((payload as JwtPayload).username);

  responseSuccess(req, res, { data: notices });
};
