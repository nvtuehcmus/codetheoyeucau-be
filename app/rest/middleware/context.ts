import express from 'express';
import * as uuid from 'uuid';

export const context = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let requestId: string = '';

  if (requestId === '') {
    requestId = uuid.v4();
  }
  res.locals.ctx = {
    requestId,
    logger: global.logger.child({
      request_id: requestId,
      agent: req.headers['user-agent'],
      url: `${req.method} ${req.hostname + req.url}`
    })
  };

  next();
};
