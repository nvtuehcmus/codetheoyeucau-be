import { getCurrentUTC } from 'shared/helpers/dateHelper';
import { COLLECTION, DB } from 'shared/types/db';
import { CUSTOMER_CONTACT_STATUS } from 'shared/types/modal';
export const rInsertCustomerContact = async (phoneNumber: string, fullName: string, description: string) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.CUSTOMER_CONTACT);

  await collection.insertOne({
    phone_number: phoneNumber,
    full_name: fullName,
    description,
    status: CUSTOMER_CONTACT_STATUS.PENDING,
    created_at: getCurrentUTC(),
    deleted_at: null
  });
};
