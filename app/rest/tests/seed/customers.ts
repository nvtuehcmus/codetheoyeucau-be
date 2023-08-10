import { Db } from 'mongodb';
import { COLLECTION } from '../../../shared/types/db';

export const customersSeeding = async (db: Db) => {
  const collection = await db.collection(COLLECTION.CUSTOMERS);
  const sessionsCollection = await db.collection(COLLECTION.SESSIONS);
  const session_1 = await sessionsCollection.findOne({ id: 1 });
  // const session_2 = await sessionsCollection.findOne({ id: 2 });

  await collection.insertMany([
    {
      phone_number: '84344465655',
      session_id: session_1?._id.toString(),
      limit: 3,
      age: 20,
      email: 'test_1@example.com',
      item: null,
    },
    {
      phone_number: '84344465655',
      session_id: session_1?._id.toString(),
      limit: 0,
      age: 18,
      email: 'test_2@example.com',
      item: 2,
    },
  ]);
};
