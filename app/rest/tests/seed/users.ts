import { Db } from 'mongodb';
import { COLLECTION } from '../../../shared/types/db';

export const usersSeeding = async (db: Db) => {
  const collection = await db.collection(COLLECTION.USERS);

  await collection.insertMany([
    {
      username: '84344465655',
      password: '$2b$10$/XQl75Ef2QzgG.IjxWCCYudUeZ8xXSuZ.FO001RNvRPscHH97qtEW', // admin@123
      active: true
    },

    {
      username: '84344465656',
      password: '$2b$10$/XQl75Ef2QzgG.IjxWCCYudUeZ8xXSuZ.FO001RNvRPscHH97qtEW', // admin@123
      active: false
    },
    {
      username: '84344465657',
      password: '$2b$10$/XQl75Ef2QzgG.IjxWCCYudUeZ8xXSuZ.FO001RNvRPscHH97qtEW', // admin@123
      active: true
    },
    {
      username: '84344465658',
      password: '$2b$10$/XQl75Ef2QzgG.IjxWCCYudUeZ8xXSuZ.FO001RNvRPscHH97qtEW', // admin@123
      active: false
    }
  ]);
};
