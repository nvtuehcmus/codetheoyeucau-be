import { ObjectId } from 'mongodb';
import { REQUEST_DETAIL, REQUEST_STATE_STATUS } from 'shared/types/modal';
import { COLLECTION, DB } from 'shared/types/db';

export const rListRequestManager = async (username: string, pageSize: number, status: REQUEST_STATE_STATUS, id?: ObjectId): Promise<REQUEST_DETAIL[]> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.REQUESTS);

  let query: any;

  switch (status) {
    case REQUEST_STATE_STATUS.CREATED:
      query = {
        $and: [
          {
            created_by: username
          },
          {
            is_cancel: false
          }
        ]
      };
      break;
    case REQUEST_STATE_STATUS.ASSIGN:
      query = {
        $and: [
          {
            assign_to: username
          },
          {
            is_cancel: false
          }
        ]
      };
      break;
    case REQUEST_STATE_STATUS.CANCEL:
      query = {
        $and: [
          { $or: [{ assign_to: username }, { created_by: username }] },
          {
            is_cancel: true
          }
        ]
      };
      break;
  }

  if (id) {
    query.$and.push({
      _id: {
        $gt: id
      }
    });
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
