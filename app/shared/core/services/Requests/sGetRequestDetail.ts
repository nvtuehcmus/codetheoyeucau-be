import { rGetRequest } from 'shared/core/repo/Requests/rGetRequest';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { REQUEST_DETAIL } from 'shared/types/modal';
import { userValidation } from 'shared/core/services/helpers/userValidation';

export const sGetRequestDetail = async (username: string, requestId: string, isAdmin: boolean): Promise<REQUEST_DETAIL> => {
  await userValidation(username);
  const request = await rGetRequest(requestId);

  if (!request) {
    throw new LogError(ErrorVars.E028_REQUEST_ID_NOT_EXISTS, 'LOGIC');
  }

  if (isAdmin) {
    return request;
  }

  if (['ASSIGN', 'DONE'].includes(request.status) && request.assignTo !== username) {
    throw new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION');
  }

  if (['ASSIGN', 'DONE'].includes(request.status) && request.assignTo === username) {
    if (!request.contact) {
      request.contact = request.createdBy;
    }
    const { requestQueue, ...rest } = request;
    return rest;
  }

  if (request.createdBy === username) {
    if (!request.contact) {
      request.contact = request.createdBy;
    }
    const { requestQueue, ...rest } = request;
    return rest;
  }
  const { contact, requestQueue, address, assignTo, ...rest } = request;
  if (rest.createdBy !== username) {
    rest.createdBy = undefined;
  }

  return rest;
};
