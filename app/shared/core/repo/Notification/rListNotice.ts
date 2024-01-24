import { COLLECTION, DB } from 'shared/types/db';
import { NOTIFICATION_RESPONSE } from 'shared/types/modal';

export const rListNotice = async (username: string): Promise<NOTIFICATION_RESPONSE[]> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.NOTIFICATION);

  const result = await collection
    .find({ $or: [{ username: username }, { username: null }] })
    .limit(50)
    .sort({ _id: -1 })
    .toArray();

  return result.map((r) => ({
    id: r._id.toString(),
    title: r.title,
    description: r.description,
    read: r.read,
    createdAt: r.created_at,
    username: r.username
  }));
};
