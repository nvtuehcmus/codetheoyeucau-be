import { COLLECTION, DB } from 'shared/types/db';
import bcrypt from 'bcrypt';

export const rUpdateUserPassword = async (userName: string, password: string): Promise<void> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.USERS);
  const hashPassword = bcrypt.hashSync(password, 10);

  await collection.updateOne({ username: userName }, { $set: { password: hashPassword } });
};
