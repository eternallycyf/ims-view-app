import { ICustomerItemProps } from '@/typings';
import { request } from '@/utils/request';
import { postAction } from './global';

export function fetchToken() {
  return postAction('/login');
}

export function fetchUserInfo(params?: any, cancelToken?: any) {
  return request({
    params,
    url: '/fetchUserInfo',
    method: 'POST',
    cancelToken,
  });
}

export function fetchMenu() {
  return postAction('/fetchMenu');
}

export function fetchAccessCollection() {
  return postAction('/fetchAccessCollection');
}

export function getCustomerList(
  kw?: string,
): Promise<Array<ICustomerItemProps>> {
  return request({
    url: '/getCustomerList',
    params: { kw },
  });
}
