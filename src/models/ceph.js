import { getCephs, getCeph } from '@/services/api';

export default {
  namespace: 'ceph',

  state: {
    clusters: [],
    cluster: {},
  },

  effects: {
    *fetchClusters(_, { call, put }) {
      const response = yield call(getCephs);
      yield put({
        type: 'save_clusters',
        clusters: Array.isArray(response) ? response : [],
      });
    },
    *fetchCluster({ payload }, { call, put }) {
      const response = yield call(getCeph, payload);
      yield put({
        type: 'save_cluster',
        cluster: response
      });
    },
  },

  reducers: {
    save_clusters(state, { clusters }){
      return {
        ...state,
        clusters,
      };
    },
    save_cluster(state, { cluster }) {
      return {
        ...state,
        cluster
      };
    },
  },
};
