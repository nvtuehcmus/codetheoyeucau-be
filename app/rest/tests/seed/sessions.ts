import { Db } from 'mongodb';
import { COLLECTION } from '../../../shared/types/db';

export const sessionsSeeding = async (db: Db) => {
  const collection = await db.collection(COLLECTION.SESSIONS);

  await collection.insertMany([
    {
      id: 1,
      items: [
        {
          name: 'pen',
          ratio: 0.5,
          quantity: -1,
          id: 1
        },
        {
          name: 'book',
          ratio: 0.35,
          quantity: 0,
          id: 2
        },
        {
          name: 'calculator',
          ratio: 0.15,
          quantity: 1,
          id: 3
        },
        {
          name: 'Iphone 15',
          ratio: 0,
          quantity: 0,
          id: 4
        }
      ],
      archive: false,
      created_by: '84344465655',
      name: 'spin.vn',
      form: ['email', 'phone_number', 'age'],
      limit: 3
    },

    {
      id: 2,
      items: [
        {
          name: 'pen',
          ratio: 0.5,
          quantity: -1,
          id: 1
        },
        {
          name: 'book',
          ratio: 0.35,
          quantity: 0,
          id: 2
        },
        {
          name: 'calculator',
          ratio: 0.15,
          quantity: 1,
          id: 3
        },
        {
          name: 'Iphone 15',
          ratio: 0,
          quantity: 0,
          id: 4
        }
      ],
      archive: false,
      created_by: '84344465657',
      name: 'spin.vn',
      form: null,
      limit: 3
    }
  ]);
};
