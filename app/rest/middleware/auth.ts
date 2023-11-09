import express from 'express';
import jwt from 'jsonwebtoken';
import { responseError } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';

export const auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!req.headers.authorization) {
      responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
      return;
    }
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '');
    return next();
  } catch (error) {
    responseError(new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION'), req, res);
  }
};
