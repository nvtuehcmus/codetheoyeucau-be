import { Services } from 'shared/types/service';

const sharedServices: Services = [
  // FPT services
  {
    base_url: process.env.FPT_API_URL ?? '',
    name: 'sms_service',
    services: {
      post_sign_in: 'POST /oauth2/token',
      post_sms_otp: 'POST /api/push-brandname-otp',
    },
  },
];

export default sharedServices;
