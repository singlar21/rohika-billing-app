export enum UserType {
  VENDOR = 'VENDOR',
  CUSTOMER = 'CUSTOMER'
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  userType: UserType;
  createdAt: string;
  aliasName: string;
  countryCode: number;
}
