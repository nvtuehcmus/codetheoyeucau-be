export type USERS = {
  id: string;
  username: string;
  password: string;
  active: boolean;
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'MALE' | 'FEMALE';
  email: string;
  avatarUrl: string;
  address: string;
  deletedAt: Date | null;
  isBlocked: boolean;
};

export type USER_PROFILE = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'MALE' | 'FEMALE';
  email: string;
  avatarUrl: string;
  address: string;
};

export type ITEM = {
  name: string;
  ratio: number;
  quantity: number;
  id: number;
};

export type SESSION = {
  id: string;
  items: ITEM[];
  archive: boolean;
  name: string;
  createdBy: string;
  form: string[];
  limit: number;
};

export type CUSTOMER = {
  [key: string]: any;
  id: string;
  item: null | number;
  limit: number;
};

export type VERIFY = {
  id: string;
  updatedAt: Date;
  username: string;
  numberOfSendOTP: number;
  numberOfSubmitOTP: number;
  otp: string;
  type: 'VERIFY' | 'FORGOT';
};
