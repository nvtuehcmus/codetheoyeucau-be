import { Context, responseError, responseSuccess } from 'shared/core/context';
import express from 'express';
import { arrayParser, toObjectId } from 'shared/helpers/parser';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { isInteger } from 'shared/helpers';
import { sListRequest } from 'shared/core/services/Requests/sListRequest';

export const listRequestHandler = async (ctx: Context, req: express.Request<any, any, any, { id?: string; pageSize?: string; tags?: string }>, res: express.Response) => {
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

  let tags: string[] | undefined = undefined;
  if (req.query.tags) {
    tags = arrayParser(req.query.tags);
    if (tags && tags.length > 5) {
      responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC'), req, res);
      return;
    }
  }
  const requests = await sListRequest(Number(req.query.pageSize), req.query.id ? toObjectId(req.query.id) : undefined, tags);

  responseSuccess(req, res, { data: requests });
};
