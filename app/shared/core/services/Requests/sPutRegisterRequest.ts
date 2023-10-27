import { rGetRequest } from 'shared/core/repo/Requests/rGetRequest';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { userValidation } from 'shared/core/services/helpers/userValidation';
import { rUpdateRequestQueue } from 'shared/core/repo/Requests/rUpdateRequestQueue';

export const sPutRegisterRequest = async (username: string, requestId: string) => {
  await userValidation(username);
  const currentRequest = await rGetRequest(requestId);

  if (!currentRequest) {
    throw new LogError(ErrorVars.E028_REQUEST_ID_NOT_EXISTS, 'LOGIC');
  }

  if (currentRequest.deletedAt || currentRequest.status in ['ASSIGN', 'DONE', 'PENDING']) {
    throw new LogError(ErrorVars.E029_REQUEST_NOT_AVAILABLE, 'LOGIC');
  }

  if (currentRequest.createdBy === username) {
    throw new LogError(ErrorVars.E030_UNABLE_SUBMIT_REQUEST, 'LOGIC');
  }

  if (currentRequest.requestQueue?.length === 5) {
    throw new LogError(ErrorVars.E031_LIMIT_SUBMIT_REQUEST, 'LOGIC');
  }

  if (currentRequest?.requestQueue && username in currentRequest.requestQueue) {
    throw new LogError(ErrorVars.E032_DUPLICATE_SUBMIT_REQUEST, 'LOGIC');
  }

  const newRequestQueue = currentRequest?.requestQueue ? [...currentRequest.requestQueue] : [];
  newRequestQueue.push(username);

  await rUpdateRequestQueue(requestId, username, newRequestQueue);
};
