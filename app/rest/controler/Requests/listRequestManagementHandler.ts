import { Context, responseError, responseSuccess } from 'shared/core/context';
import express from 'express';
import { arrayParser, toObjectId } from 'shared/helpers/parser';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { getTokenPayload, isInteger } from 'shared/helpers';
import { sListRequest } from 'shared/core/services/Requests/sListRequest';
import { sListRequestManagement } from 'shared/core/services/Requests/sListRequestManagement';
import { REQUEST_STATE_STATUS } from 'shared/types/modal';
import { JwtPayload } from 'jsonwebtoken';

export const listRequestManagementHandler = async (ctx: Context, req: express.Request<any, any, any, { id?: string; pageSize?: string; filter?: string }>, res: express.Response) => {
  if (!req.headers.authorization) {
    responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
    return;
  }

  if (req.query.id) {
    toObjectId(req.query.id);
  }

  if (!req.query.pageSize) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC'), req, res);
    return;
  }
  if (!isInteger(req.query.pageSize)) {
    responseError(new LogError(ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC'), req, res);
    return;
  }
  if (Number(req.query.pageSize) > 50) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
    return;
  }
  if (!['CANCEL', 'ASSIGN', 'CREATED'].includes(req.query.filter ?? '')) {
    responseError(new LogError(ErrorVars.E016_FIELD_VALUE_INVALID, 'LOGIC'), req, res);
    return;
  }

  const payload = getTokenPayload(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '');

  const requests = await sListRequestManagement((payload as JwtPayload).username, Number(req.query.pageSize), req.query.filter as REQUEST_STATE_STATUS, req.query.id ? toObjectId(req.query.id) : undefined);

  responseSuccess(req, res, { data: requests });
};
