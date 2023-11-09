import { COLLECTION, DB } from 'shared/types/db';
import { VERIFY } from 'shared/types/modal';

export const rGetVerifyRequest = async (username: string): Promise<VERIFY | null> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.VERIFY);

  const verifyRequest = await collection.findOne({ username });

  if (!verifyRequest) {
    return null;
  }

  return {
    id: verifyRequest._id.toString(),
    numberOfSendOTP: verifyRequest.number_of_send_OTP,
    numberOfSubmitOTP: verifyRequest.number_of_submit_OTP,
    username: verifyRequest.username,
    updatedAt: verifyRequest.updated_at,
    otp: verifyRequest.otp,
    type: verifyRequest.type
  };
};
