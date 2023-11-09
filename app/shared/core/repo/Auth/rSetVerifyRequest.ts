import { COLLECTION, DB } from 'shared/types/db';
import { getCurrentUTC } from 'shared/helpers/dateHelper';

export const rSetSendVerifyRequest = async (userName: string, otp: string, numberOfSendOTP: number, type: 'VERIFY' | 'FORGOT'): Promise<void> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.VERIFY);

  await collection.updateOne(
    { username: userName },
    {
      $set: {
        otp,
        number_of_submit_OTP: 0,
        number_of_send_OTP: numberOfSendOTP,
        updated_at: getCurrentUTC(),
        type
      }
    },
    { upsert: true }
  );
};

export const rSetSubmitVerifyRequest = async (userName: string, numberOfSubmitOTP: number): Promise<void> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.VERIFY);

  await collection.updateOne({ username: userName }, { $set: { number_of_submit_OTP: numberOfSubmitOTP } });
};
