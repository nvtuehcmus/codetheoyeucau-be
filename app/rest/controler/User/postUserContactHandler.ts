import express from 'express';
import { Context, responseError, responseSuccess } from 'shared/core/context';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { validationField } from 'shared/helpers';
import { phoneValidation } from 'app/shared/helpers/phoneHelper';
import { sCreateUserContact } from 'app/shared/core/services/User/sCreateUserContact';
type CREATE_INFO_SUBMIT_PAYLOAD = {
  phoneNumber: string;
  fullName: string;
  description: string;
};

export const postUserContactHandler = async (ctx: Context, req: express.Request<any, any, CREATE_INFO_SUBMIT_PAYLOAD>, res: express.Response) => {
  const validation = validationField(req.body, ['phoneNumber', 'fullName', 'description']);

  if (validation.length > 0) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC', validation), req, res);
    return;
  }

  if (req.body.phoneNumber && !phoneValidation(req.body.phoneNumber)) {
    responseError(new LogError(ErrorVars.E001_MISSING_DATA, 'LOGIC', ['phoneNumber']), req, res);
    return;
  }

  if (req.body.fullName.length > 25) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC', ['fullName']), req, res);
    return;
  }

  if (req.body.description.length > 320) {
    responseError(new LogError(ErrorVars.E014_FIELD_LENGTH_INVALID, 'LOGIC', ['description']), req, res);
    return;
  }

  await sCreateUserContact(req.body.phoneNumber, req.body.fullName, req.body.description);

  responseSuccess(req, res, {}, true);
};
