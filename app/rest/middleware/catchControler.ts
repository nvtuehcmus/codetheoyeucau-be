import express from 'express';
import { responseError } from 'shared/core/context';
import { Context } from 'shared/core/context';

export const catchHandler = (handler: (ctx: Context, req: express.Request, res: express.Response) => void) => {
  return async (req: express.Request, res: express.Response) => {
    try {
      await handler(res.locals.ctx, req, res);
    } catch (e) {
      responseError(e, req, res);
    }
  };
};
