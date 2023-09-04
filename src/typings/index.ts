declare global {
  interface window {}
}

export interface IPagingProps<T> {
  currPage: number;
  list: Array<T>;
  pageSize: number;
  totalCount: number;
  totalPage: number;
}

// 用户信息
export interface UserInfo<T> {
  userId?: T;
  groupId?: T;
  username?: string;
  nickname?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  authority?: string[];
  [otherField: string]: any;
}

export interface ICustomerItemProps {
  creditNo?: string;
  id?: string;
  nameAndDept?: string;
  text?: string;
}
