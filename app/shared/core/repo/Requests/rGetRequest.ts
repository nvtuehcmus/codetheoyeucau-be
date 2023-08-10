import { COLLECTION, DB } from 'shared/types/db';

export const rGetTodayRequestsByUser = async (username: string) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.REQUESTS);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return await collection
    .find({
      username,
      created_at: {
        $gte: today,
        $lt: tomorrow,
      },
    })
    .toArray();
};
