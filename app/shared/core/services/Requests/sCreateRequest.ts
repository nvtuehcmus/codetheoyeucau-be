import { userValidation } from 'shared/core/services/helpers/userValidation';
import { rGetTodayRequestsByUser } from 'shared/core/repo/Requests/rGetRequest';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';

export const sCreateRequest = async (username: string) => {
  const user = await userValidation(username);
  const todayRequests = await rGetTodayRequestsByUser(username);
  if (todayRequests.length >= 3) {
    throw new LogError(ErrorVars.E017_LIMIT_CREATE_REQUEST_FOR_TODAY, 'LOGIC');
  }
};
