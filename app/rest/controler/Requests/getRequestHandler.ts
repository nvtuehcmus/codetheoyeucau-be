import express from 'express';
import { Context, responseSuccess } from 'shared/core/context';
import process from 'process';
import { getTokenPayload } from 'shared/helpers';
import { JwtPayload } from 'jsonwebtoken';
import { sGetRequestDetail } from 'shared/core/services/Requests/sGetRequestDetail';
export const getRequestHandler = async (
  ctx: Context,
  req: express.Request<{ request_id?: string }>,
  res: express.Response
) => {
  let username = '';
  if (req.headers.authorization) {
    username = (getTokenPayload(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '') as JwtPayload)
      .username;
  }
  const request = await sGetRequestDetail(username, req.params.request_id ?? '', false);
  responseSuccess(req, res, request);
};
