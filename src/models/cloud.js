import { getCloud, getClouds } from '@/services/api';

export default {
  namespace: 'cloud',

  state: {
    clouds: [],
    summary: {},
    infrastructure: [],
    network: [],
    configuration: [],
    pagination: {
      total: 0,
      current: 1,
    },
  },

  effects: {
    *fetchClouds(_, { call, put }) {
      const response = yield call(getClouds);
      yield put({
        type: 'save_clouds',
        clouds: Array.isArray(response) ? response : [],
      });
    },
    *fetchCloud({ payload }, { call, put }) {
      const response = yield call(getCloud, payload);
      yield put({
        type: 'save_cloud',
        cloud: response,
      });
    },
  },

  reducers: {
    save_clouds(state, { clouds }) {
      return {
        ...state,
        clouds
      };
    },
    save_cloud(state, { cloud }) {
      return {
        ...state,
        summary: cloud.summary || {},
        infrastructure: cloud.infrastructure || [],
        network: cloud.network || [], 
        configuration: cloud.configuration || [],
      };
    },
  },
};
