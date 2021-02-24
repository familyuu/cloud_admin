import { queryUsers, queryUser,  setCurrentUser} from '@/services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(queryUser, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *modifyCurrent({ payload }, { call, put }) {
      const response = yield call(setCurrentUser, payload);
      const newName = payload.name;
      const redirect = '/account/Profile/basic';
      if (response.status = 'ok') {
        yield put(routerRedux.replace(redirect));
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
