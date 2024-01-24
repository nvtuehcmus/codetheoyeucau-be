import { ObjectId } from 'mongodb';
import { REQUEST, REQUEST_STATE_STATUS } from 'shared/types/modal';
import { userValidation } from 'shared/core/services/helpers/userValidation';
import { rListRequestManager } from 'shared/core/repo/Requests/rListUserRequests';
import { rGetUserByUsername } from 'shared/core/repo/User/rGetUser';

export const sListRequestManagement = async (username: string, pageSize: number, filter: REQUEST_STATE_STATUS, id?: ObjectId): Promise<REQUEST[]> => {
  await userValidation(username);
  const requests = await rListRequestManager(username, pageSize, filter, id);

  return requests.map((request) => ({
    id: request.id,
    tags: request.tags,
    requestId: request.requestId,
    deletedAt: request.deletedAt,
    fee: request.fee,
    feeType: request.feeType,
    createdAt: request.createdAt,
    paid: request.paid,
    title: request.title,
    description: request.description,
    address: request.address,
    contact: request.contact ?? request.createdBy
  }));
};
