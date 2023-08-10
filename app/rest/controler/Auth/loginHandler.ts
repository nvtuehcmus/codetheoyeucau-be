import express from 'express';
import { phoneValidation } from 'shared/helpers/phoneHelper';
import { emailValidation } from 'shared/helpers/emailHelper';
import { responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { sLogin } from 'shared/core/services/Auth/sLogin';
import { Context } from 'shared/core/context';

type LoginPayload = {
  username: string;
  password: string;
};
export const loginHandler = async (
  ctx: Context,
  req: express.Request<any, any, LoginPayload>,
  res: express.Response
) => {
  if (!req.body.username || (req.body.username && !phoneValidation(req.body.username))) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.password || (req.body.password && !req.body.password.trim())) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  const token = await sLogin(req.body.username, req.body.password);

  responseSuccess(req, res, { token });
};
