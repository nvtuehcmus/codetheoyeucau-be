import { rGetRequests } from 'shared/core/repo/Requests/rGetRequests';
import { ObjectId } from 'mongodb';
import { REQUEST } from 'shared/types/modal';

export const sListRequest = async (pageSize: number, id?: ObjectId, tags?: string[]): Promise<REQUEST[]> => {
  const requests = await rGetRequests(pageSize, false, id, tags);

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
    description: request.description
  }));
};
