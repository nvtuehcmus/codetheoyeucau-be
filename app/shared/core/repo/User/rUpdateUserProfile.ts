import { COLLECTION, DB } from 'shared/types/db';

export const rUpdateUserProfile = async (username: string, lastName: string, firstName: string, gender: 'MALE' | 'FEMALE', address: string, email: string, dob: string): Promise<void> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.USERS);

  const payload: { [key: string]: string | undefined } = {
    last_name: lastName,
    first_name: firstName,
    gender,
    address,
    email,
    dob
  };

  Object.keys(payload).map((key) => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  await collection.updateOne(
    { username },
    {
      $set: payload
    }
  );
};
