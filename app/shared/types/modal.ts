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
  tags: string[];
  verified: boolean;
  school: string;
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
  tags: string[];
  verified: boolean;
  school: string;
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

export enum REQUEST_STATUS {
  PENDING = 'PENDING',
  APPROVE = 'APPROVE',
  ASSIGN = 'ASSIGN',
  DONE = 'DONE'
}

export enum REQUEST_FEE_TYPE {
  MONTH = 'MONTH',
  WEEK = 'WEEK',
  DAY = 'DAY',
  HOUR = 'HOUR',
  PROJECT = 'PROJECT'
}

export interface REQUEST {
  id: string;
  requestId: string;
  title: string;
  description: string;
  address?: string;
  requestQueue?: string[];
  feeType: REQUEST_FEE_TYPE;
  fee: string;
  paid: string;
  tags?: string[];
  createdAt: string;
  deletedAt: string;
}

export interface REQUEST_DETAIL extends REQUEST {
  assignTo?: string;
  contact?: string;
  status: REQUEST_STATUS;
  isCancel?: boolean;
  createdBy?: string;
}

export enum CUSTOMER_CONTACT_STATUS {
  PENDING = 'PENDING',
  SOLVED = 'SOLVED'
}

export enum REQUEST_STATE_STATUS {
  'CANCEL' = 'CANCEL',
  'ASSIGN' = 'ASSIGN',
  'CREATED' = 'CREATED'
}

export type NOTIFICATION_RESPONSE = {
  id: string;
  title: string;
  description: string;
  read: boolean;
  username: string | null;
  createdAt: string;
};
