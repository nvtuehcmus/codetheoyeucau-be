import { rGetRequest } from 'shared/core/repo/Requests/rGetRequest';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { REQUEST_DETAIL } from 'shared/types/modal';

export const sGetRequestDetail = async (
  username: string,
  requestId: string,
  isAdmin: boolean
): Promise<REQUEST_DETAIL> => {
  const request = await rGetRequest(requestId);

  if (!request) {
    throw new LogError(ErrorVars.E028_REQUEST_ID_NOT_EXISTS, 'LOGIC');
  }

  if (isAdmin) {
    return request;
  }

  if (request.status in ['ASSIGN', 'DONE'] && request.assignTo !== username) {
    throw new LogError(ErrorVars.E007_NOT_PERMISSION, 'AUTHORISATION');
  }

  if (request.status in ['ASSIGN', 'DONE'] && request.assignTo === username) {
    return request;
  }
  const { contact, address, assignTo, ...rest } = request;
  if (rest.createdBy !== username) {
    rest.createdBy = undefined;
  }

  return rest;
};
