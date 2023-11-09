import { getCurrentUTC } from 'shared/helpers/dateHelper';
import { COLLECTION, DB } from 'shared/types/db';
import { REQUEST_FEE_TYPE, REQUEST_STATUS } from 'shared/types/modal';

export const rInsertRequests = async (username: string, requestId: string, title: string, description: string, address: string, feeType: REQUEST_FEE_TYPE, fee: string, contact?: string, tags?: string[]) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.REQUESTS);

  await collection.insertOne({
    title,
    description,
    fee_type: feeType,
    address: address,
    request_id: requestId,
    fee,
    contact: contact ?? null,
    created_by: username,
    created_at: getCurrentUTC(),
    status: REQUEST_STATUS.PENDING,
    request_queue: [],
    assign_to: null,
    registered_fee: 0,
    tags,
    paid: null,
    is_cancel: false,
    deleted_at: null
  });
};
