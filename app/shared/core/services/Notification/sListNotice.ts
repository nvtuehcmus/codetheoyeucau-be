import { userValidation } from 'shared/core/services/helpers/userValidation';
import { rListNotice } from 'shared/core/repo/Notification/rListNotice';
import { NOTIFICATION_RESPONSE } from 'shared/types/modal';

export const sListNotice = async (username: string): Promise<NOTIFICATION_RESPONSE[]> => {
  await userValidation(username);

  return await rListNotice(username);
};
