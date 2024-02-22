export type {
  ISearchesType,
  IUpdateSearchType,
  IUpdateSearchesType,
  Search,
} from './form';
export type {
  Dict,
  FORM_TYPE_DICT,
  FormControlType,
  IBaseControlProps,
  IControlProps,
  IFetchConfig,
} from './form/base';
export type { IBaseCustomFormItemProps } from './form/formItem';
export type {
  AddIndexSignature,
  AnyObject,
  CamelCase,
  DeepPartial,
  DeepPromiseValueType,
  DeepReadonly,
  Defaultize,
  GetOptional,
  GetRequired,
  IsEqual,
  IsNever,
  IsTuple,
  IsUnion,
  LiteralUnion,
  Merge,
  NotEqual,
  ObjectPaths,
  PartialObjectPropByKeys,
  Paths,
  RemoveIndexSignature,
  SnakeCase,
  UnionToIntersection,
  ValueOf,
  WithNativeStyle,
  isRequired,
} from './type';

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
