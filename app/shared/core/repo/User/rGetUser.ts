import { COLLECTION, DB } from 'shared/types/db';
import { USERS } from 'shared/types/modal';

export const rGetUserByUsername = async (username: string): Promise<USERS | null> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.USERS);

  const user = await collection.findOne({ username });

  if (!user) {
    return null;
  }

  return {
    id: user._id.toString(),
    username: user.username,
    password: user.password,
    active: user.active,
    lastName: user.last_name,
    firstName: user.first_name,
    dob: user.dob,
    gender: user.gender,
    email: user.email,
    address: user.address,
    avatarUrl: user.avatar_url,
    isBlocked: user.is_blocked,
    deletedAt: user.deleted_at,
    tags: user.tags,
    verified: user.verified,
    school: user.school
  };
};
