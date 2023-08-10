import express from 'express';
import { phoneValidation } from 'shared/helpers/phoneHelper';
import { emailValidation } from 'shared/helpers/emailHelper';
import { responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { Context } from 'shared/core/context';
import { sVerifyUserAccount } from 'shared/core/services/Auth/sVerifyUserAccount';

type VerifyPayload = {
  username: string;
  otp: string;
};
export const verifyOTPHandler = async (
  ctx: Context,
  req: express.Request<any, any, VerifyPayload>,
  res: express.Response
) => {
  if (
    !req.body.username ||
    (req.body.username && !(phoneValidation(req.body.username) || emailValidation(req.body.username)))
  ) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.otp || (req.body.otp && req.body.otp.length !== 4)) {
    responseError(new LogError(ErrorVars.E006_OPT_INVALID, 'LOGIC'), req, res);
    return;
  }
  if (phoneValidation(req.body.username)) {
    await sVerifyUserAccount(req.body.username, req.body.otp);
  }

  responseSuccess(req, res, {}, true);
};
