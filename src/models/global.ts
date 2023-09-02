import * as service from '@/services';
import { UserInfo } from '@/typings';
import { Effect } from 'dva';
import { Reducer } from 'redux';
import {
  breadcrumbNameMap as BREAD_CRUMB_NAEMMAP,
  menuList as MENU_LIST,
} from './constant';

export interface IGlobalModelState {
  userInfo: UserInfo<number | string>;
  accessCollection: string[];
  crmUserInfo: {
    userId: string;
    realname: string;
  };
}

export interface IGlobalModel {
  namespace: 'global';
  state: IGlobalModelState;
  reducers: {
    updateState: Reducer<any>;
  };
  effects: {
    fetch: Effect;
    fetchUserInfo: Effect;
    fetchMenu: Effect;
    fetchAccessCollection: Effect;
  };
  subscriptions: {
    setup: Effect;
  };
}

const GlobalModel: IGlobalModel = {
  namespace: 'global',
  state: {
    userInfo: {},
    accessCollection:
      (sessionStorage.getItem('accessCollection') as any as any[]) || [],
    crmUserInfo: {
      userId: '',
      realname: '',
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      yield put({ type: 'fetchUserInfo', payload: {} });
      yield put({ type: 'fetchAccessCollection', payload: {} });
      // @ts-ignore
      const data = yield select((state: any) => state.global);
      return data;
    },
    *fetchUserInfo({ payload }, { call, put }) {
      try {
        const { data: userInfo } = yield call(service.fetchUserInfo);
        yield put({
          type: 'updateState',
          payload: {
            userInfo,
          },
        });
      } catch (error) {
        yield put({
          type: 'updateState',
          payload: {
            userInfo: {},
          },
        });
      }
    },
    *fetchMenu({ payload }, { call, put }) {
      try {
        const { data } = yield call(service.fetchMenu);
        const { breadcrumbNameMap = {}, menuList = [] } = data;
        yield put({
          type: 'updateState',
          payload: {
            breadcrumbNameMap,
            menuList,
          },
        });
      } catch (error) {
        yield put({
          type: 'updateState',
          payload: {
            breadcrumbNameMap: BREAD_CRUMB_NAEMMAP,
            menuList: MENU_LIST,
          },
        });
      }
    },
    *fetchAccessCollection({ payload }, { call, put }) {
      const { data } = yield call(service.fetchAccessCollection);
      yield put({
        type: 'updateState',
        payload: {
          accessCollection: data,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ location }: any) => {
        const { pathname } = location;
      });
    },
  },
};

export default GlobalModel;
