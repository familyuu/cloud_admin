import { getDashboard } from '@/services/api';

export default {
  namespace: 'dashboard',

  state: {
    clusters: [],
    cloud_number: 0,
	  ceph_number: 0,
	  cpu_usage: 0,
	  memory_usage: {},
    storage_usage: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getDashboard);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
  },
};
