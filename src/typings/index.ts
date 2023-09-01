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
