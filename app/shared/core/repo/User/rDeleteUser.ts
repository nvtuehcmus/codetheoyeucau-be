import { COLLECTION, DB } from 'shared/types/db';

export const rDeleteUser = async (username: string): Promise<void> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.USERS);

  await collection.deleteOne({ username });

  // await collection.updateOne(
  //   { username },
  //   {
  //     $set: {
  //       deleted_at: new Date(),
  //     },
  //   }
  // );
};
