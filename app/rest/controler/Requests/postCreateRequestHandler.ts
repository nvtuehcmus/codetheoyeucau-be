import express from 'express';
import { REQUEST_FEE_TYPE } from 'shared/types/modal';
import { Context, responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { isStringArray, validationField } from 'shared/helpers';
import { decimalFee } from 'shared/helpers/regex';
import jwt, { JwtPayload } from 'jsonwebtoken';
import process from 'process';
import { sCreateRequest } from 'shared/core/services/Requests/sCreateRequest';
type CREATE_REQUEST_PAYLOAD = {
  title: string;
  description: string;
  address: string;
  contact?: string;
  feeType: REQUEST_FEE_TYPE;
  fee: string;
  tags?: string[];
};
export const postCreateRequestHandler = async (
  ctx: Context,
  req: express.Request<any, any, CREATE_REQUEST_PAYLOAD>,
  res: express.Response
) => {
  if (!req.headers.authorization) {
    responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
    return;
  }
  const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '');

  const validation = validationField(req.body, ['title', 'description', 'address', 'fee', 'feeType']);

  if (validation.length > 0) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC', validation), req, res);
    return;
  }

  if (req.body.title.length > 65) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC', ['title']), req, res);
    return;
  }

  if (req.body.description.length > 255) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC', ['description']), req, res);
    return;
  }

  if (req.body.address.length > 255) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC', ['address']), req, res);
    return;
  }

  if (req.body.contact && req.body.contact.length > 255) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC', ['contact']), req, res);
    return;
  }

  if (!(req.body.feeType in REQUEST_FEE_TYPE)) {
    responseError(new LogError(ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC', ['feeType']), req, res);
    return;
  }

  if (!(req.body.feeType in REQUEST_FEE_TYPE)) {
    responseError(new LogError(ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC', ['feeType']), req, res);
    return;
  }

  if (req.body.fee.length > 14) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC', ['fee']), req, res);
  }

  if (!decimalFee.test(req.body.fee)) {
    responseError(new LogError(ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC', ['fee']), req, res);
  }
  if (req.body.tags && req.body.tags.length > 0 && !isStringArray(req.body.tags)) {
    responseError(new LogError(ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC', ['tags']), req, res);
  }

  await sCreateRequest(
    (payload as JwtPayload).username,
    req.body.title,
    req.body.description,
    req.body.address,
    req.body.feeType,
    req.body.fee,
    req.body.contact,
    req.body.tags
  );

  responseSuccess(req, res, {}, true);
};
