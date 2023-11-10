import { COLLECTION, DB } from 'shared/types/db';

export const rUpdateRequestQueue = async (requestId: string, username: string, requestQueue: string[]) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.REQUESTS);

  await collection.updateOne(
    { request_id: requestId },
    {
      $set: { request_queue: requestQueue }
    }
  );
};
