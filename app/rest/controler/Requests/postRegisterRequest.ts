import express from 'express';
import { responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { Context } from 'shared/core/context';
import jwt, { JwtPayload } from 'jsonwebtoken';
import process from 'process';
import { sGetUserProfile } from 'shared/core/services/User/sGetUserProfile';
import { is, tr } from 'date-fns/locale';

interface REGISTER_PAYLOAD {
  title: string;
  description: string;
  subject: string;
  address?: string;
  fee: string;
  feeFollowing: 'PROJECT' | 'MONTH' | 'SESSION' | 'WEEK' | 'HOUR';
  isHideDescription?: boolean;
  contact?: string;
  location: string;
}

export const postRegisterRequest = async (
  ctx: Context,
  req: express.Request<any, any, REGISTER_PAYLOAD>,
  res: express.Response
) => {
  const { title, description, subject, address, fee, feeFollowing, isHideDescription, contact, location } = req.body;

  if (!title) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }
  if (!description) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }
  if (!subject) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }
  if (!fee) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }
  if (!feeFollowing) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }
  if (!location) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }

  if (title.length > 255) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    return;
  }
  if (description.length > 255) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    return;
  }
  if (subject.length > 255) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    return;
  }
  if (address && address.length > 255) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    return;
  }
  if (fee.length > 255) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    return;
  }
  if (!['PROJECT', 'MONTH', 'SESSION', 'WEEK', 'HOUR'].includes(feeFollowing)) {
    responseError(new LogError(ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC'), req, res);
    return;
  }
  if (contact && contact.length > 255) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    return;
  }
  if (location.length > 255) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    return;
  }

  // responseSuccess(req, res, { data: user });
};
