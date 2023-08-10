export const generateOTP = () => {
  const OTP_LENGTH = 4;

  let otp = '';

  for (let i = 0; i < OTP_LENGTH; i++) {
    const digit = Math.floor(Math.random() * 10);
    otp += digit.toString();
  }

  return otp;
};

export const utf8ToBase64 = (str: string) => {
  const encoded = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  });

  return btoa(encoded);
};
