import { COLLECTION, DB } from 'shared/types/db';
import { ObjectId } from 'mongodb';
import { REQUEST_DETAIL, REQUEST_STATUS } from 'shared/types/modal';

export const rGetTodayRequestsByUser = async (username: string) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.REQUESTS);

  const now = new Date();
  const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  return await collection
    .find({
      username,
      created_at: {
        $gte: now,
        $lt: twentyFourHoursFromNow
      }
    })
    .toArray();
};

export const rGetRequests = async (pageSize: number, isAdmin: boolean, id?: ObjectId, tags?: string[], status?: string[] | undefined, requestId?: string, isDelete?: boolean, createdBy?: string): Promise<REQUEST_DETAIL[]> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.REQUESTS);

  const query: { $and: any[] } = { $and: [] };

  if (id) {
    query.$and.push({
      _id: {
        $gt: id
      }
    });
  }

  if (tags && tags.length > 0) {
    query.$and.push({
      $in: tags
    });
  }

  if (status && status.length > 0) {
    query.$and.push({ $in: status });
  }

  if (requestId) {
    query.$and.push({ request_id: requestId });
  }

  if (isDelete) {
    query.$and.push({ deleted_at: { $ne: null } });
  }

  if (createdBy) {
    query.$and.push({ created_by: createdBy });
  }

  if (!isAdmin) {
    query.$and.push({ status: REQUEST_STATUS.APPROVE });
    query.$and.push({ deleted_at: null });
    query.$and.push({
      request_queue: { $exists: true, $not: { $size: 5 } }
    });
    query.$and.push({ is_cancel: false });
  }

  const requests = await collection.find(query).limit(pageSize).sort({ _id: -1 }).toArray();

  return requests.map((request) => ({
    id: request._id.toString(),
    requestId: request.request_id,
    title: request.title,
    description: request.description,
    address: request.address,
    contact: request.contact,
    feeType: request.fee_type,
    fee: request.fee,
    tags: request.tags,
    paid: request.paid,
    status: request.status,
    assignTo: request.assign_to,
    deletedAt: request.deleted_at,
    createdAt: request.created_at,
    requestQueue: request.request_queue,
    isCancel: request.is_cancel,
    createdBy: request.created_by
  }));
};
