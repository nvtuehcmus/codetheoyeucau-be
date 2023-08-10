import express from 'express';
import { responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { Context } from 'shared/core/context';
import jwt, { JwtPayload } from 'jsonwebtoken';
import process from 'process';
import { emailValidation } from 'shared/helpers/emailHelper';
import { isValidDOB } from 'shared/core/services/helpers/dateValidation';
import { sEditUserProfile } from 'shared/core/services/User/sEditUserProfile';

export const putEditProfileHandler = async (
  ctx: Context,
  req: express.Request<
    any,
    any,
    {
      lastName: string;
      firstName: string;
      address: string;
      email: string;
      avatarUrl: string;
      dob: string;
    }
  >,
  res: express.Response
) => {
  if (!req.headers.authorization) {
    responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
    return;
  }

  const { lastName, firstName, address, avatarUrl, email, dob } = req.body;

  if (lastName && lastName.length > 39) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
  }
  if (firstName && firstName.length > 39) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
  }
  if (address && address.length > 256) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
  }
  if (avatarUrl && avatarUrl.length > 256) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
  }
  if (email && email.length > 256) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
  }
  if (email && !emailValidation(email)) {
    responseError(new LogError(ErrorVars.E008_EMAIL_INVALID, 'LOGIC'), req, res);
  }
  if (dob && !isValidDOB(dob)) {
    responseError(new LogError(ErrorVars.E015_DATE_IS_NOT_VALID, 'LOGIC'), req, res);
  }

  const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.RESET_PASSWORD_TOKEN ?? '');

  const user = await sEditUserProfile(
    (payload as JwtPayload).username,
    lastName,
    firstName,
    address,
    email,
    avatarUrl,
    dob
  );

  responseSuccess(req, res, { data: user });
};
