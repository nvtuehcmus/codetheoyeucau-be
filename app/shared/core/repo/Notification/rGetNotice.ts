import { COLLECTION, DB } from 'shared/types/db';
import { NOTIFICATION_RESPONSE } from 'shared/types/modal';
import { ObjectId } from 'mongodb';

export const rGetNotice = async (username: string, id: ObjectId): Promise<NOTIFICATION_RESPONSE | null> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.NOTIFICATION);

  const result = await collection.findOne({ $and: [{ $or: [{ username: username }, { username: null }] }, { _id: id }] });

  if (!result) {
    return null;
  }

  return {
    id: result._id.toString(),
    title: result.title,
    description: result.description,
    read: result.read,
    createdAt: result.created_at,
    username: result.username
  };
};
