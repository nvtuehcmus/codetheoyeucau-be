import { sSendToken } from 'shared/core/services/Sender/sSendToken';
import { Context, responseError } from 'shared/core/context';
import express from 'express';
import { phoneValidation } from 'shared/helpers/phoneHelper';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { responseSuccess } from 'shared/core/context';

export const requestOTPHandler = async (ctx: Context, req: express.Request<any, any, { username: string }>, res: express.Response) => {
  if (!req.body.username || (req.body.username && !phoneValidation(req.body.username))) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  await sSendToken(req.body.username, 'VERIFY');

  responseSuccess(req, res, {}, true);
};
