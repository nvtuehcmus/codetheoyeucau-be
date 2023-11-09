import { COLLECTION, DB } from 'shared/types/db';
import { REQUEST_DETAIL } from 'shared/types/modal';

export const rGetRequest = async (requestId: string): Promise<REQUEST_DETAIL | null> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.REQUESTS);

  const request = await collection.findOne({ request_id: requestId });
  if (!request) {
    return null;
  }

  return {
    id: request._id.toString(),
    requestId: request.request_id,
    title: request.title,
    fee: request.fee,
    tags: request.tags,
    paid: request.paid,
    status: request.status,
    assignTo: request.assign_to,
    address: request.address,
    contact: request.contact,
    feeType: request.fee_type,
    createdAt: request.created_at,
    createdBy: request.created_by,
    description: request.description,
    deletedAt: request.deleted_at,
    isCancel: request.is_cancel,
    requestQueue: request.request_queue
  };
};
