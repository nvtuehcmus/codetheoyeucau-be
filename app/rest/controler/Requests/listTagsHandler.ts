import { Context, responseSuccess } from 'shared/core/context';
import express from 'express';
import { sListTags } from 'shared/core/services/Requests/sListTags';

export const listTagsHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  const tags = await sListTags();

  responseSuccess(req, res, { data: tags });
};
