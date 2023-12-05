import { COLLECTION, DB } from 'shared/types/db';
import { getCurrentUTC } from 'shared/helpers/dateHelper';
import bcrypt from 'bcrypt';

export const rInsertUser = async (username: string, password: string): Promise<void> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.USERS);
  const hashPassword = bcrypt.hashSync(password, 10);

  await collection.insertOne({
    username,
    password: hashPassword,
    active: false,
    created_at: getCurrentUTC(),
    deleted_at: null,
    is_blocked: false,
    verified:false
  });
};
