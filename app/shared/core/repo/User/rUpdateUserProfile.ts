import { COLLECTION, DB } from 'shared/types/db';

export const rUpdateUserProfile = async (username: string, lastName: string, firstName: string, gender: 'MALE' | 'FEMALE', address: string, email: string, dob: string, tags: string[] | undefined, school: string): Promise<void> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.USERS);

  const payload: { [key: string]: string | undefined | string[] | boolean } = {
    last_name: lastName,
    first_name: firstName,
    verified: true,
    gender,
    address,
    email,
    dob,
    tags,
    school
  };

  Object.keys(payload).map((key) => {
    if (payload[key] === undefined || payload[key] === '') {
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
