import { userValidation } from 'shared/core/services/helpers/userValidation';
import { rGetTodayRequestsByUser } from 'shared/core/repo/Requests/rGetRequests';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { REQUEST_FEE_TYPE } from 'shared/types/modal';
import { generateRequestId } from 'shared/helpers';
import { rInsertRequests } from 'shared/core/repo/Requests/rInsertRequests';

export const sCreateRequest = async (username: string, title: string, description: string, address: string, feeType: REQUEST_FEE_TYPE, fee: string, contact?: string, tags?: string[]) => {
  await userValidation(username);
  const todayRequests = await rGetTodayRequestsByUser(username);
  if (todayRequests.length >= 5) {
    throw new LogError(ErrorVars.E017_LIMIT_CREATE_REQUEST_FOR_TODAY, 'LOGIC');
  }

  const requestId = generateRequestId();

  await rInsertRequests(username, requestId, title, description, address, feeType, fee, contact, tags);
};
