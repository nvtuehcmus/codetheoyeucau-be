import { COLLECTION, DB } from 'shared/types/db';

export const rGetTags = async (): Promise<string[]> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.TAGS);

  const result = await collection.find({}).toArray();

  return result[0].tags as string[];
};
