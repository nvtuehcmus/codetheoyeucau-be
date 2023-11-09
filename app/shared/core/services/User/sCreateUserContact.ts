import { rInsertCustomerContact } from 'shared/core/repo/User/rInsertUserContact';

export const sCreateUserContact = async (phoneNumber: string, fullName: string, description: string) => {
  await rInsertCustomerContact(phoneNumber, fullName, description);
};
