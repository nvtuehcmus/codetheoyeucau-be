import { getCurrentUTC } from 'shared/helpers/dateHelper';
import { COLLECTION, DB } from 'shared/types/db';
import bcrypt from 'bcrypt';

export const rInsertRequests = async (
  username: string,
  title: string,
  description: string,
  subject: string,
  address: string,
  fee: string,
  feeFollowing: string,
  isHideDescription: boolean,
  contact: string
) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.REQUESTS);

  await collection.insertOne({
    title,
    description,
    subject,
    address: address ?? '',
    fee,
    contact: contact ?? '',
    fee_following: feeFollowing,
    is_hide_description: isHideDescription,
    created_by: username,
    created_at: getCurrentUTC(),
    status: 'PENDING',
    register_queue: [],
    registered: '',
    registered_fee: 0,
  });
};
