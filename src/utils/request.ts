import { Message } from '@/components/Widget';
import { apiPrefixMock, tokenKey } from '@/config';
import axios, { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import { MD5 } from 'crypto-js';
import { isEmpty, isNil, pick, toLower, toUpper } from 'lodash';
import { getStore, local_token } from './storage';

interface IPending {
  quotes: Array<{ token: string; cancel: Canceler }>;
  remove(token: string): void;
}

const codeMessage: Map<string, string> = new Map()
  .set('200', '服务器成功返回请求的数据。')
  .set('201', '新建或修改数据成功。')
  .set('202', '一个请求已经进入后台排队（异步任务）。')
  .set('204', '删除数据成功。')
  .set('400', '发出的请求有错误，服务器没有进行新建或修改数据的操作。')
  .set('401', '用户没有权限（令牌、用户名、密码错误）。')
  .set('403', '用户得到授权，但是访问是被禁止的。')
  .set('404', '发出的请求针对的是不存在的记录，服务器没有进行操作。')
  .set('406', '请求的格式不可得。')
  .set('410', '请求的资源被永久删除，且不会再得到的。')
  .set('422', '当创建一个对象时，发生一个验证错误。')
  .set('500', '服务器发生错误，请检查服务器。')
  .set('502', '网关错误。')
  .set('503', '服务不可用，服务器暂时过载或维护。')
  .set('504', '网关超时。');

const pending: IPending = {
  quotes: [],
  remove(token: string) {
    this.quotes = this.quotes.filter((item) => item.token !== token);
  },
};

axios.defaults.timeout = 30000;

axios.interceptors.request.use(
  (config) => {
    let newUrl = config.url || '';
    if (process.env.NODE_ENV == 'pre_production') {
      const apiInfo = ['/ims/', '/ims-base/', '/ims-user/'];
      apiInfo.forEach((item) => {
        if (newUrl.split(item).length > 1) {
          newUrl = newUrl.split(item).join(`${item.slice(0, -1)}-pre/`);
        }
      });
    }

    if (toUpper(config.method) === 'GET') {
      config.params = {
        _refreshTime: Date.now(),
        ...config.params,
      };
    }

    const token = MD5(
      JSON.stringify(
        pick(config, ['headers', 'data', 'url', 'method', 'params']),
      ),
    ).toString();

    const repeat = pending.quotes.filter((values) => values.token === token);
    repeat.forEach((item) => {
      item.cancel();
      pending.remove(item.token);
    });

    config.cancelToken = new axios.CancelToken(function executor(cancel) {
      pending.quotes.push({ token, cancel });
    });

    // @ts-ignore
    config.token = token;
    return {
      ...config,
      url: newUrl,
    };
  },
  (error) => {
    error.message = error.__CANCEL__ ? '请求被取消' : error.message;
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    // @ts-ignore
    pending.remove(response.config.token);
    return response;
  },
  (error) => {
    error.message = error.__CANCEL__ ? '请求被取消' : error.message;
    return Promise.reject(error);
  },
);

function requestCatch({
  response,
  message: text,
}: {
  response: AxiosResponse;
  message: string;
}) {
  const { data, status, statusText } = response || {};

  if (data) {
    Message(data.msg, 'error');
  } else if (status) {
    Message(codeMessage.get(String(status)) || '', 'error');
  }

  if (
    (status === 401 || status === 403) &&
    toLower(window.location.pathname).indexOf('gateway') === -1
  ) {
    window.localStorage.clear();
    window.localStorage.href = `${window.location.origin}/ims-app/gateway.html?url=${window.location.href}`;
  }

  return Promise.reject(new Error(statusText || text));
}

export function request(params: AxiosRequestConfig) {
  const token = getStore(local_token);
  const headerConf: AxiosRequestConfig['headers'] = { ...params.headers };
  const crmUserFirst = getStore('crmUserFirst');
  if (crmUserFirst) {
    const { realname = '', userId = '' } = crmUserFirst;
    headerConf['crmUserId'] = userId;
    headerConf['crmUserName'] = encodeURI(realname);
  }

  if (!isNil(token) && !isEmpty(token)) headerConf[tokenKey] = token;
  return axios({
    ...params,
    url: `${apiPrefixMock}${params.url}`,
    headers: headerConf,
  })
    .then((response) => {
      const {
        data: { data, code, msg },
      } = response;
      if (code === '-1') {
        Message(msg, 'warning');
        return Promise.reject(new Error(msg));
      }
      if (code !== 0 && code != 200) {
        Message(msg, 'error');
        return Promise.reject(new Error(msg));
      }
      return data;
    })
    .catch(requestCatch);
}

export function getRawData(params: AxiosRequestConfig) {
  const token = getStore(local_token);
  const headerConf: AxiosRequestConfig['headers'] = { ...params.headers };
  if (!isNil(token) && !isEmpty(token)) headerConf[tokenKey] = token;
  return axios({
    ...params,
    url: `${apiPrefixMock}${params.url}`,
    headers: headerConf,
  })
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch(requestCatch);
}
