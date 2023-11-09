import express from 'express';

export const cors = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  /**
   * Response settings
   * @type {Object}
   */
  const accessControlAllowHeaders = ['Content-Type,X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version', 'X-File-Name', 'Authentication'];
  const responseSettings = {
    AccessControlAllowHeaders: accessControlAllowHeaders.join(','),
    AccessControlAllowOrigin: '*',

    AccessControlAllowCredentials: true,
    AccessControlAllowMethods: 'POST, GET, PUT, DELETE, OPTIONS'
  };

  /**
   * Headers
   */
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', responseSettings.AccessControlAllowOrigin);
  res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] ? req.headers['access-control-request-headers'] : 'x-requested-with');
  res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method'] ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
