import { Context } from 'shared/core/context';
import express from 'express';
import { LogError } from 'shared/core/error/logError';
import { responseError, responseSuccess } from 'shared/core/context';
import { ErrorVars } from 'shared/core/error/errorVars';
import { phoneValidation } from 'shared/helpers/phoneHelper';
import { emailValidation } from 'shared/helpers/emailHelper';
import { sRegister } from 'shared/core/services/Auth/sRegister';
import { sSendToken } from 'shared/core/services/Sender/sSendToken';

type RegisterPayload = {
  username: string;
  password: string;
};
export const registerHandler = async (
  ctx: Context,
  req: express.Request<any, any, RegisterPayload>,
  res: express.Response
) => {
  if (
    !req.body.username ||
    (req.body.username && !(phoneValidation(req.body.username) || emailValidation(req.body.username)))
  ) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.password || (req.body.password && !req.body.password.trim())) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  await sRegister(req.body.username, req.body.password);

  responseSuccess(req, res, {}, true);
};
