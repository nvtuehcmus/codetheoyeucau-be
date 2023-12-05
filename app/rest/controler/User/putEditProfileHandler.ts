import express from 'express';
import { responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { Context } from 'shared/core/context';
import { JwtPayload } from 'jsonwebtoken';
import { emailValidation } from 'shared/helpers/emailHelper';
import { isValidDOB } from 'shared/core/services/helpers/dateValidation';
import { sEditUserProfile } from 'shared/core/services/User/sEditUserProfile';
import { getTokenPayload, isStringArray } from 'shared/helpers';

export const putEditProfileHandler = async (
  ctx: Context,
  req: express.Request<
    any,
    any,
    {
      lastName: string;
      firstName: string;
      gender: 'MALE' | 'FEMALE';
      dob: string;
      address: string;
      email: string;
      tags?: string[];
      school:string
    }
  >,
  res: express.Response
) => {
  const { lastName, firstName, address, email, dob, gender, tags,school } = req.body;
  if (!req.headers.authorization) {
    responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
    return;
  }

  if (lastName && lastName.length > 39) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
  }
  if (firstName && firstName.length > 39) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
  }
  if (address && address.length > 256) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
  }
  if (school && school.length > 256) {
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
  if (gender && gender !== 'MALE' && gender !== 'FEMALE') {
    responseError(new LogError(ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC'), req, res);
  }

  if (tags && tags.length > 0 && !isStringArray(tags)) {
    responseError(new LogError(ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC', ['tags']), req, res);
  }

  const payload = getTokenPayload(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '');

  await sEditUserProfile((payload as JwtPayload).username, lastName, firstName, gender, address, email, dob, tags, school);

  responseSuccess(req, res, {}, true);
};
