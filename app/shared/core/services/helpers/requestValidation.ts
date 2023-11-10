import { emailValidation } from 'shared/helpers/emailHelper';
import { prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { rGetUserByUsername } from 'shared/core/repo/User/rGetUser';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { REQUEST_DETAIL, REQUEST_STATUS, USERS } from 'shared/types/modal';
import { rGetRequest } from 'shared/core/repo/Requests/rGetRequest';

export const requestValidation = async (requestId: string): Promise<REQUEST_DETAIL> => {
  const request = await rGetRequest(requestId);

  if (!request) {
    throw new LogError(ErrorVars.E028_REQUEST_ID_NOT_EXISTS, 'LOGIC');
  }
  if (!(request.status === REQUEST_STATUS.PENDING)) {
    throw new LogError(ErrorVars.E029_REQUEST_NOT_AVAILABLE, 'LOGIC');
  }
  if (request.deletedAt || request.isCancel) {
    throw new LogError(ErrorVars.E029_REQUEST_NOT_AVAILABLE, 'LOGIC');
  }

  return request;
};
