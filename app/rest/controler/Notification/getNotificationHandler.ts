import { Context, responseError, responseSuccess } from 'shared/core/context';
import express from 'express';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { getTokenPayload } from 'shared/helpers';
import process from 'process';
import { JwtPayload } from 'jsonwebtoken';
import { sGetNotice } from 'shared/core/services/Notification/sGetNotice';
import { ObjectId } from 'mongodb';
import { toObjectId } from 'shared/helpers/parser';

export const getNotificationHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  if (!req.headers.authorization) {
    responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
    return;
  }

  let noticeId: ObjectId = toObjectId(req.params.id);

  const payload = getTokenPayload(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '');

  const notices = await sGetNotice((payload as JwtPayload).username, noticeId);

  responseSuccess(req, res, { data: notices });
};
