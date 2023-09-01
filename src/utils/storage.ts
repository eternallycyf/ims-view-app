import { isNil } from 'lodash';

export const setStore = (name: string, content: any, maxAge?: number) => {
  if (!global.window || !name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }

  let storage = global.window.localStorage;
  storage.setItem(name, content);
  if (!isNil(maxAge) && !isNil(storage)) {
    const timeout = parseInt(String(new Date().getTime() / 1000));
    const timeoutKey = `${name}__expires__`;
    storage.setItem(timeoutKey, String(timeout + maxAge));
  }
};

export const getStore = (name: string) => {
  if (!global.window || !name) return;

  let content = window.localStorage.getItem(name);
  let __expires__ = window.localStorage.getItem(`${name}__expires__`);

  if (__expires__) {
    let now = parseInt(String(new Date().getTime() / 1000));
    if (now > parseInt(__expires__)) return;
  }
  try {
    return JSON.parse(content || '');
  } catch (error) {
    return content;
  }
};

export const clearStore = (name: string) => {
  if (!global.window || !name) return;

  window.localStorage.removeItem(name);
  window.localStorage.removeItem(`${name}__expires__`);
};

export const clearAll = () => {
  if (!global.window) return;
  window.localStorage.clear();
};

export const local_user = 'local_user';
export const local_token = 'local_token';
